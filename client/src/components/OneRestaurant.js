import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import DeleteRestaurant from './DeleteRestaurant';
import Header from './Header';

const OneRestaurant = (props) =>{

    // const [ uploadedFile, setUploadedFile ] = useState({});
    const [oneRestaurant, setOneRestaurant] = useState({});

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/restaurants/${props.id}`)
        .then((res) =>{
            console.log(res);
            console.log(res.data);
            setOneRestaurant(res.data);
        })
        // .catch((err) => console.log(err))
        .catch((err)=> console.log(err));
 
    }, [props.id]) //if I do not add props.id, will throw a warning.


return(
    <div>
        <Header/>
            <h2><strong>Restaurant Name</strong></h2>
                <p>{oneRestaurant.name}</p>
            <h2><strong>Cuisine</strong></h2>
                <p>{oneRestaurant.category}</p>
            <h2>Website</h2>
                <p><a href={oneRestaurant.website} target="_blank" rel="noreferrer">{oneRestaurant.website}</a></p>
            <h2>Rating</h2>
                <p style={{fontSize: "20px", color: "rgb(255, 187, 0)"}}> 
                    {
                        oneRestaurant.rating === 1?
                        <p>&#9733;</p>
                        :null
                    }

                    {
                        oneRestaurant.rating === 2?
                        <p>&#9733;&#9733;</p>
                        :null
                    }

                    {
                        oneRestaurant.rating === 3?
                        <p>&#9733;&#9733;&#9733;</p>
                        :null
                    }

                    {
                        oneRestaurant.rating === 4?
                        <p>&#9733;&#9733;&#9733;&#9733;</p>
                        :null
                    }

                    {
                        oneRestaurant.rating === 5?
                        <p>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                        :null
                    }
                </p>

                <Link to={`/restaurant/edit/${oneRestaurant._id}`} style={{ marginRight: "5px"}}><button>EDIT</button></Link>
                <DeleteRestaurant id={oneRestaurant._id}/>
    </div>
    )
}

export default OneRestaurant;