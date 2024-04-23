import axios from 'axios';

const baseURL = 'http://localhost:8000/api/tasks';

// Create a new task
const createTask = async (taskData) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/tasks`, taskData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to create task');
  }
};

// Update an existing task
const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.put(`${baseURL}/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to update task');
  }
};

// Delete a task
const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${baseURL}/${taskId}`);
    return true;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to delete task');
  }
};

export { createTask, updateTask, deleteTask };
