const jwt = require("jsonwebtoken")
const { secret } = require("../data/config")

module.exports = function (roles) {
    return function (req, res, next) {
        
        if (req.method === 'OPTIONS') {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(400).json({ mes: 'not login' })
            }
            const { roles: userRoles } = jwt.verify(token, secret)
            let hasRoel = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRoel = true
                }
            });
            if (!hasRoel) {
                return res.status(403).json({ mes: 'Нет прав' })
            }
            next()
        } catch (error) {
            console.log(error);
            return res.status(403).json({ mes: 'Вы не залоганы' })
        }
    }

}