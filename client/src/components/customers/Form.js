import React from 'react'

class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.customer ? props.customer.name : '',
            email: props.customer ? props.customer.email : '',
            mobile: props.customer ? props.customer.mobile : ''
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
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile
        }

        this.props.handleSubmit(formData)

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-7">
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
                            <input type="submit" className="btn btn-primary btn-md" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default CustomerForm
