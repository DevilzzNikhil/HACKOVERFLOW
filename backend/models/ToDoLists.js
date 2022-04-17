const mongoose = require('mongoose');
const {Schema} = mongoose ;


const ToDoListSchema= new Schema({

    creator: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true},

    task: {
        type: 'string',
        required: true
    },
    completed: {
        type: Boolean,
        default: true
    },
});

const ToDoList = mongoose.model('ToDoList', ToDoListSchema);
module.exports = ToDoList ;

