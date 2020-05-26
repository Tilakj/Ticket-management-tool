import React, { Component } from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

export class CustomerShow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customer: {}
        }
    }
    handleRemove = (id) => {
        const confirmDelete = window.confirm('Are you sure?')
        if (confirmDelete) {

            axios.delete(`/customers/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
                .then(res => {
                    this.setState({ customer: {} })
                    this.props.history.push('/customers')
                })
                .catch(err => {
                    alert(err)
                })
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
                this.setState({ customer: res.data })
            })
            .catch(err => {
                alert(err)
            })

    }
    render() {
        const { customer } = this.state
        console.log(customer)
        return (
            <div style={{ marginTop: '5%' }}>
                {
                    isEmpty(customer) ? <p> loading...</p > :
                        <>
                            <h2>{customer.name}-{customer.email}-{customer.mobile}</h2>
                            <Link className="btn btn-warning mr-1" to={`/customers/edit/${customer._id}`}>Edit</Link>
                            <button className="btn btn-danger" onClick={() => this.handleRemove(customer._id)}>Remove</button>
                        </>
                }
            </div>
        )
    }
}

export default CustomerShow
