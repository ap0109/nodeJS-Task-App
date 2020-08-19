const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port =  process.env.port || 3000

app.use((req, res,next ) => {
    res.status(503).send('Site is under maintainence mode. Please try after some time!')
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on prt '+port);
}) 