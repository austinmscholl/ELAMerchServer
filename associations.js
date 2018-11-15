let sequelize = require('./db')
let UserModel = sequelize.import('./models/user')
let ItemModel = sequelize.import('./models/item')
let CartModel = sequelize.import('./models/cart')
let CartItem = sequelize.import('./models/cartitem')
// let StockModel = sequelize.import('./models/stock')


UserModel.hasOne(CartModel)
CartModel.belongsTo(UserModel)
CartModel.belongsToMany(ItemModel, {as: 'items', through: CartItem})
// CartItem.hasMany(StockModel, {as: 'cartstock'})
// StockModel.belongsTo(CartItem)


sequelize.sync().then(console.log('Database and tables created'))