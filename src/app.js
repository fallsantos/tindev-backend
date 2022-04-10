const express = require('express')
const cors = require('cors')
const { createServer } = require('http')
const { Server } = require('socket.io')

require('./database')

const routes = require('./app/routes')

class App {
     constructor(){
         this.server = express()

         this.socket()
         this.middlewares()
         this.routes()
     }

     socket() {
      const httpServer = createServer(this.server)
  
      const io = new Server(httpServer, {
        cors: {
          origin: '*'
        }
      })

      const connectedUsers = {}
      
      io.on('connection', socket => {
        //console.log(socket.id)
        const { user } = socket.handshake.query

        connectedUsers[user] = socket.id

        console.log(user + ' - ' + socket.id)
      })
  
      this.server.use((req, res, next) => {
        req.io = io
        req.connectedUsers = connectedUsers
        return next()
      })
  
      this.server.set('server', httpServer)
    }
  
    middlewares() {
      this.server.set('port', process.env.PORT || 3006)
  
      this.server.use(express.json())
  
      this.server.use(morgan('dev'))
  
      // CORS
      this.server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET, POST')
        res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, Authorization')
  
        next()
      })
  
      this.server.use(cors())
  
      // Rota para os arquivos estáticos(imagens) dos posts.
      this.server.use('/files', express.static(path.resolve(__dirname, '..', '..', 'uploads', 'resized')))
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