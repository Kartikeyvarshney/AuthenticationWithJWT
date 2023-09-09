const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const  cookieParser = require('cookie-parser')
const {requireAuth , checkUser} = require('./middlewares/authMiddleware')
require('dotenv').config()
const app = express();

app.use(express.urlencoded({extended:true}))
// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

app.use(express.json())

app.use(cookieParser())

mongoose.connect('mongodb://127.0.0.1:27017/userDB', { useNewUrlParser: true ,useUnifiedTopology: true ,useCreateIndex:true} )
  .then(() =>{ 
    console.log("Database is connected")
    app.listen(process.env.PORT,(err)=>{
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
app.get('*' , checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth ,(req, res) => res.render('smoothies'));


app.use(authRoutes)


// Cookies

// app.get('/set-cookies' , (req,res)=>{
//  this is the way to make a cookie with no third party packages.
//   res.setHeader('Set-Cookie' , 'newUser=true')

//   Now we are going to use the a third party package for cookie name cookie-parser

//   res.cookie('newUser',false)
//   res.cookie('isEmployee' , true ,{maxAge:1000*60 , secure:true})
//   res.send("You got the cookie")
// })


// app.get('/read-cookies' , (req,res)=>{

//   const cookies = req.cookies;
//   console.log(cookies)
//   res.json(cookies)
// })

app.use((req,res)=>{
  res.status(404).render('404')
})