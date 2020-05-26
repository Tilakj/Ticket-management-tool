import React, { Component } from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
export class EmployeeShow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employee: {},
            isLoading: true
        }
    }
    handleRemove = (id) => {
        const confirmDelete = window.confirm('Are you sure?')
        if (confirmDelete) {

            axios.delete(`/employees/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
                .then(res => {
                    this.setState({ customer: {} })
                    this.props.history.push('/employees')
                })
                .catch(err => {
                    alert(err)
                })
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
                this.setState({ employee: res.data, isLoading: false })
            })
            .catch(err => {
                alert(err)
            })

    }
    render() {
        const { employee, isLoading } = this.state
        return (
            <div>
                {
                    isLoading ? <p>loading...</p> :
                        <h2>{employee.name} - {employee.email} - {employee.department?.name}</h2>
                }
                <Link className="btn btn-warning mr-1" to={`/employees/edit/${employee._id}`}>Edit</Link>
                <button className="btn btn-danger" onClick={() => this.handleRemove(employee._id)}>Remove</button>
            </div>
        )
    }
}

export default EmployeeShow
