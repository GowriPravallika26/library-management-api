const express = require("express");
const router = express.Router();
const fineController = require("../controllers/fine.controller");

router.get("/", fineController.getAllFines);
router.get("/:id", fineController.getFineByMember);
router.post("/", fineController.addFine);
router.delete("/:id", fineController.clearFine);

module.exports = router;
