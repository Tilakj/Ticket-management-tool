import React from 'react'
import axios from '../../config/axios'

class EmployeeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.employee ? props.employee.name : '',
            email: props.employee ? props.employee.email : '',
            mobile: props.employee ? props.employee.mobile : '',
            department: props.employee ? props.employee.department._id : '',
            departments: []
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount = () => {
        if (!localStorage.getItem('authToken'))
            this.props.history.push('/users/login')

        axios.get('/departments', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(res => {
                const departments = res.data
                this.setState({ departments })
            })
            .catch(err => {
                alert(err)
            })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            department: this.state.department
        }

        this.props.handleSubmit(formData)

    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-7">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name </label>
                                <input className="form-control" type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email </label>
                                <input className="form-control" type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="mobile">Mobile </label>
                                <input className="form-control" type="text" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="department">Department </label>
                                <select className="form-control" name="department" id="department" value={this.state.department} onChange={this.handleChange}>
                                    <option value="">select</option>
                                    {
                                        this.state.departments.map(department => {
                                            return <option key={department._id} value={department._id}>{department.name}</option>
                                        })
                                    }
                                </select>
                                <br /><br />
                                <input className="btn btn-primary btn-md" type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}

export default EmployeeForm
