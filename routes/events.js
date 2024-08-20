const {Router} = require('express')
const { validaJwt } = require('../middlewares/validaJwt')
const { getEventos, crearEvento, actualizarEvento, EliminarEvento } = require('../controllers/events')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/valida-campos')
const isDate = require('../helpers/isDate')


const router = Router()

router.use(validaJwt)

router.get('/',
  
    getEventos)

router.post('/',
    [
        check('title',  'El título es obligatorio').not().isEmpty(),
        check('start',   'Fecha de inicio es obligatoria').custom(isDate),
        check('end',   'Fecha de fin es obligatoria').custom(isDate),



        validarCampos
    ]
    ,crearEvento)


router.put('/:id',actualizarEvento)


router.delete('/:id',EliminarEvento)


module.exports = router