const express = require('express');
const userRouter = express.Router();

const userController = require('../controller/users');

// Retrieve all users
userRouter.get('/', userController.getAllUsers);

// Retrieve a specific user by ID
userRouter.get('/:id', userController.getUserById);

// Add a new user
userRouter.post('/', userController.addUser);

userRouter.put('/:id', userController.updateUser);

userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
