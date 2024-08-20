const jwt = require('jsonwebtoken')

const generarJWT = (uid, name) =>{

    return new Promise((resolve,reject)=>{

        const payload = {uid,name}


        const clave = 'jdasjdanjio2130'
         
        jwt.sign(payload, clave, {
            expiresIn: '2h'
        },(err,token)=>{

            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            }

            resolve(token)
        })

    })


}

module.exports = {
    generarJWT
}