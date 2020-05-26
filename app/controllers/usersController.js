const User = require('../models/user')


module.exports.list = (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.json(err)
        })

}


module.exports.register = (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.json(err)
        })

}
module.exports.login = (req, res) => {
    const body = req.body
    User.findUserByCredential(body.email, body.password)
        .then(user => {
            return user.generateToken()
        })
        .then(token => {
            res.json({token})
        })
        .catch(err => {
            res.json(err)
        })

}

module.exports.account = (req, res) => {
    const { user } = req
    res.json(user)
}

module.exports.logout = (req, res) => {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(user => {
            res.json("logged out successfully")
        })
        .catch(err => {
            res.json(err)
        })
}



// module.exports.show = (req, res) => {
//     const id = req.params.id
//     User.find({ _id: id })
//         .then(user => {
//             if (user)
//                 res.json(user)
//             else
//                 res.json({})
//         })
//         .catch(err => {
//             res.json(err)
//         })
// }

// module.exports.update = (req, res) => {
//     const id = req.params.id
//     const body = req.body
//     User.findByIdAndUpdate(id, body, { runValidators: true, new: true })
//         .then(user => {
//             if (user)
//                 res.json(user)
//             else
//                 res.json({})
//         })
//         .catch(err => {
//             res.json(err)
//         })
// }

// module.exports.destroy = (req, res) => {
//     const id = req.params.id
//     User.findByIdAndDelete(id)
//         .then(user => {
//             if (user)
//                 res.json(user)
//             else
//                 res.json({})
//         })
//         .catch(err => {
//             res.json(err)
//         })
// }

