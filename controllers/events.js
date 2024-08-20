const Evento = require('../models/Evento')

const getEventos = async(req,res) =>{

    const eventos  = await Evento.find()
                                 .populate('user','name')





    return  res.json({
        ok: true,
        eventos
    });

}


const crearEvento = async(req,res) =>{

    
    
    const  evento = new Evento(req.body);

    try {

    evento.user = req.uid

    const eventoDb =  await evento.save()

        

        return  res.json({
            ok: true,
            msg: 'Crear Evento',
            eventoDb
        });

    } catch (error) {
        console.log(error);
       res.status(500).json({
        ok: false,
        msg: 'Error al crear el evento'
       })
        
    }




}

const  actualizarEvento = async(req,res) =>{

    const enventoId =  req.params.id;
    const uid  = req.uid;

    try {


        const  evento = await Evento.findById(enventoId);

        if (!evento) {
            return  res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            })
        }

        
        if (  evento.user.toString() !==  uid) {
            return  res.status(401).json({
                ok: false,
                msg: 'No tienes permiso para editar este evento'
                })
        }

        const nuevoEvento  =  {
            ...req.body,
            user:  uid

        };

        const eventoActualizado = await Evento.findByIdAndUpdate(enventoId, nuevoEvento,  {new: true});




        return   res.json({
            ok: true,
            msg: 'Actualizar Evento',
            evento: eventoActualizado
        })
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el evento'
        })
        
    }




}

const EliminarEvento  = async(req,res) =>{

    const envetId =  req.params.id;
    const uid = req.uid;


    try {
        const evento =  await Evento.findById(envetId);

   if (!evento) {
        return    res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            })
        }

        
        if (  evento.user.toString() !==  uid) {
            return  res.status(401).json({
                ok: false,
                msg: 'No tienes permiso para elimar este evento'
                })
        }

        const elimnarEvento =   await Evento.findByIdAndDelete(envetId);


        return   res.json({
            ok: true,
            msg: 'Evento eliminado',
            evento: elimnarEvento
            })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el evento'
            })
        
    }



}






module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    EliminarEvento
}