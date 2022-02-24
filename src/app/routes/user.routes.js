const {Router} = require('express')

const DevController = require('../controllers/DevController')
const LikeControlelr = require('../controllers/LikeControlelr')

const routes = Router()

routes.post('/', DevController.store)
routes.get('/', DevController.index)

routes.post('/:id/like', LikeControlelr.like)
routes.post('/:id/dislike', LikeControlelr.dislike)

module.exports = routes