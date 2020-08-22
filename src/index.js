const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port =  process.env.port || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


const multer =  require('multer')

const upload = multer({
    dest: 'images',
    limits:1000000,
    fileFilter (req, file, callback) {
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return callback(new Error('Please upload a word document'))
        }
        callback(undefined, true)
    }
})

const errorMiddleware = (req, res, next) => {
    throw new Error('From my middleware')
}

app.post('/upload', errorMiddleware ,(req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

// app.post('/upload', upload.single('upload') ,(req, res) => {
//     res.send()
// })

app.listen(port, () => {
    console.log('Server is up on prt '+port);
}) 

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {

//     const token = jwt.sign({ _id:'abc123'}, 'thisismynewcourse', {expiresIn:'7 days'})
//     console.log(token)

//     const data =  jwt.verify(token, 'thisismynewcourse')
//     console.log(data)

// }

// myFunction()