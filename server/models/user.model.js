const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "You need a name"],
        minLength: [2, "Username must be at least 2 characters"]
    },
    email: {
        type: String,
        required: [true, "An Email is required to register"]
    },
    password: {
        type: String,
        required: [ true, "A Password is required"],
        minLength: [8, "What are you new? You need at least 8 characters"]
    }
}, {timestamps: true});

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value);

UserSchema.pre("validate", function(next){
    console.log("Inside of validate. middleware")
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords Must Match")
        console.log("Passwords did not match")
    }
    next();
})

UserSchema.pre("save", function(next){
    console.log("In Pre Save")
    bcrypt.hash(this.password, 10)
        .then((hashWord)=>{
            console.log("In hash");
            this.password = hashWord;
        next();
        })
})
const User = mongoose.model("User", UserSchema);
module.exports = User;