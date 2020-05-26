import React, { Component } from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
export class DepartmentShow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            department: {}
        }
    }

    putEmployeeDept = (Empid, putData) => {
        axios.put(`/employees/${Empid}`, putData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        }).then(res => {
            console.log("updated : " + JSON.stringify(res.data))
        })
            .catch(err => {
                console.log(" Failed to update : " + err)
            })
    }

    handleRemove = (id) => {
        const confirmDelete = window.confirm('Are you sure?')
        if (confirmDelete) {

            axios.delete(`/departments/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            }).then(res => {

                //get employees to update employee department 
                axios.get(`/employees`, {
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                }).then(response => {
                    const employeesToUpdate = response.data.filter(employee => employee.department == null)

                    employeesToUpdate.forEach(employee => {
                        const putData = { department: this.state.departments.find(department => department.name === "undefined") }
                        this.putEmployeeDept(employee._id, putData)
                    })
                })
                    .catch(err => {
                        alert(err)
                    })


                this.setState({ department: {} })
                this.props.history.push('/departments')

            }).catch(err => {
                alert(err)
            })
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
                this.setState({ department: res.data })
            })
            .catch(err => {
                alert(err)
            })

    }
    render() {
        const { department } = this.state
        return (
            <div >
                <h2>Name - {department.name}</h2>
                <Link className="btn btn-warning mr-1" to={`/departments/edit/${department._id}`}>Edit</Link>
                <button className="btn btn-danger" onClick={() => this.handleRemove(department._id)}>Remove</button>
            </div>
        )
    }
}

export default DepartmentShow
