// import React, { useState } from 'react';
// import { InputText } from 'primereact/inputtext';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { Dropdown } from 'primereact/dropdown';
// import { Calendar } from 'primereact/calendar';
// import { Button } from 'primereact/button';
// // import { createTask, updateTask } from './api/tasks'; // Import your API functions

// const TaskForm = ({ initialValues }) => {
//   const [title, setTitle] = useState(initialValues.title || '');
//   const [description, setDescription] = useState(initialValues.description || '');
//   const [status, setStatus] = useState(initialValues.status || '');
//   const [duedate, setDuedate] = useState(initialValues.duedate || '');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (initialValues._id) {
//         // If initialValues has _id, it means we're editing an existing task
//         await updateTask(initialValues._id, { title, description, status, duedate });
//       } else {
//         // Otherwise, we're creating a new task
//         await createTask({ title, description, status, duedate });
//       }
//       // Perform any additional actions after task creation/update
//       console.log('Task submitted successfully');
//       setTitle('');
//       setDescription('');
//       setStatus('');
//       setDuedate('');
//     } catch (error) {
//       console.error('Error submitting task:', error.message);
//     }
//   };

//   const statusOptions = [
//     { label: 'To Do', value: 'To Do' },
//     { label: 'In Progress', value: 'In Progress' },
//     { label: 'Done', value: 'Done' },
//   ];

//   return (
//     <div className="p-fluid">
//       ghehehe
//     </div>
//   );
// };

// export default TaskForm;
