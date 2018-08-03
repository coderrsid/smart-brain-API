const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin',
    database : 'smartbrain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => { res.send('it is working !') });

app.post('/signin',signin.handleSignIn(db, bcrypt));   //SIGNIN

app.post('/register',(req,res) => { register.handleRegister(req, res, db, bcrypt) });   //REGISTER

app.get('/profile/:id',(req, res) => { profile.handleProfile(req, res, db) });		//PROFILE

app.put('/image',(req, res) => { image.handleImage(req, res, db) }); //IMAGE-ENTRIES

app.post('/imageurl',(req, res) => { image.handleApiCall(req, res) }); //API CALL

app.listen(process.env.PORT || 300,()=> {
	console.log(`app is working on port ${process.env.PORT}`);
});