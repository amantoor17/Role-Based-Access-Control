const express = require('express');
const cors = require("cors");

const app = express();

// Allow requests from your frontend
app.use(cors({
    origin: "https://role-based-access-control-sigma.vercel.app/api/v1", // Allow this specific origin
    methods: "GET,POST,PUT,DELETE", // Specify allowed methods
    credentials: true // Include credentials if needed (e.g., cookies)
}));

// const allowedOrigins = ["http://localhost:3000", "http://localhost:5173","https://role-based-access-control-sigma.vercel.app"];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));


require('dotenv').config();
const PORT = process.env.PORT || 4000;

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

