// models/transaction.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Book = require('./book.model');
const Member = require('./member.model');

const Transaction = sequelize.define('Transaction', {
  issueDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },

  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },

  returnDate: {
    type: DataTypes.DATE,
    allowNull: true
  },

  status: {
    type: DataTypes.ENUM('issued', 'returned'),
    allowNull: false,
    defaultValue: 'issued'
  }
});

// Associations
Member.hasMany(Transaction, { foreignKey: { allowNull: false } });
Transaction.belongsTo(Member);

Book.hasMany(Transaction, { foreignKey: { allowNull: false } });
Transaction.belongsTo(Book);

module.exports = Transaction;
