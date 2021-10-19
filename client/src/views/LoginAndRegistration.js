import React from 'react';
import Register  from "../components/Register";
import Login from "../components/Login";
import dinelogo from "../components/dinelogo.png"

const LoginAndRegistration = (props) => {

    return (
        <div >
            {/* <img id="logo" className="logo" src={dinelogo} alt="Dine and Dashboard Logo"/> */}
            <div>
                
                <h1 className="welcome">Welcome To</h1>
                <h1 className="welcome">The Dine & Dashboard</h1>
                <img id="logo" className="logo" src={dinelogo} alt="Dine and Dashboard Logo" width="150" height="150"/>
            </div>
            <div className="form-col">
                <div className="row">
                    <Register />
                </div>
                <div className="row">
                    <Login />
            </div>
            </div>

        </div>
    )
}
export default LoginAndRegistration;