import React, { useState } from 'react'
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { useSignupUserMutation } from '../../appApi';
import Spinner1 from "../GIFY/Spinner1"

function SignupPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signupUser, { isLoading, isError, error }] = useSignupUserMutation()
    const [onshow, setOnshow] = useState(false);
    let navigate = useNavigate();

    function handleSignup(e) {

        e.preventDefault();
        signupUser({ email, password }).then(({ error }) => {
            if (!error) {
                navigate("/");
            }
        });
    }


    if (isLoading) {
        return (
            <>
                <div className='my-4' >
                    <h1 className='text-center'>Signing In</h1>
                    <div className='text-center'>
                        <Spinner1 />
                    </div>
                </div>
            </>
        );
    }

    return (
        <section className="vh-100">
            <br />
            <br />
            <div className="container-fluid">
                {isError && onshow && <Alert variant='danger' onClose={() => setOnshow(false)} dismissible><Alert.Heading>{error.data}</Alert.Heading></Alert>}
                <div className="row">
                    <div className="col-sm-6 text-black">
                        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                            <form style={{ width: '23rem' }} onSubmit={handleSignup}>
                                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign Up Here </h3>
                                <div className="form-outline mb-4">
                                    <input type="email" id="form2Example18" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <label className="form-label" htmlFor="form2Example18">Email address</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="form2Example28" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <label className="form-label" htmlFor="form2Example28">Password</label>
                                </div>
                                <div className="pt-1 mb-4">
                                    <button className="btn btn-info btn-lg btn-block" type="submit" onClick={() => setOnshow(true)}>Sign Up</button>
                                </div>
                                <p>Already Have an Acoount <Link to="/Login" className="link-info">Login Here</Link></p>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-6 px-0 d-none d-sm-block my-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp" className="w-100 vh-100" style={{ objectFit: 'cover', objectPosition: 'left' }} alt="hello" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignupPage