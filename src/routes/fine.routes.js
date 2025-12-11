// routes/fines.js
const express = require('express');
const router = express.Router();
const {
  getAllFines,
  createFine,
  updateFine,
  deleteFine
} = require('../controllers/fine.controller');

router.get('/', getAllFines);
router.post('/', createFine);
router.put('/:id', updateFine);
router.delete('/:id', deleteFine);

module.exports = router;
