const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./library.sqlite"
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Book = require("./book.model")(sequelize, DataTypes);
db.Member = require("./member.model")(sequelize, DataTypes);
db.Transaction = require("./transaction.model")(sequelize, DataTypes);
db.Fine = require("./fine.model")(sequelize, DataTypes);

// RELATIONS
db.Book.hasMany(db.Transaction);
db.Transaction.belongsTo(db.Book);

db.Member.hasMany(db.Transaction);
db.Transaction.belongsTo(db.Member);

db.Member.hasMany(db.Fine);
db.Fine.belongsTo(db.Member);

db.Transaction.hasOne(db.Fine);
db.Fine.belongsTo(db.Transaction);

module.exports = db;
