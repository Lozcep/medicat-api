const { response, request } = require('express');
const Joi = require('joi')
const bcrypt = require('bcrypt');
const authService = require('../services/authService')

const Credentials = require('../models/Credentials');
const Doctor = require('../models/Doctor');

const login =  async(req = request, res = response)=>{  

    
    try{    
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()  //minimo 6 caracteres
        });        
        
        crendentials = {
            email : req.body.email,
            password : req.body.password
        }
        
        await schema.validateAsync({ email: crendentials.email, password: crendentials.password })

        const login = await Credentials.findOne({ email: crendentials.email})
        console.log(login._id)
         
        if (!login) {
            console.log(`El correo ${crendentials.email} no está registrado`);
            res.status(401).json({
                status:401,
                message: `El correo ${crendentials.email} no está registrado`})            
        } else {
            const comparedPassword = await bcrypt.compare( crendentials.password, login.password)
            const token = authService.JWTIssuer({id : login._id}, '1 day') 
            const doctor = await Doctor.findById(login._id)
            if(comparedPassword){
                console.log(`inició sesión con '${crendentials.email}'`)            
                res.status(200).json({  
                            status: 200,
                            data:
                                {
                                    token: token,
                                    doctor
                                }
                            })
            }else{
                console.log(`contraseña incorrecta`);            
                res.status(401).json({ 
                                        message: `correo o contraseña incorrecta`
                                    })
            }
            
        }
    }
    catch(err){
        console.error(err.details)
        if(err.name === 'ValidationError'){
        res.send(err.message)
        }
        console.log(err)
        res.status(500).json({
            status: 500,
            message:"Error de al verificar"
        })    
    }
    
}

const signup = async (req = request, res = response)=>{      
    
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


}

module.exports = {
    login,
    signup
}