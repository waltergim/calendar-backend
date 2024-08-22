 

 const express = require('express')
 const cors =  require('cors')

const { dbConnection } = require('./database/config')
const   path  = require('path')
 
//  crear el servidor

const app = express()


// base de datos
dbConnection()

app.use(cors())


// Directorios publicos
app.use(express.static('public'))

// lectura y parseo del body
app.use(express.json())

// rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events'  , require('./routes/events'))

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));  
});

// escuchar peticiones

app.listen( 4000, ()=>{
    console.log(`sevidor corriendo en el puerto ${ 4000 }`);
    
})