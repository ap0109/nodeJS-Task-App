const express = require('express')
const User = require('../models/user')
const auth =  require('../middleware/authentication')

const router =  new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()

        res.status(201).send({user:user, token:token})
    } catch (e) {
        res.status(404).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token =  await user.generateAuthToken()
        res.send( { user, token} )
    } catch (error) {
        res.status(400).send(error )
    }
})

router.post('/users/logout', auth,  async (req, res) => {
    try {
        req.user.tokens =  req.user.tokens.filter((token) => {
            return token.token != req.token
        })

        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    try {
        //const users = await User.find({})
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

//This method os of no use - We are not going to fetch user details with it's _id - 
//because we have already all the details for authentication layer
// router.get('/users/:id', async (req, res) => {
//     try {
//         const _id = req.params.id;
//         const user =  await User.findById(_id)
//         if(!user){
//             res.status(404).send()
//         }
//         res.send(user)
//     } catch (error) {
//         res.status(500).send()
        
//     }
// })

router.patch('/users/me',auth, async (req, res) => {
    try {
        const updates =  Object.keys(req.body)
        const allowUpdates = ['name', 'email', 'age', 'password']

        const isValidOperation = updates.every((update) => allowUpdates.includes(update))

        if(!isValidOperation){
            return res.status(400).send({ error:'Invalid Updates!' })
        }

        // This is working when we are not using Middleware functions - means we want to 
        // hash our password but that will work only during save method call
        // But as this is update call - we need  trick this - so that we can call save method
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        //const user =  await User.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/users/me', auth , async (req, res) => {
    try {
        //const user =  await User.findByIdAndDelete(req.params.id)
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
        
})

module.exports = router
