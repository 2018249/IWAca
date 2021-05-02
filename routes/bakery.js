const express = require('express') // get the express package

const Part = require('../models/bakery-m') // get the model
const router = express.Router()  // 

// define the route bakery new and rendering the static page. A form is used to pass the user input to the api.
router.get('/new', (req, res) => {
  res.render('bake/new_part', { part: new Part() })// user input pass to the database collection model.
})

router.get('/edit/:id', async (req, res) => { // define new route to edit 
  const part = await Part.findById(req.params.id) // passing the user selected id to the database collection and the document is found using 
  // id and render to the edit page all the user selected id's data.
  res.render('bake/edit_part', { part: part })
})



router.get('/:id', async (req, res) => {// getting details from database collection using id
  const part = await Part.findById()

  if (part == null) { // checking if part is null. if true sending a status code 404 and a error message.
    return res.status(404).json({ message: 'Cannot find Items by id' })
  }
  res.redirect('/')// redirect user to the homepage after the id is found

})

// creating new record.
// post is used to create a new record with the information submited in the user in the form.
router.post('/', async (req, res, next) => {
  req.part = new Part() // this is passed on to the database schema and new record is created.
  next()

}, savePartAndRedirect('new')) // calling the function to create new record

// put is used to update a record in the collection
// a put request is sent using the document id to the database and the document 
router.put('/:id', async (req, res, next) => {
  req.part = await Part.findById(req.params.id) // finding the document with the help of id request by user.
  next()

}, savePartAndRedirect('edit')) // calling the function to edit the document




//delete request is used to deleted a document
router.delete('/:id', async (req, res) => {  // get document id from the user
  await Part.findByIdAndDelete(req.params.id)// find document and delete document from the collection
  res.redirect('/#products')// redirect user to page.


})


function savePartAndRedirect(path) { // this function is used to pass all the user input to schema to create/ update
  return async (req, res) => {
    let part = req.part
    part.Categories = req.body.Categories
    part.Size = req.body.Size
    part.Flavour = req.body.Flavour
    part.Price = req.body.Price
    try {
      part = await part.save() // all saved to the database collection

      res.redirect(`/#products`)// redirect user to page .
    } catch (e) {

      return res.status(400).json({ message: 'Validation fail for the request' }) // sending a status code 400 if having bad request.
    }
  }
}






module.exports = router