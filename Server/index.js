const express = require('express');
const cors = require("cors");

const app = express();

// Allow requests from your frontend
app.use(cors({
    origin: "http://localhost:5173", // Allow this specific origin
    methods: "GET,POST,PUT,DELETE", // Specify allowed methods
    credentials: true // Include credentials if needed (e.g., cookies)
}));


require('dotenv').config();
const PORT = process.env.PORT || 3000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

// CONNECTING TO DATABASE
require('./config/database').connect();

// IMPORT ROUTE AND MOUNT
const user = require('./routes/user');
app.use('/api/v1', user);

// START THE SERVER
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

