const express = require('express');
const app = express();

const sequelize = require('./db');           // import sequelize
const Book = require('./models/book.model');      // import Book model

const Transaction = require('./models/transaction.model');
const Member = require('./models/member.model');
const Fine = require('./models/fine.model');

// Sync database (adds missing columns like 'available')'
sequelize.sync({ alter: true })
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.error('Error syncing database:', err));

// Correct route imports
const bookRoutes = require('./routes/book.routes');
const fineRoutes = require('./routes/fine.routes');
const memberRoutes = require('./routes/member.routes');
const transactionRoutes = require('./routes/transaction.routes');

app.use(express.json());

// Use routes
app.use('/books', bookRoutes);
app.use('/fines', fineRoutes);
app.use('/members', memberRoutes);
app.use('/transactions', transactionRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
