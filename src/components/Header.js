import React from 'react';
import axios from 'axios';
import DNDLogo from '../images/DNDLogo.png'
import { Link, navigate } from '@reach/router';

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
        <img src={DNDLogo} alt="Dine-N-Dashboard Logo" width="150" height="150"/>
            <h1>The Dine & Dashboard</h1>
                <ul>
                    <Link to="/restaurants"><li>Home</li></Link>
                    <Link to="/restaurant/new"><li>Add Restaurant</li></Link>
                    <Link to="/user/profile"><li>Profile</li></Link>
                    <button className="headerLogoutBtn" onClick={logout}><li>Logout</li></button>
                </ul>

                <hr style={{textAlign: "center", height: "20px"}}/>
        </header>
    )
}

export default Header;