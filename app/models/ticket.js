const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ticketSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    isResolved: {
        type: Boolean,
        required: true,
        default: false
    },
    customer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    department: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    // employees: {
    //     type: [{_id: Schema.Types.ObjectId}],
    //     required: true,
    //     ref: 'Employee'
    // }
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket