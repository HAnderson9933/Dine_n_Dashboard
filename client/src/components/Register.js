import React, {useState} from 'react';
import axios from 'axios';

const Register = (props) =>{
    const [confirmRegister, setConfirmRegister] = useState("");
    const [regErrors, setRegErrors] = useState({});

    const [ user, setUser ]= useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    
    const registerHandler = (event) =>{
        console.log(event.target.value);
        console.log(event.target.name);
        setUser({ ...user, [event.target.name]: event.target.value})
    }

    const register = event =>{
        event.preventDefault();
        axios.post("http://localhost:8000/api/user/register", user,
        {withCredentials: true})
        .then(response =>{
            console.log(response.data);
            setUser({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            })
            setConfirmRegister("Thank you for registering, You can now Log in!");
            setRegErrors({});
        })
        .catch((error)=>{
            console.log(error.response);
            console.log(error);
            console.log("errors", error.response.data.errors);
            console.log(error.response.data.message);
            setRegErrors(error.response.data.errors);
        });
    };
    return(
        <div className="container">
            
            <h2>Register</h2>
            { 
                confirmRegister ?
                <h3 style={{color: "green"}}>{confirmRegister}</h3>
                : null
            }
            <form onSubmit={register}>
                <div className="form-group"> 
                    <label>Username: </label>
                    {
                        regErrors.username ?
                        <p style={{color: "red"}} className="errorText">{ regErrors.username.message }</p>
                        : null
                    }
                    <input className="form-control-sm" type="text" name="username" value={user.username} onChange={(event) => registerHandler(event)} />
                </div>
                <br />
                <div className="form-group">
                    <label>Email: </label>
                    {
                        regErrors.email ?
                        <p style={{color: "red"}} className="errorText">{regErrors.email.message}</p>
                        : null
                    }
                    <input className="form-control-sm" type="email" name="email" value={user.email} onChange={registerHandler} />
                </div>
                <br />
                <div className="form-group">
                    <label>Password: </label>
                    {
                        regErrors.password ?
                            <p style={{color: "red"}} className="errorText">{regErrors.password.message}</p>
                            : null
                    }
                    <input className="form-control-sm" type="password" name="password" value={user.password} onChange={registerHandler} />
                </div>
                <br />
                <div className="form-group">
                    <label>Confirm Password: </label>
                    {
                        regErrors.confirmPassword ?
                            <p style={{color: "red"}} className="errorText">{regErrors.confirmPassword.message}</p>
                            : null
                    }
                    <input className="form-control-sm" type="password" name="confirmPassword" value={user.confirmPassword} onChange={registerHandler} />
                </div>
                <br />
                <div>
                    <button className="btn btn-warning" type="submit"> Register </button>
                </div>
            </form>
        </div>
    )
}
export default Register;