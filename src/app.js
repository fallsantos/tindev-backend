const express = require('express')
const cors = require('cors')
require('./database')

const routes = require('./app/routes')

class App {
     constructor(){
         this.server = express()

         this.middlewares()
         this.routes()
     }

     middlewares(){
        this.server.use(cors())
        this.server.set('port', process.env.PORT)
        this.server.use(express.json())
     }

     routes(){
        this.server.use(routes)
     }
 }

module.exports = new App().server