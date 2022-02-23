const axios = require('axios')

const Dev = require('../models/Dev')

class DevController {
    async store(req, res) {
        const { username: user } = req.body

        let userExists = await Dev.findOne({user})

        if(userExists){
            return res.json({
                status: false,
                data: userExists
            })  
        }

        const response = await axios.get(`https://api.github.com/users/${username}`)

        const {name, bio, avatar_url: avatar } = response.data

        const newDev = await Dev.create({
            name,
            user,
            bio,
            avatar
        })

        return res.json({
            status: true,
            data: newDev
        })
    }


}

module.exports = new DevController()