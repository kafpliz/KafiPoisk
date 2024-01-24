const express = require('express')
const router = express.Router();
const controller = require('../authControler')
const {check} = require('express-validator')
const authMiddleware = require('../middlewaree/authMiddleware.cjs');
const roleMiddlewere = require('../middlewaree/roleMiddlewere.js');


router.post('/registr', [
    check('username','Имя юзера не может быть пустым').notEmpty(),
    check('username', 'Имя юзера может содержать только 32 символа').isLength({max: 32}),
    check('password', 'Пароль должен быть длинее 4-ёх символов, но меньше 12-ти').isLength({min:4, max: 12})
], controller.registration)
router.post('/login',controller.login)
router.get('/users', roleMiddlewere(['admin']) ,controller.getUsers)
router.get('/cabinet',  roleMiddlewere(['admin', 'user']) , controller.cabinet)
router.post('/create',  roleMiddlewere(['admin', 'user']) , controller.createPost)
router.post('/getuser',  authMiddleware , controller.getUserInfo)


module.exports =  router