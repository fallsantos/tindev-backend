const mongoose = require('mongoose')

class Database {
    constructor() {
        this.init()
    }
    
    async init() {
        const db = await mongoose.mongoose.createConnection(
            process.env.MONGO_URL_CONNECTION,
            {
                useNewUrlParser: true,
                //useFindAndModify: true,
                useUnifiedTopology: true,
            }
        )

        db.on('error', console.error.bind(console, '~ connection error: '))
        
        db.once('open', function() {
            console.log('~ mongodb connected...')
        }) 
    }
}

module.exports = new Database()