import React, { Component } from 'react'
import axios from '../../config/axios'
import EmployeeForm from './Form'

export class EmployeeNew extends Component {
    handleSubmit = (postData) => {
        axios.post('/employees', postData, {
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
            .catch(err=>{
                alert(err)
            })
    }
    render() {
        return (
            <div >
                <h2>Add Employee</h2>
                <EmployeeForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default EmployeeNew
