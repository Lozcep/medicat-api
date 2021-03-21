const express = require('express')
const router = express.Router()
const Joi = require('joi')
const bcrypt = require('bcrypt');
//const authService = require('../../services/authService')

const Credentials = require('../models/Credentials')

router.post('/', async(req, res)=>{  

    
    try{    
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()  //minimo 6 caracteres
        });        
        
        crendentials = {
            email : req.body.email,
            password : req.body.password
        }
        
        const value = await schema.validateAsync({ email: crendentials.email, password: crendentials.password })

        const login = await (await Credentials.findOne({ email: crendentials.email}))
        console.log(login)
         
        if (!login) {
            console.log(`El correo ${crendentials.email} no está registrado`);
            res.status(401).json({
                status:401,
                message: `El correo ${crendentials.email} no está registrado`})            
        } else {
            const comparedPassword = await bcrypt.compare( crendentials.password, login.password)
          //  const token = authService.JWTIssuer({id : login._id}, '1 day') 
            if(comparedPassword){
                console.log(`inició sesión con '${crendentials.email}'`)            
                res.status(200).json({  
                            status: 200,
                          //  token: token
                            })
            }else{
                console.log(`contraseña incorrecta`);            
                res.status(401).send({ 
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
        res.status(400).json({
            status: 200,
            message:"Error de al verificar"
        })    
    }
    
})

module.exports = router