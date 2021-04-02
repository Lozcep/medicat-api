const authService = require('../services/authService')


authToken = (req, res, next) => {

    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) { 
        try {
            const bearerPass = bearerHeader.split(" ")[0]
        
            if(bearerPass === "bearer" || bearerPass === "Bearer" ){

            const token = bearerHeader.split(" ")[1]
            decoded =  authService.JWTVerify(token)
            req.doctorId = decoded.id
            next();
            }else{
            console.log("Error en el Authorization Header")
            res.status(401).json({ 
                status: 401,
                message: 'Token inválido' }); 
            }
        } catch (error) {
            console.log(error)
            res.status(401).json({ 
                status: 401,
                message: 'Token inválido' }); 
        }
              
      } else {
      res.status(401).send({
            status: 401,  
            message: 'Token no proveído' 
            });
    }
 }


 module.exports= authToken 