const express = require('express');
const cors = require('cors');

const connectDataBase = require('../../config/database');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 3001;
        this.doctorPath = '/api/doctor';
        this.authPath = '/api/auth';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await connectDataBase();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );
        this.app.use(express.urlencoded({extended:false}));

    }

    routes() {
        this.app.use( this.doctorPath, require('../routes/doctors'));
        this.app.use( this.authPath, require('../routes/auth'));
    }

    listen() {
        this.app.listen( this.port , () => {
            console.log('Servidor corriendo en puerto', this.port  );
        });
    }

}




module.exports = Server;
