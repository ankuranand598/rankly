import logo from './logo.svg';
import React from 'react';

import './App.css';

import SignUp from './components/SignUp';
import Login from './components/LogIn';
import HomePage from './components/HomePage';
function App() {
  return (
    <div className="App">
      <header >
       <HomePage/>
      </header>
    </div>
  );
}

export default App;
