

const mongoose = require('mongoose'); // creating a const to access the package mongoose.


const UserSchema = new mongoose.Schema({ // defining the schema of the database collection for communication.
    // Defining the structure of my database collection. 
    Categories: {// defining the column in my collection
        type: String,// defining the type of 
        required: true,
        minLength: 3, // setting the min length to 3 and max length to 25 to validate input when sent to database.
        //  When a person enter a Categories input which doesnt meet this requirement will not be sent to database
        // and a error message is shown 'Validation fail for the request' and a status code of 400 is sent
        max: 25

    },
    // setting the min length to 3 and max length to 20 to validate input when sent to database.
    //  When a person enter a Size input which doesnt meet this requirement will not be sent to database
    // and a error message is shown 'Validation fail for the request' and a status code of 400 is sent
    Size: {
        type: String,
        required: true,
        minLength: 3,
        max: 20
    },

    // setting the min length to 3 and max length to 25 to validate input when sent to database.
    //  When a person enter a Flavour input which doesnt meet this requirement will not be sent to database
    // and a error message is shown 'Validation fail for the request' and a status code of 400 is sent
    Flavour: {
        type: String,
        required: true,
        minLength: 3,
        max: 25

    },
    // setting the min number to 1 and max number to 999999  to validate input when sent to database.
    //  When a person enter a price input which doesnt meet this requirement will not be sent to database
    // and a error message is shown 'Validation fail for the request' and a status code of 400 is sent
    Price: {
        type: Number,
        required: true,
        min: 1,
        max: 999999
    }
})





module.exports = mongoose.model('bakery-m', UserSchema) // passing the model to the collection named bakery using the schema defined



