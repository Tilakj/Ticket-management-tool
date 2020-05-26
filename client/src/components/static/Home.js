import React from 'react'
import { Link } from 'react-router-dom'

import HomeSvg from '../HomeSvg'

function Home(props) {
    return (
        <div >
            <div className="row" style={{ marginTop: '10%' }}>
                <HomeSvg className="col-md-5" />
                <div className="jumbotron col-md-5 offset-md-2  mt-5" style={{ height: '50%' }}>
                    <h2 className="display-6">Ticket Master!</h2>
                    <p className="lead">Full Stack Ticket Management application which allows user to register or login and then create, handle tickets with respect to customers and their issues pertaining to a specific department and accordingly assign employees.</p>

                    {!localStorage.getItem("authToken") &&
                        <>
                            <hr className="my-4" />
                            <Link className="btn btn-primary mr-2" to="/users/login">Login</Link>
                            <Link className="btn btn-primary" to="/users/register">Register</Link>
                        </>
                    }
                </div>
            </div>
        </div>

    )
}

export default Home
