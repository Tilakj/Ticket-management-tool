import React, { Component } from 'react'
import axios from '../../config/axios'
import TicketForm from './Form'

class TicketNew extends Component {
    handleSubmit = (postData) => {
        axios.post('/tickets', postData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(res => {
                if (res.data.hasOwnProperty('errors')) {
                    alert(res.data.message)
                }
                else {
                    this.props.history.push('/tickets')
                }
            })
            .catch(err=>{
                alert(err)
            })
    }
    render() {
        return (
            <div >
                <h2>Add Ticket</h2>
                <TicketForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default TicketNew
