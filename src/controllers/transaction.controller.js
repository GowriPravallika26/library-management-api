// Transaction Controller

exports.getAllTransactions = (req, res) => {
    res.json({ message: "All transactions list" });
};

exports.issueBook = (req, res) => {
    res.json({ message: "Book issued successfully" });
};

exports.returnBook = (req, res) => {
    res.json({ message: "Book returned successfully" });
};

exports.getTransactionById = (req, res) => {
    res.json({ message: `Transaction details for ID ${req.params.id}` });
};
