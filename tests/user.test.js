const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'Mike',
    email:'mike@gmail.com',
    password: '56what!!'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()

})

// afterEach(() => {
//     console.log('afterEach');
// })

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name : 'Andrew',
        email: 'amit@example.com',
        password: 'MyPass777!'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})