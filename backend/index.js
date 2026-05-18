const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const mongooseDB = require('./config/db');
const authRoutes = require('./routes/authRoute')
dotenv.config();

const app = express();
app.use('/api/auth',authRoutes)
mongooseDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("server is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});