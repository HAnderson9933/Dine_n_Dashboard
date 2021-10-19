import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import Form from '../components/Form';
import Header from './Header';

const NewRestaurant = (props) =>{
    const [ errors, setErrors ] = useState({});
    const [ newRestaurant, setNewRestaurant] = useState ({

        //helps get rid of the uncontrolled input
        //allows us to set the type ahead of time to prevent bugs
        name: "",
        category: "",
        website: "",
        rating: true
    })

    const newSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/restaurants',
        //request body that the back-end is asking for in the controller
        newRestaurant
        )
        .then((res) => {
            console.log(res);
            console.log(res.data);
            navigate('/restaurant');
        })
        .catch((err) => {
            console.log(err);
            console.log(err.response.data.errors);
            setErrors(err.response.data.errors);
        })
    }

    return(
        <div>
        <Header />
            <h1>Add Your Favorite Restaurant</h1>
            <Form 
            submitHandler = { newSubmitHandler }
            buttonText="SUBMIT"
            restaurant = { newRestaurant }
            setRestaurant = { setNewRestaurant }
            errors = { errors }
            />
        </div>
    )
}

export default NewRestaurant;