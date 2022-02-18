const express = require('express')

 class App {
     constructor(){
         this.server = express()

         this.middlewares()
         this.routes()
     }

     middlewares(){
        this.server.set('port', process.env.PORT)
     }

     routes(){
        this.server.get('/', (req, res) => {
            return res.json({
                hello: 'world'
            })
        })
     }
 }

module.exports = new App().server