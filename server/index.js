import { Express } from "express"
import morgan from "morgan"
import {  Server as Socketserver } from "socket.io"
import http from "http"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import { create } from "domain"

//Configuracion Mongoose
var url = 'mongodb+srv://maru:l9u7eMUCBFEdOmVx@chatweb.89xjhf2.mongodb.net/?retryWrites=true&w=majority';
mongoose.Promise = global.Promise

const app = Express ()

const PORT = 4000

//Se crea el http

const server = http.createServer(app)
const io = new Socketserver(server, {
    core:{
        origin: '*'
    }
})

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ 
    extended: false
}))
app.use(bodyParser.json())



//conexión de la app a mongooseDB
mongoose.connect(url, {useNewUrlParser: true.then}).then(() => {
    console.log('conexión a la DB realizada con éxitos')
    server.listen(PORT, () => {
        console.log('Servidor Corriendo en el puerto', PORT)
    })
})

