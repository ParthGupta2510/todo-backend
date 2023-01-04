const mongoose = require('mongoose');
const User = require('../models/User');
const Todo = require('../models/Todo');

const createTodo = async (req, res) => {
    const userId = req.params.userId;
    const { task, description } = req.body;
    const status = false;

    try {
        const checkExisting = await Todo.findOne({
            userId, task, status
        })
        if (checkExisting !== null) {
            res.status(400).json({
                message: "Same incomplete todo already exists!"
            })
        } else {
            const todo = new Todo({
                userId, task, description, status
            })
            const saveTodo = await todo.save();
            res.status(200).json({
                message: 'Todo created successfully!'
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getAllTodo = async (req, res) => {
    const userId = req.params.userId;

    try {
        const todoList = await Todo.find({ userId });
        res.status(200).json({
            todoList,
            message: 'Complete todo list returned!'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const updateTodo = async (req, res) => {
    const userId = req.params.userId;
    const todoId = req.params.todoId;
    const { task, description, status } = req.body;

    try {
        const updateTodo = await Todo.findOneAndUpdate({ id: todoId, userId }, {
            task, description, status
        })
        res.status(200).json({
            message: 'Todo updated successfully!'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deleteAllTodos = async (req, res) => {
    const userId = req.params.userId;

    try {
        const deleteAll = await Todo.deleteMany({
            userId
        })
        res.status(200).json({
            message: 'All todos deleted successfully!'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deleteTodoById = async (req, res) => {
    const { userId, todoId } = req.params;

    try {
        const deleteTodo = await Todo.deleteOne({
            id: todoId, userId
        })
        res.status(200).json({
            message: 'Todo deleted successfully!'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    createTodo,
    getAllTodo,
    updateTodo,
    deleteAllTodos,
    deleteTodoById
}