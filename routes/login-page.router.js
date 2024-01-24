const express = require('express')
const router = express.Router();


router.get('/', (req, res) => {
    res.render('login-page.hbs')
})


module.exports =  router