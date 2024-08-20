
const {Router} = require('express')
const { crearUsuario, revarlidarToken, loginUsuario } = require('../controllers/auth')
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/valida-campos')
const { validaJwt } = require('../middlewares/validaJwt')


const router = Router()



router.post('/new', 
[
    check('name', 'El nombre es obligatirio').not().isEmpty(),
    check('email', 'El email es obligatirio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({ min:6 }),
    validarCampos
]
, crearUsuario)

router.post('/',
    [
        check('email', 'El email es obligatirio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min:6 }),
        validarCampos
    ] 
    ,loginUsuario)

router.get('/renew',validaJwt,revarlidarToken)



module.exports = router;

// k3n3aqFtPNUhLetd                      mern_user