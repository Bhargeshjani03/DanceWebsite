const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser= require('body-parser');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactdance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 80;
//Defining mongoose schema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String,
  });
  const Contact = mongoose.model('Kitten', ContactSchema);

const path = require('path');
app.use('/static', express.static('static'));
app.use(express.urlencoded());
//PUG SPECIFIC STUFF
//set the template engine
app.set('view engine', 'pug');
//set the views directory
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
    const con = "This is the bhargesh jani pug page";
    const params = {  };
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res) => {
    const con = "This is the bhargesh jani pug page";
    const params = {  };
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res) => {
    
    var myData= new Contact(req.body);
    myData.save().then(() => {
        res.send("This data has been saved successfully");
    }).catch(()=>{
        res.status(400).send("error saving");
    })

    // res.status(200).render('contact.pug')
});
app.listen(port, () => {
    console.log("The server is listening");
});