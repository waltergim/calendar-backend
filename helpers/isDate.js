
const moment =  require('moment');



const isDate = (value) =>{

    if (!value) {
        return false
    }
    const Fecha = moment(value)
    if (Fecha.isValid()) {
        return  true

    }else{
        return false
    }
}

module.exports =  isDate;
