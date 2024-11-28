const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// SIGN UP ROUTE HANDLER
exports.signup = async (req, res) => {
    try {
        // GET DATA 
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        // HASH PASSWORD
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to hash password',
            });
        }

        // CREATE ENTRY FOR NEW USER
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        })

        return res.status(200).json({
            success: true,
            message: 'User created Successfully',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User Cannot be registered, please try again later',
        });
    }
}

// LOGIN ROUTE HANDLER

exports.login = async (req, res) => {
    try {
        // DATA FETCH
        const { email, password } = req.body;

        // VALIDATION ON EMAIL AND PASSWORD
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the required fields',
            });
        }

        // CHECK FOR REGISTERED USER
        let user = await User.findOne({email});
        // IF NOT REGISTERED USER
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        }

        // PAYLOAD DATA
        const payload = {
            _id: user._id,
            email: user.email,
            role: user.role,
        };

        // VERIFY PASSWORD AND GENERATE A JWT TOKEN
        if(await bcrypt.compare(password, user.password)){
            //  PASSWORD MATCHED
            let token = jwt.sign(payload,
                                 process.env.JWT_SECRET,
                                 {
                                    expiresIn: '2h',
                                 });

            user.token = token;

            const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User logged in successfully',
            });

        }
        else{
            //  PASSWORD DID NOT MATCH
            return res.status(400).json({
                success: false,
                message: 'Invalid password',
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be logged in, please try again later',
        });
    }
}

exports.getallUsers = async(req, res) => {
    try{
        
        // fetch all todo items from the database
        const users = await User.find({});

        //response
        res.status(200).json({
            success: true,
            data: users,
            message: 'All Users are fetched successfully.',
        });

    } catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

exports.getUser = async(req, res) => {
    try {
        
        const {id} = req.params;

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send user data
        res.status(200).json({
            success: true,
            user: user,
        });
    } catch (error) {
        console.error("Error fetching user by token:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Delete handler 
exports.deleteUser = async(req, res) => {
    try{
        const {id} =  req.params;

        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'User Entry DELETED successfully.'
        }); 

    } catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });  
    }
}

exports.createUser = async(req, res) => {
    try{
        // Extract title and description from request
        const { name, email, password, role } = req.body;

        // Create a todo object and insert it into DataBase
        const response = await Todo.create({ name, email, password, role });

        // Send a JSON response with a success message
        res.status(200).json({
            success: true,
            data: response,
            message: 'NEW USER Entry created successfully.'
        }); 

    } catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });  
    }
}

exports.updateUser = async(req, res) => {
    try{
        
        const {id} = req.params;
        const {name, email} = req.body;
        const todo = await User.findByIdAndUpdate(
            { _id: id },
            { name, email }
        )

        res.status(200).json({
            success: true,
            data: User,
            message: 'User Entry updated successfully.'
        }); 

    } catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        }); 
    }
}
