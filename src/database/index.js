const mongoose = require('mongoose')

class Database {
    constructor() {
        this.init()
            .then(() => {
                console.log('~ database connected')
            })
            .catch(error => {
                console.log('x database connection error: ' + error)
            })
    }
    
    async init() {
        await mongoose.mongoose.connect(
            process.env.MONGO_URL_CONNECTION,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
    }
}

module.exports = new Database()