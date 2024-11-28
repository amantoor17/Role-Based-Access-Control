const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { login, signup, getallUsers, deleteUser, createUser, updateUser, getUser } = require("../controllers/Auth");
const { auth, isUser, isAdmin, isModerator} = require("../middlewares/auth");

router.post('/login', login);
router.post('/signup', signup);
router.get('/getallUsers', getallUsers);
router.get('/getuser/:id', getUser);
router.delete('/deleteUser/:id', deleteUser);
router.put('/createUser', createUser);
router.post('/updateUser/:id', updateUser);

// Protected Routes

// TESTING ROUTE
router.get('/test', auth, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the Protected route for TEST.',
    });
});

// USER ROUTE
router.get('/user', auth, isUser, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the Protected route for USERS.',
    });
});

// ADMIN ROUTE
router.get('/admin', auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the Protected route for ADMIN.',
    });
});

// MODERATOR ROUTE
router.get('/admin', auth, isModerator, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the Protected route for MODERATOR.',
    });
});


module.exports = router;
