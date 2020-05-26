const mongoose = require('mongoose')

const Schema = mongoose.Schema
const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    mobile: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
              return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!, should be 10 digits`
        }
    },
    department:{
        type:Schema.Types.ObjectId,
        ref:'Department'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },

})

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee