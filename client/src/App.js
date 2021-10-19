import './App.css';
import React, { useState } from 'react';
import { Router } from '@reach/router';
import LoginAndRegistration from './views/LoginAndRegistration';
import Profile from './views/Profile';
import AllRestaurants from './components/AllRestaurants';
import NewRestaurant from './components/NewRestaurant';
import OneRestaurant from './components/OneRestaurant';
import EditRestaurant from './components/EditRestaurant';



function App() {

  const [ user, setUser ] = useState({
    username: "",
    id: ""
  });


  return (
    <div className="App">

    <Router>

      <LoginAndRegistration path="/" />


      <AllRestaurants default path='/restaurant' />
      <NewRestaurant path="/restaurant/new" />
      <Profile path="/user/profile/:id" user={user} />
      <OneRestaurant path="/restaurant/:id" />
      <EditRestaurant path="/restaurant/edit/:id" />
    </Router>

    </div>
  );
}

export default App;
