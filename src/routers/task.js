const express =  require('express')
const auth =  require('../middleware/authentication')
const Task =  require('../models/task')

const router =  new express.Router()

router.post('/tasks', auth, async (req,res) => {
    try {
        //const task =  new Task(req.body)
        const task =  new Task({
            ...req.body,
            owner: req.user._id
        })
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send()
    }
})

// Get /tasks?completed=true
// Get /tasks?limit=10&skip=20
// Get /tasks?sortBy=createdAt:desc
router.get('/tasks', auth , async (req, res) => {
    try {
        const match = {}
        const sort = {}

        if(req.query.sortBy){
            const parts =  req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }

        if(req.query.completed){
            match.completed =  req.query.completed === 'true'
        }
        // First approach  to fetch all the tasks
        //const tasks = await Task.find({owner: req.user._id})

        // Second approach to fetch all the tasks
        //await req.user.populate('tasks').execPopulate()

        // In this we have implemented filter when we are fetching the tasks without object destructuring
        //  await req.user.populate({
        //      path: 'tasks',
        //      match: {
        //          completed:true
        //      }
        //  }).execPopulate()

        // With object destructuring
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()

        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth,  async (req, res) => {
    const _id = req.params.id
    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.send(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowUpdates = ['completed', 'description']

    const isValidOperations = updates.every((update) => allowUpdates.includes(update))

    if(!isValidOperations){
        return res.status(400).send({error:'Invalid Updates!'})
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id)

        updates.forEach((upadte) => {
            tasl[update] = req.body[update]
        })

        updates.save()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error )
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        //const task = await Task.findByIdAndDelete(req.params.id)
        
        const task =  await Task.findOneAndDelete({_id:req.params.id, owner: req.user._id})
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router