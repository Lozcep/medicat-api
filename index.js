require('dotenv').config()
const express = require('express')
const app = express() 
const cors = require('cors')

const home = require ('./src/controllers')
const doctorSignUp = require('./src/controllers/signup') 
const doctorLogin = require('./src/controllers/login') 
const patient = require('./src/controllers/patients')

const connectDataBase = require('./config/database');

connectDataBase()
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cors())

app.use('/', home)
app.use('/doctor/signup', doctorSignUp )
app.use('/doctor/login', doctorLogin )
app.use('/patient', patient )

const port = process.env.PORT  || 3001

app.listen(port, ()=>{
    console.log(`server on port ${port}`)
})
 