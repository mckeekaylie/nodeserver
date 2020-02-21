require('dotenv').config();

//Here we require the use of the express npm package that we've installed in our dependencies
var express = require('express');

//We create an instance of express.
/*We are firing off a top-level express() function, a function exported by the express module. 
This allows us to create an Express app */
var app = express();

var test = require('./controllers/testcontroller');
var authTest = require('./controllers/authtestcontroller');
var user = require('./controllers/usercontroller');

var sequelize = require('./db');
sequelize.sync();

app.use(express.json());

app.use(require('./middleware/headers'));

app.use('/test', test)
//we call app.use and in the first parameter create a base url called /test
//for our second parameter for the use() function we pass in test. This means that all routes created in testcontroller.js will be sub-routes

app.use('/api/user', user);

app.use(require('./middleware/validate-session'));
app.use('/authtest', authTest);

//app.listen will use express to start a UNIX socket and listen for connections on the given path
//the given path is localhost:3000
app.listen(3000, function(){
    console.log('App is listening on 3000.') //we call a callback function when the connection happens with a console.log
});



