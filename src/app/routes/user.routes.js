const {Router} = require('express')

const DevController = require('../controllers/DevController')

const routes = Router()

routes.post('/', DevController.store)

routes.get('/', (req, res) => {
    return res.json({result: 'todos os usuários'})
})

module.exports = routes