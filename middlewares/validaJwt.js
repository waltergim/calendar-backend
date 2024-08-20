const {response} = require('express')
const jwt = require('jsonwebtoken')

const validaJwt = (req,res = response,next) =>{

    const token = req.header('x-token')
   
    if (!token) {
        return res.status(401).json({
            ok: false,
            mensaje: 'No hay token en la peticion'
        })
    }



    try {
        const clave = 'jdasjdanjio2130'

        const {uid, name } =  jwt.verify(token, clave)
  
        req.uid =  uid
        req.name = name

        


        
    } catch (error) {
        return  res.status(401).json({
            ok: false,
            mensaje: 'Token no válido'
        })

    }
    
    next()
}


module.exports = {
    validaJwt
}



