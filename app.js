const express = require('express')
require("dotenv").config();
const app = express();
const PORT = 3000;
const connectDB = require('./database/db');
const auth = require('./routes/auth.routes');
const book = require('./routes/book.routes');

connectDB();

app.use(express.json());

app.use('/',auth);
app.use('/book',book);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})