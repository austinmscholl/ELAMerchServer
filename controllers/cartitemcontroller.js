let express = require('express')
let router = express.Router()
let sequelize = require('../db')
let CartItem = sequelize.import('../models/cartitem')
let validateSession = require('../middleware/validate-session')

router.post('/:cart_id/:item_id', validateSession, (req, res) => {
    CartItem
        .create({
            cartId: req.params.cart_id,
            itemId: req.params.item_id,
            size: req.body.size,
            quantity: req.body.quantity
        })
        .then(item => res.json(item))
})



module.exports = router