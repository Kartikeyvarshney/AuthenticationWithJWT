const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const app = express();

app.use(express.urlencoded({extended:true}))
// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/userDB', { useNewUrlParser: true ,useUnifiedTopology: true ,useCreateIndex:true} )
  .then(() =>{ 
    console.log("Database is connected")
    app.listen(8080,(err)=>{
    if(err)
    {
      console.log(err.message)
    }
    else
    {
      console.log(`Server is online at http://localhost:8080/`)
    }
  })})
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));


app.use(authRoutes)

app.use((req,res)=>{
  res.status(404).render('404')
})