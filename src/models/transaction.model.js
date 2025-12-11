// models/transactionModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Book = require('./book.model');
const Member = require('./member.model');

const Transaction = sequelize.define('Transaction', {
  issueDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('issued', 'returned'),
    defaultValue: 'issued'
  }
});

// Associations
Member.hasMany(Transaction);
Transaction.belongsTo(Member);

Book.hasMany(Transaction);
Transaction.belongsTo(Book);

module.exports = Transaction;
