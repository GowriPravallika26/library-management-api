const express = require("express");
const app = express();
const db = require("./models");

app.use(express.json());

app.use("/books", require("./routes/book.routes"));
app.use("/members", require("./routes/member.routes"));
app.use("/transactions", require("./routes/transaction.routes"));
app.use("/fines", require("./routes/fine.routes"));

db.sequelize.sync().then(() => {
    console.log("Database Ready");
    app.listen(3000, () => console.log("Server running on port 3000"));
});
