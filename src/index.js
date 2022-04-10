require('dotenv').config()

const app = require('./app')

const PORT = app.get('port')
const server = app.get('server')

server.listen(PORT, () => {
    console.log(`~ server running on port ${PORT}`)
})