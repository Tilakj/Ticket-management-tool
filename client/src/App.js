import React from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import Home from './components/static/Home'
import Login from './components/users/Login'
import Register from './components/users/Register'

import CustomerList from './components/customers/List'
import CustomerNew from './components/customers/New'
import CustomerShow from './components/customers/Show'
import CustomerEdit from './components/customers/Edit'

import DepartmentList from './components/departments/List'
import DepartmentEdit from './components/departments/Edit'
import DepartmentShow from './components/departments/Show'

import EmployeeList from './components/employees/List'
import EmployeeShow from './components/employees/Show'
import EmployeeNew from './components/employees/New'
import EmployeeEdit from './components/employees/Edit'

import TicketList from './components/tickets/List'
import TicketShow from './components/tickets/Show'
import TicketNew from './components/tickets/New'
import TicketEdit from './components/tickets/Edit'
import axios from './config/axios'
import { ReactComponent as Logo } from './TMFullLogo.svg';
import './App.css';



function App(props) {
    return (
        <BrowserRouter>
            <div >
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to='/' className="navbar-brand" ><Logo style={{width:'50%'}}/><span className="sr-only">(current)</span></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ml-auto">
                            <Link to='/' className="nav-item nav-link float-right"><b>Home</b><span className="sr-only">(current)</span></Link>
                            {!localStorage.getItem("authToken") ?
                                <>
                                    <Link className="nav-item nav-link" to="/users/login"><b>Login</b></Link>
                                    <Link className="nav-item nav-link" to="/users/register"><b>Register</b></Link>
                                </> :
                                <>
                                    <Link className="nav-item nav-link" to="/customers"><b>Customers</b></Link>
                                    <Link className="nav-item nav-link" to="/departments"><b>Departments</b></Link>
                                    <Link className="nav-item nav-link" to="/employees"><b>Employees</b></Link>
                                    <Link className="nav-item nav-link" to="/tickets"><b>Tickets</b></Link>
                                    <Link className="nav-item nav-link float-right" to="/users/logout"><b>Logout</b></Link>
                                </>
                            }
                        </div>
                    </div>
                </nav>
                <div className="container mt-3" >
                    <Switch>
                        
                        <Route path="/" component={Home} exact={true} />

                        <Route path="/customers" component={CustomerList} exact={true} />
                        <Route path="/customers/new" component={CustomerNew} exact={true} />
                        <Route path="/customers/edit/:_id" component={CustomerEdit} exact={true} />
                        <Route path="/customers/:_id" component={CustomerShow} exact={true} />


                        <Route path="/departments" component={DepartmentList} exact={true} />
                        <Route path="/departments/edit/:_id" component={DepartmentEdit} exact={true} />
                        <Route path="/departments/:_id" component={DepartmentShow} exact={true} />


                        <Route path="/employees" component={EmployeeList} exact={true} />
                        <Route path="/employees/new" component={EmployeeNew} exact={true} />
                        <Route path="/employees/edit/:_id" component={EmployeeEdit} exact={true} />
                        <Route path="/employees/:_id" component={EmployeeShow} exact={true} />

                        <Route path="/tickets" component={TicketList} exact={true} />
                        <Route path="/tickets/new" component={TicketNew} exact={true} />
                        <Route path="/tickets/edit/:_id" component={TicketEdit} exact={true} />
                        <Route path="/tickets/:_id" component={TicketShow} exact={true} />

                        <Route path="/users/login" component={Login} />
                        <Route path="/users/register" component={Register} />
                        <Route path="/users/logout" render={(props) => {
                            axios.delete('/users/logout', {
                                headers: {
                                    'x-auth': localStorage.getItem('authToken')
                                }
                            }).then(res => {
                                localStorage.removeItem("authToken")
                                props.history.push('/')
                                window.location.reload()
                            })
                                .catch(err => {
                                    alert(err)
                                })

                        }} />

                    </Switch>
                </div>
            </div>

        </BrowserRouter>
    )
}

export default App
