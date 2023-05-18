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
                const list = await List.findOne({_id:req.params.listID})
                list.taskOrder.push(task)
                await list.save();
                
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
// update order
module.exports.updateTaskOrder = async (req, res, next) => {
    try {
        const { sourceListId, destinationListId, sourceOrder, destinationOrder } = req.body;
      // Update the source list's task order
        const source = await List.findById({_id : sourceListId});
        source.taskOrder = sourceOrder;
    
     // Update the destination list's task order
        const dest = await List.findByIdAndUpdate(destinationListId);
        dest.taskOrder = destinationOrder;
    
        await source.save();
        await dest.save();
    
        return res.status(200).json({ success: true, message: "Task order updated successfully" });
    } catch (error) {
        next(error);
    }
};

// update task status 
module.exports.updateTaskStatus = async (req, res, next) => {
    try {
        console.log('reached')
        const taskId = req.body.taskId;
        const listId = req.body.listId;
        
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        
        const currentVal = task.completed;
        task.completed = !currentVal;
        await task.save();
        
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ success: false, message: "List not found" });
        }
        const taskIndex = list.taskOrder.findIndex ((item) => item._id.toString() === taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ success: false, message: "Task not found in the list" });
        }
        
        list.taskOrder[taskIndex].completed = !currentVal;
        const updatedOrder = list.taskOrder.toObject() ;
        await List.findByIdAndUpdate(listId,{
            taskOrder:updatedOrder
        }) ;
        console.log('hhhhh')
        
        return res.status(200).json({ success: true, message: "Task status updated successfully" ,data:updatedOrder});
    } catch (error) {
        next(error);
    }
};







