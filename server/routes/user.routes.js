const UserController = require("../controllers/user.controller");
module.exports = (app) =>{
    //register user
    app.post("/api/user/register", UserController.register);
    //login user
    app.post("/api/user/login", UserController.login);
    //logout user
    app.post("/api/user/logout", UserController.logout);
    //getone
    app.get("/api/user/:id", UserController.getOneUser);
}
