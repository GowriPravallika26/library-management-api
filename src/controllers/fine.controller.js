// Fine Controller

exports.getAllFines = (req, res) => {
    res.json({ message: "All fines list" });
};

exports.getFineByMember = (req, res) => {
    res.json({ message: `Fine details for member ID ${req.params.id}` });
};

exports.addFine = (req, res) => {
    res.json({ message: "Fine added successfully" });
};

exports.clearFine = (req, res) => {
    res.json({ message: `Fines cleared for member ID ${req.params.id}` });
};
