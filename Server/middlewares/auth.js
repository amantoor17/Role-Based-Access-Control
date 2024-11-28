// auth, isUser, isAdmin, isModerator

const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.auth = (req, res, next) => {
    try{
        // Extract JWT TOKEN
        // Given below are 3 ways to fetch JWT token
        const token = req.body.token || req.cookies.token || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));
        if(!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided',
            });
        }

        // Verify the token
        try {

            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token Payload:", payload);
            console.log('USER BEFORE PAYLOAD:', req.user);
            req.user = payload;
            console.log('USER AFTER PAYLOAD:', req.user);
            next();

        } catch(error) {
            return res.status(400).json({
                success: false,
                message: 'Token is Invalid',
            });
        }

        // next();

    } catch(error) {
        return res.status(401).json({
            success: false,
            message: 'something went wrong, while verifying token',
        });
    }
}

exports.isUser = (req, res, next) => {
    try {
        if(req.user.role !== 'User') {
            return res.status(401).json({
                success: false,
                message: 'You are not a USER',
            });
        }

        next();

    } catch(error) {
        return res.status(401).json({
            success: false,
            message: 'something went wrong, while checking for USER role',
        });
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if(req.user.role !== 'Admin') {
            return res.status(401).json({
                success: false,
                message: 'You are not a ADMIN',
            });
        }

        next();

    } catch(error) {
        return res.status(401).json({
            success: false,
            message: 'something went wrong, while checking for ADMIN role',
        });
    }
}

exports.isModerator = (req, res, next) => {
    try {
        if(req.user.role !== 'Moderator') {
            return res.status(401).json({
                success: false,
                message: 'You are not a MODERATOR',
            });
        }

        next();

    } catch(error) {
        return res.status(401).json({
            success: false,
            message: 'something went wrong, while checking for MODERATOR role',
        });
    }
}