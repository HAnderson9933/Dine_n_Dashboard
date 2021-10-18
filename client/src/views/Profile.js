import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Logout from '../components/Logout';

const Profile = (props) =>{
    const {id, username, setUsername} = props;

    const [user, setUser] = useState({});
    const [userList, setUserList] =useState([]);

    useEffect(()=>{
        console.log("running");
        axios.get("http://localhost:8000/api/user/" + props.userId)
            .then(response =>{
                console.log(response);
                setUser(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [id])
    /// if we want users to have their added restaurants on their profile
    useEffect(()=>{
        // need to adjust the route in restaurant routes
        axios.get("http://localhost:8000/api/restaurants/user/" + props.userId)
        .then((response)=>{
            console.log(response.data);
            setUserList(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }, [])
    return(
        <div className="container">
            <div className="profile">

                <div>
                    <h1>Welcome</h1>
                    <h3>Check out the restraunts added by: {user.username} </h3>
                </div>
                <div>
                    {
                        userList.map((restaurant, index) =>{
                            <div key={index}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Restaurant Name</th>
                                            <th>Restaurant Category</th>
                                            <th>Restaurant Website</th>
                                            <th>Restaurant Rating</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <th>{restaurant.name}</th>
                                            <th>{restaurant.category}</th>
                                            <th><a href={restaurant.website}>{restaurant.website}</a></th>
                                            <th>{restaurant.rating}</th>
                                            <th>Edit Delete</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        })
                    }
                </div>
            <Logout />
            </div> 
        </div>
    )
}
export default Profile;