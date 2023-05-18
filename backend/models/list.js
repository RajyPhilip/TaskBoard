const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    taskOrder:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task'
    }]
});
const List = mongoose.model('List', listSchema);

module.exports = List;