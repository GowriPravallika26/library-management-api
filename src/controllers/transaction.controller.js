// controllers/transactions.js
const { Op } = require('sequelize');
const Transaction = require('../models/transaction.model');
const Book = require('../models/book.model');
const Member = require('../models/member.model');
const Fine = require('../models/fine.model');

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [Book, Member]
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Issue a book (Create transaction)
const createTransaction = async (req, res) => {
  try {
    const { BookId, MemberId } = req.body;

    // 1️⃣ Check member exists
    const member = await Member.findByPk(MemberId);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // 2️⃣ Check book exists
    const book = await Book.findByPk(BookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // 3️⃣ Check book availability
    if (!book.available) {
      return res.status(409).json({ message: 'Book is already issued' });
    }

    // 4️⃣ Check unpaid fines
    const unpaidFine = await Fine.findOne({
      where: {
        MemberId,
        paid: false
      }
    });

    if (unpaidFine) {
      return res.status(403).json({
        message: 'Member has unpaid fines. Borrowing not allowed.'
      });
    }

    // 5️⃣ Check max 3 books rule
    const activeBorrowCount = await Transaction.count({
      where: {
        MemberId,
        status: 'issued'
      }
    });

    if (activeBorrowCount >= 3) {
      return res.status(400).json({
        message: 'Member has reached maximum borrowing limit (3 books)'
      });
    }

    // 6️⃣ Calculate due date (14 days)
    const issueDate = new Date();
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 14);

    // 7️⃣ Create transaction
    const transaction = await Transaction.create({
      BookId,
      MemberId,
      issueDate,
      dueDate,
      status: 'issued'
    });

    // 8️⃣ Update book status
    book.available = false;
    await book.save();

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Return book (Update transaction)
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
      include: [Book]
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.status === 'returned') {
      return res.status(400).json({ message: 'Book already returned' });
    }

    // Update transaction
    transaction.status = 'returned';
    transaction.returnDate = new Date();
    await transaction.save();

    // Update book availability
    transaction.Book.available = true;
    await transaction.Book.save();

    res.json({ message: 'Book returned successfully', transaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await transaction.destroy();
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
};
