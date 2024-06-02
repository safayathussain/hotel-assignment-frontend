import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const CustomNavbar = () => {
    const [auth, setAuth] = useState({
        // name: ''
    })
    const logout = () => {
        localStorage.removeItem('auth')
        window.location.reload()
    }
    useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem('auth')) || {})
    }, [localStorage])
    return (
        <div className='bg-light'>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">Hotel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className=''>
                        <div className='d-lg-flex d-flex-col align-items-center ms-auto'>
                            <Nav className="me-5">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/cart">Cart</Nav.Link>

                                {
                                    !auth.name ?
                                        <>
                                            <Nav.Link href="Login">Login</Nav.Link>
                                            <Nav.Link href="Register">Register</Nav.Link>
                                        </> :
                                        <>
                                            <Nav.Link href="/past-orders">Past Orders</Nav.Link>
                                            <div className='d-flex align-items-center'>

                                                <Button variant="danger" className='ms-lg-5 w-max' size='sm' onClick={logout}>
                                                    Logout
                                                </Button>
                                            </div>
                                        </>
                                }
                            </Nav>
                            <Nav>
                                <Nav.Link href="/my-tweets" className='fw-bold'>{auth?.name || ''}</Nav.Link>

                            </Nav>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default CustomNavbar