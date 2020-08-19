// CRUD Operations
// const {MongoClient, ObjectID} = require('mongodb')


// const connectionUrl = 'mongodb://127.0.0.1:27017'
// const databaseName = 'task-manager'

//MongoClient.connect(connectionUrl, {useNewUrlParser :true}, (error, client) => {
    // if(error){
    //     return console.log('Unable to connect to database');
    // }

    // const db = client.db(databaseName)

    // db.collection('tasks').updateMany({
    //     completed: false
    // },{
    //     $set: {
    //         completed:true
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectID('5f2d51f7bff8751718753ae8')
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result);
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('users').findOne({name:'Amit'},(error, user) => {
    //     if(error){
    //         return console.log('Unable to find user');
    //     }
    //     console.log(user);
    // })

    // db.collection('users').find({name:'Amit'}).toArray((error, users) => {
    //     console.log(users);
    // })

    // db.collection('users').find({name:'Amit'}).count((error, count) => {
    //     console.log(count);
    // })
    //5f2d525b721511222cd087e5

    // db.collection('tasks').findOne({_id:ObjectID('5f2d525b721511222cd087e5')}, (error, task) => {
    //     console.log(task);
    // })

    // db.collection('tasks').find({completed: false}).toArray((error, task) => {
    //     console.log(task);
    // })
//})