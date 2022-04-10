const Dev = require('../models/Dev')

class LikeController {
    async like(req, res) {
        const { user } = req.headers
        const { id } = req.params

        const loggedDev = await Dev.findById({ _id: user })
        const targetDev = await Dev.findById({ _id: id })

        if(!targetDev){
            return res.status(400).json({
                status: false,
                message: 'Dev not exists',
                data: null
            })
        }

        loggedDev.likes.push(targetDev._id)

        await loggedDev.save()

        if(targetDev.likes.includes(loggedDev._id)){
            const loggedSocket = req.connectedUsers[user]
            const targetSocket = req.connectedUsers[id]

            // Avisa se estiver conectado(ao cliente io conectado)
            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev)    
            }

            if(targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev)    
            }
            /*return res.json({
                status: true,
                message: 'Match!',
                data: null
            })*/
        }

        return res.json({
            status: true,
            message: 'You like it',
            data: targetDev.user
        })
    }

    async dislike(req, res) {
        const { id } = req.params
        const { user } = req.headers

        const loggedDev = await Dev.findById({ _id: user })
        const targetDev = await Dev.findById({ _id: id })

        if(!targetDev){
            return res.status(400).json({
                status: false,
                message: 'Dev not exists',
                data: null
            })
        }

        loggedDev.dislikes.push(targetDev._id)

        await loggedDev.save()

        return res.json({
            status: true,
            message: 'Did not you like it!',
            data: targetDev.user
        })
    }
}

module.exports = new LikeController()