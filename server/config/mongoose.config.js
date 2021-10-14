const mongoose = require("mongoose");
const dbName = "restaurants";

mongoose.connect("mongodb://localhost/" + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() =>{
        console.log(`You are connected to the ${dbName} database!`);
    })
    .catch((err)=>{
        console.log(`There was an error connecting to the ${dbName} name:()`);
        console.log(err);
    })