const jwt = require('jsonwebtoken')
const { secret } = require('../data/config')
const cookie = require('../utils/cookie')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
  

    try {
 
        const token = cookie(req.headers.cookie).authToken
       
        if (!token) {
            return res.status(400).json({ mes: 'not login' })
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData;
        next()
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mes: 'not login' })
    }
}