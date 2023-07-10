import { Express } from "express"
import morgan from "morgan"
import {  Server as Socketserver } from "socket.io"
import http from "http"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import { create } from "domain"

//Configuracion Mongoose
var url = 'mongodb+srv://marumartinez:joseJuli22@chatweb.89xjhf2.mongodb.net/?retryWrites=true&w=majority';
mongoose.Promise = global.Promise

const app = Express ()

const PORT = 4000

//Se crea el http

const server = http.createServer(app)
const io = new Socketserver(server, {
    cors:{
        origin: '*'
    }
})

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ 
    extended: false
}))
app.use(bodyParser.json())


app.use('/api', router);
//conexión de la app a mongooseDB
mongoose.connect(url, { useNewUrlParser: true }).then(() =>{
    console.log('Conexión con la BDD realizada con éxito!!!');
    server.listen(PORT, () =>{
		console.log('servidor ejecutándose en http://localhost:', PORT );
	});
})

