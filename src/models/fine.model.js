// models/fineModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Member = require('./member.model');
const Transaction = require('./transaction.model');

const Fine = sequelize.define('Fine', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  issuedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Associations
Member.hasMany(Fine);
Fine.belongsTo(Member);

Transaction.hasMany(Fine);
Fine.belongsTo(Transaction);

module.exports = Fine;
