import React, { useState } from 'react'
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useLoginUserMutation } from '../../appApi';
import { useNavigate } from 'react-router-dom';
import Spinner1 from "../GIFY/Spinner1"

function Loginpage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
    const [onshow, setOnshow] = useState(false);
    let navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        loginUser({ email, password }).then(({ error }) => {
            if (!error) {
                navigate("/");
            }
        })

    }
    if (isLoading) {
        return (
            <>
                <div className='my-4' >
                    <h1 className='text-center'>Logging</h1>
                    <div className='text-center'>
                        <Spinner1 />
                    </div>
                </div>
            </>
        );
    }


    return (
        <section className="h-100 " style={{ backgroundColor: '#9A616D' }} >
            <br />
            {isError && onshow && <Alert variant='danger' onClose={() => setOnshow(false)} dismissible><Alert.Heading>{error.data}</Alert.Heading></Alert>}
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                        alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form onSubmit={handleLogin}>

                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                <span className="h1 fw-bold mb-0 test-center">Blog Tyrant</span>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" >Login into your account</h5>

                                            <div className="form-outline mb-4">
                                                <input type="email" id="form2Example17" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <label className="form-label" htmlFor="form2Example17">Email address</label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" id="form2Example27" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                <label className="form-label" htmlFor="form2Example27">Password</label>
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-dark btn-lg btn-block" type="submit" onClick={() => setOnshow(true)}>Login</button>
                                            </div>

                                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <Link to="/Signup"
                                                style={{ color: '#393f81' }}>Register here</Link></p>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Loginpage