const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");

router.get("/", transactionController.getAllTransactions);
router.post("/issue", transactionController.issueBook);
router.post("/return", transactionController.returnBook);
router.get("/:id", transactionController.getTransactionById);

module.exports = router;
