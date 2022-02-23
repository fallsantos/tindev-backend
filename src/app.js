const express = require('express')

require('./database')

const routes = require('./app/routes')

class App {
     constructor(){
         this.server = express()

         this.middlewares()
         this.routes()
     }

     middlewares(){
        this.server.set('port', process.env.PORT)
        this.server.use(express.json())
     }

     routes(){
        this.server.use(routes)
     }
 }

module.exports = new App().server