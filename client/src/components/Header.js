import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import DNDLogo from '../images/DNDLogo.png'
import dinelogo from './dinelogo.png';
import { Link, navigate } from '@reach/router';
import Logout from './Logout';
import Profile from '../views/Profile';

const Header = (props) =>{

    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/logout",{
            //no body required for this request
        }, {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            console.log("User has logged out.");
            navigate("/");
        })
        .catch(err => {
            console.log(err);
        });
    };

    return(
        <header>
        {/* <img src={DNDLogo} alt="Dine-N-Dashboard Logo" width="150" height="150"/> */}
        <img id="logo" className="logo" src={dinelogo} alt="Dine and Dashboard Logo" width="150" height="150"/>

            <h1>The Dine & Dashboard</h1>
                <ul>
                    <Link to="/restaurants"><li>Home</li></Link>
                    <Link to="/restaurant/new"><li>Add Restaurant</li></Link>
                    {/* <Link to={`/users/${oneUser._id}`}><li>Profile</li></Link> */}

                    <Logout/>
                </ul>

                <hr style={{textAlign: "center", height: "20px"}}/>
        </header>
    )
}

export default Header;