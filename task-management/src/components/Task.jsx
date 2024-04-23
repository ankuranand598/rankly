import React, { useState } from 'react';
import { Button } from 'primereact/button';

const TaskList = ({ tasks, onDeleteTask, onEditTask }) => {
  const [editMode, setEditMode] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  const handleEdit = (task) => {
    setEditMode(task._id);
    setEditedTask(task);
  };

  const handleSave = () => {
    onEditTask(editedTask);
    setEditMode(null);
  };

  const handleCancel = () => {
    setEditMode(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <div>{task.title}</div>
            <div>{task.description}</div>
            {/* <div>{task.status}</div> */}
            <div>{task.duedate}</div>
            {editMode === task._id ? (
              <>
                <input type="text" name="title" value={editedTask.title} onChange={handleInputChange} />
                <input type="text" name="description" value={editedTask.description} onChange={handleInputChange} />
                {/* <input type="text" name="status" value={editedTask.status} onChange={handleInputChange} /> */}
                <input type="text" name="duedate" value={editedTask.duedate} onChange={handleInputChange} />
                <Button label="Save" onClick={handleSave} />
                <Button label="Cancel" onClick={handleCancel} />
              </>
            ) : (
              <>
                <Button label="Edit" onClick={() => handleEdit(task)} />
                <Button label="Delete" onClick={() => onDeleteTask(task._id)} />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
