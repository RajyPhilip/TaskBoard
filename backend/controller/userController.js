const User =  require("../models/user");
const jwt =  require("jsonwebtoken");
const List = require('../models/list');
const Task = require('../models/task');


// Register user
module.exports.registerUser =  async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        // Create user
        const user = new User({
            name: name,
            email: email,
            password: password,
        });
        await user.save();
        return res.status(201).json({
            message: 'User registered',
        });
    } catch (error) {
    next(error);
    }
}
// Login User
module.exports.login = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email: email });
        if(!user) return res.status(400).json({
                message: 'Invalid Credentials',
                success:false
            }); 
        if(user.password != password) return res.status(403).json({
                message: 'Invalid Password or Email'
            });
        const token = jwt.sign({id: user._id}, "secretkey");
        return res
        .cookie("token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({ msg: "logIn sucessfully" ,details: { ...user._doc, password: 'undefine' },token:token });
    } catch (error) {
        next(error);
    }
};

// create list 
module.exports.createList = async (req, res, next) => {
    
    try {
        // Create List
        
        const list = new List({
            name: req.body.title,
            user: req.user.id,
        });
        await list.save();
        return res.status(201).json({
            message: 'List Created Successfully ',
            data:list
        });
    } catch (error) {
        next(error);
    }
};

// create task  
module.exports.createTask = async (req, res, next) => {
    try {
                // Create List
                const task = new Task({
                    title: req.body.name,
                    completed: false,
                    list:req.params.listID
                });
                await task.save();
                return res.status(201).json({
                    message: 'Task Created Successfully ',
                    data:task
                });
    } catch (error) {
        next(error);
    }
};
//get user lists 
module.exports.getAllList = async (req, res, next) => {
    try {
        
                const lists = await List.find({user:req.user.id})
                return res.status(201).json({
                    message: 'Found user list Successfully ',
                    data:lists
                });
    } catch (error) {
        next(error);
    }
}
// get every list all tasks 
module.exports.getAllTaskOfList =async (req, res, next) => {
    try {    
        const tasks = await Task.find({list:req.params.id});
        return res.status(201).json({
            message: 'Found tasks of a  list Successfully ',
            tasks
        });
    } catch (error) {
        next(error);
    }
}