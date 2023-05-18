const express = require('express');
const app = express();
const port = 8000 ; 
const Database = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

//for getting form data
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.json());

app.use('/',require('./routes'));

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const message = err.message || 'Something went wrong';
    return res.status(errorStatus).json({
        succcess: false,
        status: errorStatus,
        message: message,
        stack: err.stack
    })
});


app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is up and running on port ${port}`);
})

