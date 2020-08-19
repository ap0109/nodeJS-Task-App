require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5f2e634b24c605416c4').then((task) => {
//     console.log(task);
//     return Task.countDocuments({completed:true})
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })

const deleteTaskAndCount = async (_id) => {
    await Task.findByIdAndDelete(_id)
    const count = await Task.countDocuments({completed:true})
    return count
}

deleteTaskAndCount('5f2ed23438dc2b19e42a3694')
    .then((count) => {console.log(count);})
    .catch((e) => {console.log(e);})