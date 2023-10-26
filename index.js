const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();




// Backend Web App Server Framework
const app = express();

// parse application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));




const dataBaseURL = process.env.MONGODB_URL;
mongoose.connect(dataBaseURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log(`Connected to the database: ${dataBaseURL}`);
})
.catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});
 


// Server setup: Set port to listen for requests
const port = process.env.BACKEND_PORT || 8091;
const server = app.listen(port, function (err) {
    if (err) console.log(err);

    let port = server.address().port
    console.log("Server Listening on Port: ", port)
})

