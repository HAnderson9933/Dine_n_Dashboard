import React from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';

const Logout = (props) => {
    const logout = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/user/logout", {
            //no body required for this request
        }, {
            withCredentials: true,
        })
        .then((response)=>{
            console.log(response.data);
            navigate("/");
        })
        .catch(error =>{
            console.log(error);
        });
    };
    return(
        <div>
            <button className="btn btn-link" onClick={logout}>logout</button>
        </div>
    )
}
export default Logout;