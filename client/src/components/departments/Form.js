import React from 'react'


class DepartmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.department ? props.department.name : ''
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
            name: this.state.name
        }
        this.props.handleSubmit(formData)
        this.setState({ name: '' })
    }

    render() {
        return (
            <div className="form-group">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input className="form-control" type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} /> <br />
                    <input type="submit" className="btn btn-primary btn-sm" />
                </form>
            </div>
        )
    }
}

export default DepartmentForm
