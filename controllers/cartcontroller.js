let express = require('express')
let router = express.Router()
let sequelize = require('../db')
let UserCart = sequelize.import('../models/cart')
validateSession = require('../middleware/validate-session')

/* 
    used to get a user's cart
    include: nested: true includes all of the data associated with the items in the cart
*/

router.get('/', validateSession, (req, res) => {
        UserCart.findOne({
        where: {userId: req.user.id},
        include: [{all:true, nested:true}]
    })
    .then(cart => {
        res.json(cart)
    })
    .catch(err => res.send(err))
}) 

// router.put('/:id', validateSession, (req, res) => {
//     console.log(req.user.id)
//     UserCart.findOne({
//         where:{userId: req.user.id}
//     })
//         .then(cart => {
//             cart.addItems(req.params.id,{
//                 size:req.body.size,
//                 quantity:req.body.quantity
//             })
//         })
//         .then(res.send('success'))
// })

// router.put('/order/success', validateSession, (req, res) => {
//     UserCart
//         .update({
//             where:{userId:req.user.id}
//         })
//         .then(res.send('success'))
// })

// router.put('/addstock/:id', validateSession, (req, res) =>{
//     UserCart.findOne({
//         where:{userId: req.user.id}
//     })
//         .then(cart => {
//             cart.createCartstock({
//                 cartId: cart.id,
//                 itemId:req.params.id,
//                 size:req.body.size,
//                 quantity:req.body.quantity
//             })
//         })
//         .then(data => res.json(data))
// })


// used to delete an item from a user's cart
router.delete('/delete/:id', validateSession, (req, res) => {
    UserCart
        .findOne({where: {userId: req.user.id}})
        .then(cart => {
            cart.removeItem(req.params.id)
        })
})

// used to delete a cart
router.delete('/deletecart', validateSession, (req, res) => {
    console.log(req.user.id)

    UserCart.destroy({
        where:{userId: req.user.id}
    })
        .then(res.send('success'))
})

module.exports = router
