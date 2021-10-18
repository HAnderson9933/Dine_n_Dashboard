import './App.css';
import React from 'react';
import { Router } from '@reach/router';
import AllRestaurants from './components/AllRestaurants';
import NewRestaurant from './components/NewRestaurant';
import OneRestaurant from './components/OneRestaurant';
import EditRestaurant from './components/EditRestaurant';

function App() {
  return (
    <div className="App">

    <Router>
      <AllRestaurants default path='/restaurant' />
      <NewRestaurant path="/restaurant/new" />
      <OneRestaurant path="/restaurant/:id" />
      <EditRestaurant path="/restaurant/edit/:id" />
    </Router>

    </div>
  );
}

export default App;
