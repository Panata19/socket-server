import Server from "./clases/server";
import { SERVER_PORT } from "./global/enviroments";
import router from "./routes/router";
import bodyParser from 'body-parser'
// import cors from 'cors'
const cors = require('cors');

const server  = Server.instance;
//commonjs syntax

//Body Paser 

server.app.use( bodyParser.urlencoded({ extended : true}))
server.app.use( bodyParser.json())

//Cors



server.app.use( cors({ origin: true, credentials: true  }) );

//Rutas de servicios 
server.app.use('/', router)


server.start(()=>{
    console.log("Corriendo el servidor en el puerto", server.port)
})