import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'
import axios from '../../config/axios'
import TicketForm from './Form'

export class TicketEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ticket: {}
        }
    }

    componentDidMount = () => {
        if (!localStorage.getItem('authToken'))
            this.props.history.push('/users/login')

        axios.get(`/tickets/${this.props.match.params._id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(res => {
                this.setState({ ticket: res.data })
            })
            .catch(err => {
                alert(err)
            })
    }
    handleSubmit = (postData) => {
        axios.put(`/tickets/${this.props.match.params._id}`, postData, {
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
                    this.props.history.push('/tickets')
                }
            })
    }
    render() {
        return (
            <div >
                <h2>Edit Ticket</h2>
                {!isEmpty(this.state.ticket) && <TicketForm ticket={this.state.ticket} handleSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

export default TicketEdit
