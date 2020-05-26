const Department = require('../models/department')
const pick = require('lodash/pick')

module.exports.list = (req, res) => {
    Department.find({ user: req.user._id })
        .then(departments => {
            res.json(departments)
        })
        .catch(err => {
            res.json(err)
        })

}


module.exports.create = (req, res) => {
    const body = pick(req.body, ['name'])
    const department = new Department(body)
    department.user = req.user._id
    department.save()
        .then(department => {
            res.json(department)
        })
        .catch(err => {
            res.json(err)
        })

}



module.exports.show = (req, res) => {
    const id = req.params.id
    Department.findOne({ _id: id, user: req.user._id })
        .then(department => {
            if (department)
                res.json(department)
            else
                res.json({})
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = pick(req.body, ['name'])
    Department.findOneAndUpdate({ _id: id, user: req.user._id }, body, { runValidators: true, new: true })
        .then(department => {
            if (department)
                res.json(department)
            else
                res.json({})
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Department.findOneAndDelete({ _id: id, user: req.user._id })
        .then(department => {
            if (department)
                res.json(department)
            else
                res.json({})
        })
        .catch(err => {
            res.json(err)
        })
}