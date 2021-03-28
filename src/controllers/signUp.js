require('dotenv').config()
const express = require('express')
const router = express.Router()
const Joi = require('joi')
const bcrypt = require('bcrypt');
const saltRounds = 10;
 
const Doctor = require('../models/Doctor')
const Credentials = require('../models/Credentials')



router.post('/', async (req, res)=>{      
    
    try{    
        
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),  //minimo 6 caracteres
            repeatPassword: Joi.ref('password')
        }); 

        credentials = {
            IDDocument: req.body.IDDocument,
            email: req.body.email,
            password: req.body.password,
            IDDoctor:""
        }

        const value = await schema.validateAsync({ email: credentials.email, password: credentials.password, repeatPassword: req.body.repeatPassword })
        const hashedPassword = await bcrypt.hash(credentials.password, saltRounds)
        credentials.password = hashedPassword



        lng = req.body.lng  
        lat = req.body.lat
    
        if (typeof lng === 'string'){
            lng = parseFloat(req.body.lng)
          }
          if (typeof lat === 'string'){
            lat = parseFloat(req.body.lat)
          }

                doctor = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    specialty: req.body.specialty,
                    IDDocument: req.body.IDDocument,
                    address: req.body.address,
                    city: req.body.city,
                    country: req.body.country,
                    location: {
                        type: 'Point',
                        coordinates: [lng, lat]  // coordinates: [lng, lat]
                        }                
                }
  
              const newDoctor = await new Doctor(doctor).save()

              console.log(newDoctor._id)

              credentials.IDDoctor = newDoctor._id

              await new Credentials(credentials).save()
              
              res.status(200).json({
                "status": 200,
                "message": "Doctor registrado con éxito",
                "data": newDoctor})
                
    
    }
    catch(err){
        console.error(err)
        res.status(400).json({
            "status": 400,
            "message": "Error al registrar usuario"})
    }


})

module.exports = router
