const express = require("express");
const cors = require('cors');

require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

app.use(cookieParser());

require("./config/mongoose.config");
require("./routes/restaurant.routes")(app);

// require for user routes
require("./routes/user.routes")(app);

app.listen(8000, () =>
console.log("You have successfully connected to port 8000"));