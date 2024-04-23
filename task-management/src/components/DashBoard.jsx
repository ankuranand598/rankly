import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import  axios  from 'axios';
import TaskList from './Task';

const DashBoard = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [duedate, setDuedate] = useState('');
  
    const handleCreateTask = async () => {
      try {
        // await createTask({ title, description, status, duedate });
        const response = await axios.post(`http://localhost:8000/api/tasks`,{ title, description, status, duedate });
        // return response.data;
        console.log('Task created successfully',response.data);
        console.log('Task created successfully');
        setTitle('');
        setDescription('');
        setStatus('');
        setDuedate('');
      } catch (error) {
        console.error('Error creating task:', error.message);
      }
    };
  
    const statusOptions = [
      { label: 'To Do', value: 'To Do' },
      { label: 'In Progress', value: 'In Progress' },
      { label: 'Done', value: 'Done' },
    ];
  
    return (
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="title">Title</label>
          <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="description">Description</label>
          <InputTextarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
        </div>
        <div className="p-field">
          <label htmlFor="status">Status</label>
          <Dropdown id="status" value={status} options={statusOptions} onChange={(e) => setStatus(e.value)} placeholder="Select Status" />
        </div>
        <div className="p-field">
          <label htmlFor="duedate">Due Date</label>
          <Calendar id="duedate" value={duedate} onChange={(e) => setDuedate(e.value)} />
        </div>
        <div className="p-field">
          <Button type="button" label="Create Task" onClick={handleCreateTask} />
        </div>
        <TaskList/>
      </div>
    );
  };
  
  export default DashBoard;
