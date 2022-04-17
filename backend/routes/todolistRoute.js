const express = require('express');
const router = express.Router();
const ToDoList= require('../models/ToDoLists')
const authUser = require('../middleware/auth');

router.post('/', authUser, async (req, res) => {
    const { task, completed  } = req.body;
    
    try {
        const list = await ToDoList.create({ task,completed, creator: req.user._id });
        req.user.lists.push(list._id);
        await req.user.save();
        res.json(list)
    } catch (e) {
        res.status(400).json(e.message);
    }
})

router.get('/me',authUser,  async (req, res) => {
    try {
        const user = req.user;
        user.populate('lists').then(({lists }) => {
            res.json(lists)
        })
    } catch (error) {

        res.status(400).json(error.message);
    }
})

router.delete('/:id', authUser, async (req, res) =>{

    const {id} = req.params;
    try {
        const list = await ToDoList.findById(id);
        if( list.creator.toString() === req.user._id.toString()){
            await list.remove();
            res.status(200).send();
        }
        else{
            res.status(401).json("You don not have authorization")
        }
    } catch (e) {
        res.status(400).json(e.message);
    }

})

router.patch('/me/:id', authUser, async(req,res)=>{
    const {id} = req.params;
    const {completed} = req.body;
     try {
        const list = await ToDoList.findByIdAndUpdate(id, {completed})
        res.status(200).send()
    } catch (e) {
        res.status(400).json(e.message);
    }
})

module.exports = router;