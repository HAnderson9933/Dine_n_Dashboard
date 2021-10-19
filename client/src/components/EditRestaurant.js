import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import Form from './Form';
import Header from './Header';

const EditRestaurant = (props) =>{
    const [ errors, setErrors ] = useState({});

    const [ editedRestaurant, setEditedRestaurant ] = useState ({

        //helps get rid of the uncontrolled input
        //allows us to set the type ahead of time to prevent bugs
        name: "",
        category: "",
        website: "",
        rating: true
    })

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/restaurants/${props.id}`)
        .then((res)=>{
            console.log(res.data);
            setEditedRestaurant(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    const editRestaurantHandler = (e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/restaurants/${props.id}`,
        editedRestaurant
        )
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            console.log("Restaurant successfully updated.");
            navigate(`/restaurant/${props.id}`); //want to go to details page, this going back to all properties
        })
        .catch((err)=>{
            console.log(err);
            console.log(err.response.data.errors);
            setErrors(err.response.data.errors);
        })  
    }

    return(
        <div>
            <Header/>
                <div>
                    <h2>Edit Restaurant</h2>
                        <Form 
                        submitHandler = { editRestaurantHandler } 
                        buttonText="UPDATE"
                        restaurant = { editedRestaurant }
                        setRestaurant = { setEditedRestaurant }
                        errors = { errors }
                        />
                </div>
                
        </div>
    )
}

export default EditRestaurant;