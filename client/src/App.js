import React, {useState} from 'react';
import {Router} from "@reach/router";
import LoginAndRegistration from './views/LoginAndRegister';
import './App.css';
import Profile from './views/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <LoginAndRegistration path="/" />
        <Profile path="/" />
      </Router>
    </div>
  );
}

export default App;