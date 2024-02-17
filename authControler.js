const User = require('./models/user.js')
const Role = require('./models/role.js')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('./data/config.js')
const { mongoose } = require('mongoose')
const cookie = require('./utils/cookie.js')
const ObjectId = require('mongodb').ObjectId
let data = new Date()
let date = `${data.getDate()} ${data.getMonth() < 10 ? "0" + (data.getMonth() + 1) : data.getMonth()} ${data.getFullYear()}`;
let time = `${data.getHours() < 10 ? '0' + (data.getHours()) : data.getHours()}:${data.getHours() < 10 ? '0' + (data.getMinutes()) : data.getMinutes()}`

const generateAccessToken = (id, roles, username) => {
    const payload = {
        id,
        roles,
        username
    }
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}


class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: '0шибка при регистрации', errors })
            }
            const { username, password } = req.body;
            const candidate = await User.findOne({ username })
            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: 'user' })
            const user = new User({ username, password: hashPassword, roles: [userRole.value], registrationDate: date, registrationTime: time })

            await user.save()
            console.log(user);
            return res.status(200).json({ message: 'успешно зареган' })


        } catch (error) {
            console.log(error);
            res.status(400).json({ mes: 'Registration error' })
        }
    }
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username })
            if (!user) {
                return res.status(400).json({ message: `Пользователь ${username} не найден` })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: `Неверный пароль` })
            }

            const token = generateAccessToken(user._id, user.roles, user.username)
            return res.json({ token, message: 'Успешный логин', status: 200 })


        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Login error', error, status: 501 })
        }
    }
    async getUsers(req, res) {
        try {
            const users = await User.find()
            console.log(users);
            res.json(users)
        } catch (error) {

        }
    }
    async cabinet(req, res) { }

    async getUserInfo(req, res, next) {

        const token = cookie(req.headers.cookie).authToken
        const decodedData = jwt.verify(token, secret)
        const { id, username, password, roles, posts, avatar, registrationDate, registrationTime, bookmarks } = await User.findOne({ _id: new ObjectId(decodedData.id) })
        !avatar ? 'https://i.pinimg.com/564x/53/c6/cb/53c6cb53330be9e00e110cad4b52caec.jpg' : avatar
        let user = { id, username, roles, posts, avatar, registrationDate, registrationTime, bookmarks }
        req.user = user;
        next()
    }
    async addBookmarks(req, res) {
        const body = req.body
        const token = cookie(req.headers.cookie).authToken
        const decodedData = jwt.verify(token, secret)
        const user = await User.findOne({ _id: new ObjectId(decodedData.id) })
        let { id } = body;

        if (user.bookmarks.length == 0) { 
            user.bookmarks.push(id) 
        }
        else{
            let index = user.bookmarks.indexOf(id)

            if(index == -1){
                user.bookmarks.push(id) 
            } else if( index != -1){
                user.bookmarks.splice(index, 1)
            }
    
        }

        await user.save()

        res.json({ message: 'Успещно добавлено', status: 200 })
        console.log(body);
        console.log(user);

    }
    async getBookmarkInfo(req, res) {
        const token = cookie(req.headers.cookie).authToken
        const decodedData = jwt.verify(token, secret)
        const user = await User.findOne({ _id: new ObjectId(decodedData.id) })
        let {bookmarks} = user;

        console.log(bookmarks);

        res.json(bookmarks)


    }
    async getShortUserInfo(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        const decodedData = jwt.verify(token, secret)
        const { id, username, password, roles, posts, avatar, registrationDate, registrationTime } = await User.findOne({ _id: new ObjectId(decodedData.id) })
        !avatar ? 'https://i.pinimg.com/564x/53/c6/cb/53c6cb53330be9e00e110cad4b52caec.jpg' : avatar
        let user = { id, username, roles, avatar, }

        res.json(user)
    }

    async createPost(req, res) {
        const { post_name, post_message } = req.body
        const token = req.headers.authorization.split(' ')[1]
        const decodedData = jwt.verify(token, secret)
        const user = await User.findOne({ _id: new ObjectId(decodedData.id) })
        console.log(user);

        let date = new Date;
        let post = {
            post_name,
            post_message,
            post_data: `${date.getDate()} ${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)} ${date.getFullYear()}`,
        }
        user.posts.push(post)
        user.save()
        console.log(200);
        res.json({ message: 'Отправлено' })
    }

}

module.exports = new authController()