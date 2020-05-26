import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'
import axios from '../../config/axios'
import CustomerForm from './Form'

export class CustomerEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customer: {}
        }
    }

    componentDidMount = () => {
        if (!localStorage.getItem('authToken'))
            this.props.history.push('/users/login')
        axios.get(`/customers/${this.props.match.params._id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(res => {
                console.log("edit handlesubmit")
                this.setState({ customer: res.data })
            })
            .catch(err => {
                alert(err)
            })
    }
    handleSubmit = (postData) => {
        axios.put(`/customers/${this.props.match.params._id}`, postData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(res => {
                console.log(res.data)
                if (res.data.hasOwnProperty('errors')) {
                    alert(res.data.message)
                }
                else {
                    this.props.history.push('/customers')
                }
            })
    }
    render() {
        return (
            <div style={{marginTop:'5%'}}>
                <h2>Edit customer</h2>
                {!isEmpty(this.state.customer) && <CustomerForm customer={this.state.customer} handleSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

export default CustomerEdit
