import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'
import axios from '../../config/axios'
import DepartmentForm from './Form'

export class DepartmentEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            department: {}
        }
    }

    componentDidMount = () => {
        if (!localStorage.getItem('authToken'))
            this.props.history.push('/users/login')

        axios.get(`/departments/${this.props.match.params._id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(res => {
                console.log("edit handlesubmit")
                this.setState({ department: res.data })
            })
            .catch(err => {
                alert(err)
            })
    }
    handleSubmit = (postData) => {
        axios.put(`/departments/${this.props.match.params._id}`, postData, {
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
                    this.props.history.push('/departments')
                }
            })
    }
    render() {
        return (
            <div >
                <h2>Edit department</h2>
                {!isEmpty(this.state.department) && <DepartmentForm department={this.state.department} handleSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

export default DepartmentEdit
