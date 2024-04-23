import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import axios from 'axios';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const toast = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log("userdata:",userData)
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', userData);
      if (response.status === 200) {
        // Store token in session storage
        sessionStorage.setItem('token', response.data.token);

        toast.current.show({ severity: 'success', summary: 'Success', detail: response.data.message });
        // Redirect to dashboard or home page
      }
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.message });
    }
    setLoading(false);
  };

  return (
    <div className="p-grid p-justify-center">
      <div className="p-col-12 p-md-8 p-lg-6">
        <Toast ref={toast} />
        <Card title="Login" subTitle="Enter your credentials" className="p-card-shadow">
          <div className="p-field">
            <label htmlFor="username">Username</label>
            <InputText id="username" name="username" value={userData.username} onChange={handleChange} />
          </div>
          <div className="p-field">
            <label htmlFor="password">Password</label>
            <InputText id="password" name="password" type="password" value={userData.password} onChange={handleChange} />
          </div>
          <Divider />
          <div className="p-grid p-nogutter p-align-center">
            <div className="p-col">
              <Button label="Login" onClick={handleSubmit} disabled={loading} />
            </div>
            {loading && <div className="p-col"><i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i></div>}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
