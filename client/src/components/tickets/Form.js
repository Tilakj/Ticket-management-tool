import React from 'react'
import axios from '../../config/axios'

class TicketForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            code: props.ticket ? props.ticket.code : '',
            customer: props.ticket ? props.ticket.customer : '',
            department: props.ticket ? props.ticket.department : '',
            employees: props.ticket ? props.ticket.employees.map(employee => employee._id) : [],
            message: props.ticket ? props.ticket.message : '',
            priority: props.ticket ? props.ticket.priority : '',

            customerList: [],
            departmentList: [],
            employeeList: []
        }
    }

    handleChange = (e) => {

        if (e.target.name === 'employees') {

            const employees = [...e.target.selectedOptions].map(option => option.value)
            this.setState({ employees });

        }
        else
            this.setState({
                [e.target.name]: e.target.value
            })

    }

    getAllCustomers = () => {
        return axios.get('/customers', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
    }

    getAllDepartments = () => {
        return axios.get('/departments', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
    }

    getAllEmployees = () => {
        return axios.get('/employees', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
    }

    componentDidMount = () => {
        if (!localStorage.getItem('authToken'))
            this.props.history.push('/users/login')

        Promise.all([this.getAllCustomers(), this.getAllDepartments(), this.getAllEmployees()])
            .then(values => {
                const customerList = values[0].data
                const departmentList = values[1].data
                const employeeList = values[2].data
                this.setState({ customerList, departmentList, employeeList })
            })
            .catch(err => {
                alert(err)
            })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            code: this.state.code,
            customer: this.state.customer,
            department: this.state.department,
            employees: this.state.employees.map(employee => ({ _id: employee })),
            message: this.state.message,
            priority: this.state.priority
        }
        console.log(JSON.stringify(formData))
        // {"code":"5","customer":"5e1b5de3f819760017057f5e","department":"5e1b5decf819760017057f5f","employees":["5e1b6b39f819760017057f65"],"message":"test2","priority":"High"}
        this.props.handleSubmit(formData)

    }

    render() {
        console.log(this.state)
        return (
            <div>
                <div className="row">
                    <div className="col-md-7">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="code">Code </label>
                                <input type="text"
                                    className="form-control"
                                    id="code"
                                    name="code"
                                    value={this.state.code}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="customer">Customer </label>
                                <select name="customer"
                                    className="form-control"
                                    id="customer"
                                    value={this.state.customer?._id}
                                    onChange={this.handleChange}>
                                    <option value="">select</option>
                                    {
                                        this.state.customerList.map(customer => {
                                            return <option key={customer._id} value={customer._id}>{customer.name}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="department">Department </label>
                                <select name="department"
                                    className="form-control"
                                    id="department"
                                    value={this.state.department?._id}
                                    onChange={this.handleChange}>
                                    <option value="">select</option>
                                    {
                                        this.state.departmentList.map(department => {
                                            return <option key={department._id} value={department._id}>{department.name}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="employees">Employees </label>
                                <select name="employees" multiple={true}
                                    className="form-control"
                                    id="employees"
                                    value={this.state.employees}
                                    onChange={this.handleChange}>
                                    <option value="">select</option>
                                    {
                                        this.state.department &&
                                        this.state.employeeList.filter(employee => employee.department._id === this.state.department).map(employee => {
                                            return <option key={employee._id} value={employee._id}>{employee.name}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message </label>
                                <textarea type="text"
                                    className="form-control"
                                    id="message"
                                    name="message"
                                    value={this.state.message}
                                    onChange={this.handleChange} />
                            </div>


                            <h4>Priority</h4>
                            <div className="form-group">
                                <div>
                                    <input checked={this.state.priority === 'high'}
                                        onChange={this.handleChange}
                                        className="radio mr-1"
                                        type="radio"
                                        id="high"
                                        name="priority"
                                        value="high" />
                                    <label htmlFor="high">High</label>
                                </div>

                                <div>
                                    <input checked={this.state.priority === 'medium'}
                                        onChange={this.handleChange}
                                        className="radio mr-1"
                                        type="radio"
                                        id="medium"
                                        name="priority"
                                        value="medium" />
                                    <label htmlFor="medium">Medium</label>
                                </div>


                                <div>
                                    <input checked={this.state.priority === 'low'}
                                        onChange={this.handleChange}
                                        className="radio mr-1"
                                        type="radio"
                                        id="low"
                                        name="priority"
                                        value="low" />
                                    <label htmlFor="low">Low</label><br />
                                </div>
                            </div>

                            <input className="btn btn-primary btn-md" type="submit" />
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default TicketForm
