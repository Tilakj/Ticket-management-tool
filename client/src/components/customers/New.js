import React, { Component } from 'react'
import axios from '../../config/axios'
import CustomerForm from './Form'

export class CustomerNew extends Component {
    handleSubmit = (postData) => {
        axios.post('/customers', postData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(res => {
                if (res.data.hasOwnProperty('errors')) {
                    alert(res.data.message)
                }
                else {
                    this.props.history.push('/customers')
                }
            })
            .catch(err=>{
                alert(err)
            })
    }
    render() {
        return (
            <div  style={{marginTop:'5%'}}>
                <h2>Add Customer</h2>
                <CustomerForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default CustomerNew
