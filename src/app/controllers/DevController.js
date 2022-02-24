const axios = require('axios')

const Dev = require('../models/Dev')
const { use } = require('../routes/user.routes')

class DevController {
    async store(req, res) {
        const { username: user } = req.body

        let userExists = await Dev.findOne({user})

        if(userExists){
            return res.json({
                status: false,
                message: 'User already registered',
                data: userExists
            })  
        }

        const response = await axios.get(`https://api.github.com/users/${user}`)

        const {name, bio, avatar_url: avatar } = response.data

        const newDev = await Dev.create({
            name,
            user,
            bio,
            avatar
        })

        return res.json({
            status: true,
            message: 'User registered successfully',
            data: newDev
        })
    }

    async index(req, res) {
        const { user } = req.headers

        const loggedUser = await Dev.findById({ _id: user })

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedUser.likes } },
                { _id: { $nin: loggedUser.dislikes }}
            ]
        })

        return res.status(400).json({
            status: true,
            message: '',
            data: users
        })
    }
}

module.exports = new DevController()