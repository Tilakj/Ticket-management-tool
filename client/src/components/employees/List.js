import React, { Component } from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import EmployeesSVG from './EmployeesSVG'

export class EmployeeList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: [],
            loading: true
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
                    const deletedEmployee = res.data
                    this.setState(prevState => {
                        return {
                            employees: prevState.employees.filter(employee => employee._id !== deletedEmployee._id)
                        }
                    })
                })
                .catch(err => {
                    alert(err)
                })
        }
    }
    handleSubmit = (formData) => {
        axios.post('/employees', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(res => {
                const employee = res.data
                this.setState(prevState => {
                    return {
                        employees: prevState.employees.concat(employee)
                    }
                })
            })
            .catch(err => {
                alert(err)
            })

    }
    componentDidMount = () => {
        if (!localStorage.getItem('authToken'))
            this.props.history.push('/users/login')

        axios.get('/employees', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(res => {
                const employees = res.data
                this.setState({ employees, loading: false })
            })
            .catch(err => {
                alert(err)
            })
    }
    render() {
        const { employees, loading } = this.state
        return (
            <div style={{ marginTop: '5%' }}>
                <div className="row">
                    <div className="col-md-6">
                        <h2>Listing Employees -{employees.length} </h2>
                        {
                            loading ?
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                :
                                (
                                    <>
                                        <div>
                                            <ul className="list-group">
                                                {
                                                    employees.map(employee => {
                                                        return (
                                                            <li key={employee._id} className="list-group-item fade-in-down">
                                                                {employee.name}
                                                                <button className="btn btn-info btn-sm float-right ml-1" onClick={() => this.props.history.push(`/employees/${employee._id}`)}>Show</button>
                                                                <button className="btn btn-danger btn-sm float-right" onClick={() => this.handleRemove(employee._id)}>remove</button>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        < Link className="btn btn-primary btn-sm mt-3" to="/employees/new" >Add Employee</ Link>
                                    </>
                                )
                        }

                    </div>
                    <div className="col-md-5 offset-md-1 mt-5">
                        <EmployeesSVG />
                    </div>
                </div>
            </div>
        )

    }
}

export default EmployeeList
