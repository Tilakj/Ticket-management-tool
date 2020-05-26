const Ticket = require('../models/ticket')
const pick = require('lodash/pick')

module.exports.list = (req, res) => {
    Ticket.find({ user: req.user._id }).populate('department').populate('customer').populate('employees')
        .then(tickets => {
            res.json(tickets)
        })
        .catch(err => {
            res.json(err)
        })

}

module.exports.create = (req, res) => {
    const body = pick(req.body, ['code', 'message', 'priority', 'isResolved', 'customer', 'department', 'employees'])
    const ticket = new Ticket(body)
    ticket.user = req.user._id
    ticket.save()
        .then(ticket => {
            res.json(ticket)
        })
        .catch(err => {
            res.json(err)
        })

}



module.exports.show = (req, res) => {
    const id = req.params.id
    Ticket.findOne({ _id: id, user: req.user._id }).populate('department').populate('customer').populate('employees')
        .then(ticket => {
            if (ticket)
                res.json(ticket)
            else
                res.json({})
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = pick(req.body, ['code', 'message', 'priority', 'isResolved', 'customer', 'department', 'employees'])
    Ticket.findOneAndUpdate({ _id: id, user: req.user._id }, body, { runValidators: true, new: true }).populate('department').populate('customer').populate('employees')
        .then(ticket => {
            if (ticket)
                res.json(ticket)
            else
                res.json({})
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Ticket.findOneAndDelete({ _id: id, user: req.user._id })
        .then(ticket => {
            if (ticket)
                res.json(ticket)
            else
                res.json({})
        })
        .catch(err => {
            res.json(err)
        })
}