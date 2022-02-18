require('dotenv').config()

const app = require('./app')

const PORT = app.get('port')

app.listen(PORT, () => {
    console.log(`~ server running on port ${PORT}`)
})