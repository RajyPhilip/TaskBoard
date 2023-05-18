const express = require('express');
const UserController = require('../controller/userController');
const verifyToken = require('../middleware/jwt_verify');
const router = express.Router();

router.post('/user/create',UserController.registerUser);
router.post('/user/login',UserController.login);
router.post('/create_list',verifyToken,UserController.createList);
router.post('/create_task/:listID',verifyToken,UserController.createTask);
router.post('/list/all',verifyToken,UserController.getAllList);
router.post('/task/all/:id',verifyToken,UserController.getAllTaskOfList);



module.exports = router ;