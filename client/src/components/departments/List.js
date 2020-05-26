import React, { Component } from 'react'
import axios from '../../config/axios'
import DepartmentForm from './Form'
import DeptSVG from './DeptSVG'



class DepartmentList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            departments: [],
            loading: true
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

            //delete department
            axios.delete(`/departments/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            }).then(res => {

                const deletedDepartment = res.data
                this.setState(prevState => {
                    return {
                        departments: prevState.departments.filter(department => department._id !== deletedDepartment._id)
                    }
                })

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

            }).catch(err => {
                alert(err)
            })
        }

    }
    handleSubmit = (formData) => {
        axios.post('/departments', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(res => {
                const department = res.data
                this.setState(prevState => {
                    return {
                        departments: prevState.departments.concat(department),
                        loading: false
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

        axios.get('/departments', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        }).then(res => {
            const departments = res.data
            this.setState({ departments, loading: false }, () => {
                let undefinedDept = this.state.departments.find(department => department.name === "undefined")
                if (!undefinedDept) {
                    let undefinedDept = { name: 'undefined' }
                    axios.post('/departments', undefinedDept, {
                        headers: {
                            'x-auth': localStorage.getItem('authToken')
                        }
                    })
                        .then(res => {
                            const department = res.data
                            this.setState(prevState => {
                                return {
                                    departments: prevState.departments.concat(department),
                                    loading: false
                                }
                            })
                        })
                        .catch(err => {
                            alert(err)
                        })
                }
            })
        })
            .catch(err => {
                alert(err)
            })
    }
    render() {
        const { departments, loading } = this.state
        return (
            // <ZoomIn>
            <>
                <div  style={{ marginTop: '5%' }}>
                    <div className="row">
                        <div className="col-md-6">
                            <h2>Listing Departments -{departments.length} </h2>
                            {
                                loading ?
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div> :
                                    (


                                        <div>
                                            <ul className="list-group">
                                                {
                                                    departments.map(department => {
                                                        return (
                                                            <li key={department._id} className="list-group-item fade-in-down">
                                                                {department.name}
                                                                {department.name !== "undefined" &&
                                                                    <>
                                                                        <button className="btn btn-info float-right btn-sm ml-1" onClick={() => this.props.history.push(`/departments/${department._id}`)}>Show</button>
                                                                        <button className="btn btn-danger float-right btn-sm" onClick={() => this.handleRemove(department._id)}>remove</button>
                                                                    </>
                                                                }
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>


                                    )
                            }
                        </div>
                        <div className="col-md-5 offset-md-1">
                            <h2>Add Department</h2>
                            <DepartmentForm handleSubmit={this.handleSubmit} />
                            <DeptSVG />
                        </div>
                    </div>
                </div>
            </>
            /* </ZoomIn> */
        )

    }
}

export default DepartmentList


















// //get employees to update employee department 
// axios.get(`/employees`, {
//     headers: {
//         'x-auth': localStorage.getItem('authToken')
//     }
// }).then(response => {
//     const employeesToUpdate = response.data.filter(employee => employee.department == null)
//     // const arr = [];

//     employeesToUpdate.forEach(employee => {
//         const putData = { department: this.state.departments.find(department => department.name === "undefined") }
//         this.putEmployeeDept(employee._id, putData)
//     })

//     // axios.all(arr)
//     //     .then(res => {
//     //         console.log(JSON.stringify(res.data))
//     //     });
//     // // console.log(JSON.stringify(arr))
// })
//     .catch(err => {
//         alert(err)
//     })