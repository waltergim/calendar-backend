
const {response} = require('express')
const {validationResult} =require('express-validator')
const Usuario = require('../models/Users')
const bcrypt = require('bcryptjs')
const {generarJWT} = require('../helpers/jwt')

const crearUsuario = async(req,res = response)=>{

    const {name,email,password} = req.body

    try {
        let usuario = await Usuario.findOne({email})

        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg:'ese usuario ya existe'
            })
        }


    usuario = new Usuario(req.body)

    // contra encrip
    const salt = bcrypt.genSaltSync()

    usuario.password = bcrypt.hashSync(password, salt)


    await usuario.save()

    // generar jwt
    const token = await generarJWT(usuario.id, usuario.name)

    res.status(201).json({
        ok: true,
       uid: usuario.id,
       name: usuario.name,
        token

    })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin',
        })
    }

    
}



const loginUsuario = async(req,res = response)=>{


    const {email,password} = req.body


    try {

        const usuario = await Usuario.findOne({email})

        if (!usuario) {
            return res.status(400).json({
                ok:false,
                msg:'ese usuario no existe'
            })
        }

        // confirmar las contras

        const validPassword = bcrypt.compareSync(password, usuario.password)

        if (!validPassword) {
           return res.status(400).json({
                ok: false,
                msg: 'password incorrecta',
            })
        }

        const token = await generarJWT(usuario.id, usuario.name)

        res.json({
            ok: true,
            msg: 'Login',
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin',
        })
    }


   
}

const revarlidarToken = async(req,res = response)=>{


    const uid  = req.uid;
    const  name = req.name;

    const token = await generarJWT(uid, name)


    res.json({
        ok: true,
        uid,
        name,
        token
    })


}


module.exports = {
    crearUsuario,
    loginUsuario,
    revarlidarToken
}