import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'
import axios from '../../config/axios'
import EmployeeForm from './Form'

export class EmployeeEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employee: {}
        }
    }

    componentDidMount = () => {
        if (!localStorage.getItem('authToken'))
            this.props.history.push('/users/login')
            
        axios.get(`/employees/${this.props.match.params._id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(res => {
                console.log("edit handlesubmit "+ JSON.stringify(res.data ))
                this.setState({ employee: res.data })
            })
            .catch(err => {
                alert(err)
            })
    }
    handleSubmit = (postData) => {
        axios.put(`/employees/${this.props.match.params._id}`, postData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(res => {
                if (res.data.hasOwnProperty('errors')) {
                    alert(res.data.message)
                }
                else {
                    this.props.history.push('/employees')
                }
            })
    }
    render() {
        return (
            <div >
                <h2>Edit employee</h2>
                {!isEmpty(this.state.employee) && <EmployeeForm employee={this.state.employee} handleSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

export default EmployeeEdit
