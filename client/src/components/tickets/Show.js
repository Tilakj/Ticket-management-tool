import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'
export class TicketShow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ticket: {},
            isLoading: true
        }
    }

    handleRemove = (id) => {
        const confirmDelete = window.confirm('Are you sure?')
        if (confirmDelete) {

            axios.delete(`/tickets/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
                .then(res => {
                    this.setState({ ticket: {} })
                    this.props.history.push('/tickets')
                })
                .catch(err => {
                    alert(err)
                })
        }
    }

    componentDidMount = () => {
        if (!localStorage.getItem('authToken'))
            this.props.history.push('/users/login')

        axios.get(`/tickets/${this.props.match.params._id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        }).then(ticket => {
            console.log(ticket)
            if (ticket) {
                this.setState({ ticket: ticket.data, isLoading: false })
            }
        })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        const { ticket, isLoading } = this.state
        return (
            <div>
                {
                    isLoading ? <p>loading...</p> :
                        <>
                            <h2>Code Number - {ticket.code}</h2>
                            <ul className="list-group">
                                <li className="list-group-item"><b>Customer</b> - {ticket.customer?.name}</li>
                                <li className="list-group-item"><b>Employees</b>- {ticket.employees?.map(employee => employee.name).join(',')}</li>
                                <li className="list-group-item"><b>Department</b>- {ticket.department?.name}</li>
                                <li className="list-group-item"><b>Message</b>- {ticket.message}</li>
                                <li className="list-group-item"><b>Priority</b>- {ticket.priority}</li>
                            </ul>
                        </>
                }
                <div className="mt-3">
                    <Link className="btn btn-warning mr-1" to={`/tickets/edit/${ticket._id}`}>Edit</Link>
                    <button className="btn btn-danger" onClick={() => this.handleRemove(ticket._id)}>Remove</button>
                </div>
            </div>
        )
    }
}

export default TicketShow
