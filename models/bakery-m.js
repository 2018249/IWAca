

const mongoose = require('mongoose'); // creating a const to access the package mongoose.


const UserSchema = new mongoose.Schema({ // define the schema of database collection for communication.
   
    // Defining the structure of the database collection.
    // setting the min length to 3 and max length to 20 to validate input when sent to database.
    //  When a person enter a Size input which doesnt meet this requirement will not be sent to database
    // and a error message is shown 'Validation fail for the request' and a status code of 400 is sent 
    Categories: {
        type: String,
        required: true,
        minLength: 3, 
        max: 25
    },

    Size: {
        type: String,
        required: true,
        minLength: 3,
        max: 20
    },

    Flavour: {
        type: String,
        required: true,
        minLength: 3,
        max: 25

    },
    // set the min number to 1 and max number to 999999  to validate input when sent to database.
    //  When user enter price input which does not meet the requirement, will not be sent to database.
    // An error message 'Validation fail for the request' shown and a status code of 400 sent
    Price: {
        type: Number,
        required: true,
        min: 1,
        max: 999999
    }
})


module.exports = mongoose.model('bakery-m', UserSchema) // passing the model to the collection named bakery using the schema defined



