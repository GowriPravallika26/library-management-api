// controllers/fines.js
const Fine = require('../models/fine.model');
const Member = require('../models/member.model');
const Transaction = require('../models/transaction.model');

// Get all fines
const getAllFines = async (req, res) => {
  try {
    const fines = await Fine.findAll({ include: [Member, Transaction] });
    res.json(fines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a fine
const createFine = async (req, res) => {
  try {
    const fine = await Fine.create(req.body);
    res.status(201).json(fine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update fine (e.g., mark as paid)
const updateFine = async (req, res) => {
  try {
    const fine = await Fine.findByPk(req.params.id);
    if (!fine) return res.status(404).json({ message: "Fine not found" });
    await fine.update(req.body);
    res.json(fine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete fine
const deleteFine = async (req, res) => {
  try {
    const fine = await Fine.findByPk(req.params.id);
    if (!fine) return res.status(404).json({ message: "Fine not found" });
    await fine.destroy();
    res.json({ message: "Fine deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllFines, createFine, updateFine, deleteFine };
