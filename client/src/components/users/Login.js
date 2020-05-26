import React from 'react'
import axios from '../../config/axios'
import LoginSVG from './LoginSVG'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
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
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/users/login', formData)
            .then(response => {
                if (response.data.hasOwnProperty("error")) {
                    alert(response.data.error)
                }
                else {
                    const { token } = response.data
                    if (token) {
                        localStorage.setItem("authToken", token)
                        this.props.history.push('/')
                        window.location.reload()
                    }

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
                    <div className="col-md-4" style={{ marginTop: '15%' }}>
                        <h2 className="mb-3">Login</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input placeholder="Email" className="form-control" type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input placeholder="Password" className="form-control" type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
                            </div>
                            <input className="btn btn-primary" type="submit" value="Login" />

                        </form>
                    </div>
                    <LoginSVG style={{ marginTop: '10%' }} className="col-md-8" />
                </div>
            </div>
        )
    }
}

export default Login
