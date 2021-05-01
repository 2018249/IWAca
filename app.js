const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Part = require('./models/carpart-m')
const bodyParser = require('body-parser');
//require('dotenv').config()


var port = process.env.PORT || 5000;  // Declaring to ports to support heroku


app.use(bodyParser.json()); // Parsing the data in body to json data

// Routes Declare
const partRouter = require('./routes/carparts') // routes for api
const methodOverride = require('method-override')// package used to update and delete a document via post request.

app.set('view engine', 'ejs')  // pulling up my static webpage

app.use(express.urlencoded({ extended: false})) // this is a middlewear function which comes with the express package.
// it enable us to use URL-encoded data with the querystring library.
app.use(methodOverride('_omethod'))// using the method in the app. 
app.use(express.static('views/carpart')) // making my folder public to access my css and javascript for my html page.


//Render html file homepage
app.get('/', async  (req,res)=> {// making a get request
   const parts = await Part.find();  // this will find all my data from my database collection with the help of model and assign it on to the const parts

    res.render('carpart/index' , {parts: parts})// This will render all the database collection data which was assigned on to the const parts
})                                           // to my static webpage in views/carpart folder and display it to my table on my webpage.


// connecting to database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, }) // i am making a connection to the database using 
// my environment variable which is saved in my gitpod. And successfully establishing connection to my database.

const dbc = mongoose.connection

dbc.once('open', () => console.log('Connected to Database!'))// checking if my database connection is open and if open printing out a message in the console.
// that the server is connected to database. 
dbc.on('error', (error) => console.error(error))// checking if there is an error in the connection and printing the error in my console.



app.use('/carparts', partRouter) // 

//app.listen(5000, () => console.log('Server Started'))

app.listen(port, function(error){ // Listening to the server on the avaliable port either 5000 or avaliable one. Also show error if their is any.
    console.log('Server Started on port: ' + port);// Server Running Console Message
});