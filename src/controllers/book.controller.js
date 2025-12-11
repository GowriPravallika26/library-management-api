const db = require("../models");
const Book = db.Book;

module.exports = {
    async createBook(req, res) {
        const book = await Book.create(req.body);
        res.json(book);
    },

    async getBooks(req, res) {
        const books = await Book.findAll();
        res.json(books);
    },

    async getAvailableBooks(req, res) {
        const books = await Book.findAll({ where: { status: "available" } });
        res.json(books);
    },

    async getBookById(req, res) {
        const book = await Book.findByPk(req.params.id);
        res.json(book);
    },

    async updateBook(req, res) {
        await Book.update(req.body, { where: { id: req.params.id } });
        res.json({ message: "Updated" });
    },

    async deleteBook(req, res) {
        await Book.destroy({ where: { id: req.params.id } });
        res.json({ message: "Deleted" });
    }
};
