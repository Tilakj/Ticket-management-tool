import React, { Component } from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import CustomerSVG from './CustomerSVG'


export class CustomerList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customers: [],
            loading: true
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
                    const deletedCustomer = res.data
                    this.setState(prevState => {
                        return {
                            customers: prevState.customers.filter(customer => customer._id !== deletedCustomer._id)
                        }
                    })
                })
                .catch(err => {
                    alert(err)
                })
        }
    }
    componentDidMount = () => {
        if (!localStorage.getItem('authToken'))
            this.props.history.push('/users/login')

        axios.get('/customers', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(res => {
                const customers = res.data
                this.setState({ customers, loading: false })
            })
            .catch(err => {
                alert(err)
            })
    }
    render() {
        const { customers, loading } = this.state
        return (
            <div  style={{ marginTop: '5%' }}>
                <div className="row">
                    <div className="col-md-6">
                        <h2>Listing Customers - {customers.length}</h2>
                        {
                            loading ? <h2>loading...</h2> :
                                (
                                    customers.length === 0 ?
                                        (
                                            <div>
                                                <h2>No customers found. Add your first customer </h2>
                                            </div>
                                        ) :
                                        (
                                            <div>
                                                <ul className="list-group">
                                                    {
                                                        customers.map(customer => {
                                                            return (
                                                                <li key={customer._id} className="list-group-item fade-in-down">
                                                                    {customer.name}
                                                                    <button className="btn btn-info float-right ml-1 btn-sm" onClick={() => this.props.history.push(`/customers/${customer._id}`)}>Show</button>
                                                                    <button className="btn btn-danger float-right btn-sm" onClick={() => this.handleRemove(customer._id)}>remove</button>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        )
                                )
                        }
                        < Link className="btn btn-primary btn-sm mt-3" to="/customers/new" >Add Customer</ Link>
                    </div>
                    <div className="col-md-4 offset-md-2">
                        <CustomerSVG />
                    </div>
                </div>
            </div>
        )

    }
}

export default CustomerList
