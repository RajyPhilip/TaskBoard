
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;