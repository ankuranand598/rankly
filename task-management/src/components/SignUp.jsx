import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import axios from 'axios';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    phone: ''
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
    try {
      const response = await axios.post('http://localhost:8000/api/auth/signup', userData);
      if (response.status === 201) {
        toast.current.show({ severity: 'success', summary: 'Success', detail: response.data.message });
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
        <Card title="Sign Up" subTitle="Create your account" className="p-card-shadow">
          <div className="p-field">
            <label htmlFor="username">Username</label>
            <InputText id="username" name="username" value={userData.username} onChange={handleChange} />
          </div>
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <InputText id="email" name="email" value={userData.email} onChange={handleChange} />
          </div>
          <div className="p-field">
            <label htmlFor="password">Password</label>
            <InputText id="password" name="password" type="password" value={userData.password} onChange={handleChange} />
          </div>
          <div className="p-field">
            <label htmlFor="name">Name</label>
            <InputText id="name" name="name" value={userData.name} onChange={handleChange} />
          </div>
          <div className="p-field">
            <label htmlFor="phone">Phone</label>
            <InputText id="phone" name="phone" value={userData.phone} onChange={handleChange} />
          </div>
          <Divider />
          <div className="p-grid p-nogutter p-align-center">
            <div className="p-col">
              <Button label="Sign Up" onClick={handleSubmit} disabled={loading} />
            </div>
            {loading && <div className="p-col"><i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i></div>}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
