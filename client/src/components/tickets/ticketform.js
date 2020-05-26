// import React from 'react'
// import axios from '../../config/axios'
// import Select from 'react-select'

// class TicketForm extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             code: this.props.ticket ? this.props.ticket.code : '',
//             customer: this.props.ticket ? this.props.ticket.customerID : '',
//             department: this.props.ticket ? this.props.ticket.departmentID : '',
//             employeesTagged: this.props.ticket ? this.props.ticket.employees : [],
//             message: this.props.ticket ? this.props.ticket.message : '',
//             priority: this.props.ticket ? this.props.ticket.priority : '',
//             employeesList: [],
//             departments: [],
//             deptEmployees: [],
//             selecteDeptEmployees: this.props.ticket ? this.props.ticket.selectedDeptEmployees : [],
//             customers: [],
//             priorities: ['High', 'Medium', 'Low']
//         }
//     }

//     componentDidMount() {
//         if (!localStorage.getItem('authToken'))
//             this.props.history.push('/users/login')

//         axios.get('/customers', {
//             headers: {
//                 'x-auth': localStorage.getItem('authToken')
//             }
//         })
//             .then((response) => {
//                 console.log('customer list', response.data)
//                 if (response.data.hasOwnProperty('errors')) {
//                     console.log(response.data.message)
//                 } else {
//                     const customers = response.data
//                     this.setState({ customers })
//                 }
//             })

//         axios.get('/departments', {
//             headers: {
//                 'x-auth': localStorage.getItem('authToken')
//             }
//         })
//             .then((response) => {
//                 console.log('department List', response.data)
//                 if (response.data.hasOwnProperty('errors')) {
//                     console.log(response.data.message)
//                 } else {
//                     const departments = response.data
//                     this.setState({ departments })
//                 }
//             })

//         axios.get('/employees', {
//             headers: {
//                 'x-auth': localStorage.getItem('authToken')
//             }
//         })
//             .then((response) => {
                
//                 if (response.data.hasOwnProperty('error')) {
//                     console.log(response.error.message)
//                 } else {
//                     const employees = response.data

//                     let employeesList = []
                    
//                     employees.map((employee) => {
//                         return (
//                             employeesList.push({
//                                 _id: employee._id,
//                                 value: employee._id,
//                                 label: employee.name,
//                                 deptId: employee.department._id
//                             })
//                         )
//                     })
//                     this.setState({ employeesList })

//                     if (this.props.ticket) {
//                         const deptEmployees = employeesList.filter((employee) => {
//                             return employee.deptId == this.props.ticket.departmentID
//                         })

//                         this.setState({ deptEmployees })
//                     }

//                 }
//             })
//     }

//     handleChange = (e) => {
//         console.log(e.target.name, e.target.value)

//         this.setState({ [e.target.name]: e.target.value })

//         // console.log(e.target.name =='employee')
//         if (e.target.name === 'department') {
//             if (e.target.value != this.state.departmentID) {
//                 this.setState({ selecteDeptEmployees: '' })
//                 console.log('selected dept id', e.target.value)
//                 const departmentID = e.target.value
//                 console.log('im in')

//                 const deptEmployees = this.state.employeesList.filter((employee) => {
//                     return employee.deptId == departmentID
//                 })
//                 console.log('selected dept employees', deptEmployees)
//                 this.setState({ deptEmployees })
//             }
//         }


//     }

//     handleMultiSelect = (options) => {
//         console.log('option', options)
//         const selecteDeptEmployees = options

//         if (options !== null) {
//             this.setState({
//                 employeesTagged: options.map((option) => {
//                     return Object.assign({ _id: option._id })
//                 })

//             })
//             console.log('employees tagged to the ticket', this.state.employeesTagged)
//         }
//         if (options != null) {
//             this.setState({ selecteDeptEmployees })
//         }
//     }

//     handleSubmit = (e) => {
//         //  console.log(this.state.employee)
//         e.preventDefault()
//         console.log(this.state.employee)
//         const formData = {
//             code: this.state.code,
//             customer: this.state.customer,
//             department: this.state.department,
//             employees: this.state.employeesTagged,
//             message: this.state.message,
//             priority: this.state.priority
//         }
//         console.log(formData)

//         this.props.handleSubmit(formData)

//     }

//     render() {
//         return (
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                     <label htmlFor='code'>Code</label><br />
//                     <input type='text' id='code' name='code' value={this.state.code} onChange={this.handleChange} /><br />

//                     <label htmlFor='customer'>Customer</label><br />
//                     <select id='customer' name='customer' onChange={this.handleChange} placeholder="Select" value={this.state.customer} >
//                         <option>select</option>
//                         {
//                             this.state.customers.map((customer) => {
//                                 return <option key={customer._id} value={customer._id}>{customer.name}</option>
//                             })
//                         }
//                     </select><br />

//                     <label htmlFor='department'>Department</label><br />
//                     <select id='department' name='department' onChange={this.handleChange} value={this.state.department}>
//                         <option>select</option>
//                         {
//                             this.state.departments.map((department) => {
//                                 return <option key={department._id} value={department._id}>{department.name}</option>
//                             })
//                         }
//                     </select><br />

//                     <label htmlFor='employee'>Employee</label><br />
//                     <Select id='employee' name='employee' value={this.state.selecteDeptEmployees}
//                         placeholder="Select"
//                         options={this.state.deptEmployees}
//                         onChange={this.handleMultiSelect}
//                         isMulti />

//                     <label htmlFor='message'>Message</label><br />
//                     <textarea id='message' name='message' value={this.state.message} onChange={this.handleChange} /><br />

//                     <div>
//                         <h2>Priority</h2>
//                         {
//                             this.state.priorities.map((priority, i) => {
//                                 return (<div key={i}>
//                                     <label  ><input type='radio'
//                                         name='priority' value={priority}
//                                         checked={this.state.priority == priority}
//                                         onChange={this.handleChange} />{priority}</label>
//                                 </div>
//                                 )
//                             })
//                         }
//                     </div>

//                     <input type='submit' />

//                 </form>
//             </div>
//         )
//     }
// }

// export default TicketForm
