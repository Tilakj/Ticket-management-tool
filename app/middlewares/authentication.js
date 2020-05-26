const User = require('../models/user')

const autheticateUser = (req, res, next) => {
    if (req.url !== '/users/register' && req.url !== '/users/login' && req.url !== '/') {

        const token = req.headers['x-auth']
        User.findByToken(token)
            .then(user => {
                if (user) {
                    req.user = user,
                        req.token = token
                    next()
                }
                else
                    res.status(401).json({ notice: 'Token not available' })

            })
            .catch(err => {
                res.status(401).json(err)
            })
    }
    else {
        next()
    }
}

module.exports = autheticateUser