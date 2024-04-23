import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import  axios  from 'axios';
const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // const tasksData = await getTasks();
        // setTasks(tasksData);
        const response = await axios.get(`http://localhost:8000/api/tasks`);
        console.log(response)
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <DataTable value={tasks}>
        <Column field="title" header="Title" />
        <Column field="description" header="Description" />
        {/* <Column field="status" header="Status" /> */}
        <Column field="duedate" header="Due Date" />
      </DataTable>
    </div>
  );
};

export default TaskList;
