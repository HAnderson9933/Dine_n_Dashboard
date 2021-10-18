import React, { useState } from "react";
import axios from "axios";
import {navigate} from "@reach/router";

const Login = (props) =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logError, setLogError] = useState("");

    const login = event => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/user/login", {
            email: email,
            password: password,
        },
        {withCredentials: true}) // passes cookie back and forth we save from the user.controller.
        .then((response)=> {
            console.log(response.cookie, "cookie");
            console.log(response.data);
            /// change to the homepage route
            navigate("/home");

        })
        .catch(error => {
            console.log(error.response);
            setLogError(error.response.data.message);
        });
    };
    return (
        <div className="container">
            <h2>Login</h2>
            <p style={{color: "red"}}>{logError ? logError : ""}</p>
            <form onSubmit={login}>
                <div className="form-group">
                    <label>Email:</label>
                    <input className="form-control-sm" type="text" name="email" value={email} onChange={(event)=> setEmail(event.target.value)} />
                </div>
                <br />
                <div className="form-group">
                    <label>Password:</label>
                    <input className="form-control-sm" type="password" name="password" value={password} onChange={(event)=> setPassword(event.target.value)} />
                </div>
                <br />
                <div>
                    <button className="btn btn-warning" type="submit">Log In</button>
                </div>
            </form>
        </div>
    );
};
export default Login;