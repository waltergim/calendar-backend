

const mongoose = require('mongoose')

const dbConnection = async() =>{

    try {
      await  mongoose.connect(`mongodb+srv://mern_user:k3n3aqFtPNUhLetd@calendardb.0twf6.mongodb.net/?retryWrites=true&w=majority&appName=calendarDB`);

      console.log('DB Online');
      
    } catch (error) {
        console.log(error);
        throw new Error('Error en conectar a la base de dato')
        
    }

}


module.exports ={
    dbConnection
}
