import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {Dropdown } from 'react-bootstrap';
import { useLogoutUserMutation } from '../../appApi';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
    const { user } = useSelector((state) => state.user);
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();
    function handleLogout() {
        logoutUser().then(({ error }) => {
            if (!error) {
                setTimeout(() => {
                    navigate('/')
                }, 10);
            }
        })
    }

    return (

        <nav className="navbar  navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {user && (<Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                        {user.email}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/">HOME</Dropdown.Item>
                        <Dropdown.Item href="/my-articles">My Articles</Dropdown.Item>
                        <Dropdown.Item href="/new-articles">New Articles</Dropdown.Item>
                        <Dropdown.Item href="/article">All Articles</Dropdown.Item>
                        <Dropdown.Item href="/ToDoList">To Do List</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>)}

                {!user && (<Link className="navbar-brand" to="/">HOME</Link>)}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/codechef" id="navbarDropdown" role="button" data-bs-toggle="dropdown" >
                                Coding Contest
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/general">General</Link></li>
                                <li><Link className="dropdown-item" to="/codechef">Codechef</Link></li>
                                <li><Link className="dropdown-item" to="/codeForces">Code Forces</Link></li>
                                <li><Link className="dropdown-item" to="/topCoder">Top Coder</Link></li>
                                <li><Link className="dropdown-item" to="/atcoder">At Coder</Link></li>
                                <li><Link className="dropdown-item" to="/hackerRank">Hacker Rank</Link></li>
                                <li><Link className="dropdown-item" to="/hackerEarth">Hacker Earth</Link></li>
                                <li><Link className="dropdown-item" to="/kickstart">Kickstart</Link></li>
                                <li><Link className="dropdown-item" to="/leetcode">Leet Code</Link></li>
                            </ul>
                        </li>
                    </ul>
                    {!user && (<form >
                        <a href="/Login"><button type="button" className="btn btn-primary my-2 ">Login</button></a>
                        <a href="/Signup"><button type="button" className="btn btn-primary my-2 mx-3">Sign Up</button></a>
                    </form>)
                    }

                    {user &&
                        (<form >
                            <button type="button" className="btn btn-danger my-2 " onClick={handleLogout}>Logout</button>
                        </form>)
                    }

                </div>

            </div>


        </nav>
    )

}

export default NavBar