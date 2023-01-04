const router = require('express').Router();
const { verifyUserToken, isUser } = require('../middleware/authVerify');

const todoController = require('../controllers/todo');

// Create new todo
router.post('/:userId/new', verifyUserToken, isUser, todoController.createTodo);

// Get all todos
router.get('/:userId/getAll', verifyUserToken, isUser, todoController.getAllTodo);

// Get some todos
// router.get('/:userId/getSome/:query');

// Update todo
router.patch('/:userId/update/:todoId', verifyUserToken, isUser, todoController.updateTodo);

// Delete all todos
router.delete('/:userId/deleteAll', verifyUserToken, isUser, todoController.deleteAllTodos);

// Delete by ID Method
router.delete('/:userId/deleteOne/:todoId', verifyUserToken, isUser, todoController.deleteTodoById);

module.exports = router;