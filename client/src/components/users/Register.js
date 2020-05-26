import React from 'react'
import axios from '../../config/axios'
import RegisterSVG from './RegisterSVG'
class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        // console.log(formData)
        axios.post('/users/register', formData)
            .then(response => {
                if (response.data.errors) {
                    alert(response.data.message)
                }
                else {
                    console.log(response.data)
                    console.log(this.props)
                    this.props.history.push('/users/login')
                }
            })
            .catch(err => {
                alert(err)
            })


    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4"  style={{ marginTop: '15%' }}>
                        <h2 className="mb-3">Register</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input placeholder="Username" className="form-control" type="text" id="username" name="username" value={this.state.username} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input placeholder="Email" className="form-control" type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input placeholder="Password" className="form-control" type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
                            </div>
                            <input className="btn btn-primary" type="submit" value="register with us" />

                        </form>
                    </div>
                    <RegisterSVG   style={{ marginTop: '10%' }} className="col-md-6 offset-md-2"/>
                </div>
            </div>
        )
    }
}

export default Register
