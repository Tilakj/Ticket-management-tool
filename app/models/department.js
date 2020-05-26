const mongoose = require('mongoose')

const Schema = mongoose.Schema
const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }

})

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department