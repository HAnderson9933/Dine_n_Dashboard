const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    register: (request, response) => {
        console.log("In register")
        console.log(request.body);

        const user = new User(request.body);

        user.save()
            .then((newUser)=>{
                console.log("Registration Successful");
                response.json({ messageSuccess: "Success Registering1234", user: newUser})
            })
            .catch((error)=>{
                console.log("Registration Failed")
                console.log(error);
                response.status(400).json(error);
            })
    },

    login: (request, response) =>{
        User.findOne({ email: request.body.email})
            .then((currentUser) => {
                if(currentUser === null){
                    response.status(400).json({message: "Invalid Login Attempt. Try Again."})
                } else {
                    bcrypt.compare(request.body.password, currentUser.password)
                        .then((isPasswordValid)=>{
                            if(isPasswordValid === true){
                                console.log("valid password");
                                response.cookie("userToken",
                                    jwt.sign({
                                        user_id: currentUser._id,
                                        email: currentUser.email,
                                        username: currentUser.username
                                    },
                                    process.env.JWT_SECRET),
                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 9000000)
                                    })
                                .json({
                                    message: "Login Successful",
                                    loggedInUser: currentUser.username,
                                    userId: currentUser._id
                                })
                            } else {
                                response.status(400).json({message: "Invalid Login Attempt. Try Again."})
                            }
                        })
                        .catch((error)=>{
                            console.log(error);
                            response.status(400).json({message: "Invalid Login Attempt. Try Again"})
                        })
                }
            })
            .catch((error)=>{
                console.log(error);
                response.status(400).json({message: "Invalid Login Attempt. Try Again."})
            })
    },
    logout: (request, response)=> {
        console.log("Logging out");
        response.clearCookie("userToken");
        response.json({message: "Successfully Logged Out"})
    },
    getOneUser:(request, response) => {
        User.findOne({_id: request.params.id}) // "id" is variable in the route, it must match!!
        .then((oneUser)=>{
            console.log(oneUser);
            response.json(oneUser);
        })
        .catch((error)=> console.log(error));
    }
}