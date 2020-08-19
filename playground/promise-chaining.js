require('../src/db/mongoose')

const User = require('../src/models/user')

// User.findByIdAndUpdate('5f2e179244e1313204e381e2', {age :22}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age : 22})
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('5f2e276cceb66908941d8e6b', 25).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})