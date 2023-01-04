const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Todo', TodoSchema);