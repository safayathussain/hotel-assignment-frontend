import React from 'react'
import { Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'

const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault()
        const { email, password } = e.target
        fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    toast.success(data.message)
                    localStorage.setItem('auth', JSON.stringify(data.data))
                    window.location.assign('/')
                } else {
                    toast.error(data.message)
                }
            })
            .catch(err => toast.error(err.message));
    }
    return (
        <div className='d-flex w-100 justify-content-center mt-5'>
            <div className='login-form'>
                <h2 className='text-center  fw-bolder'>Please login</h2>
                <Form onSubmit={handleLogin} className='d-flex mt-5 flex-column justify-content-center'>
                    <Form.Group className="mb-3" controlId="eamil">
                        <Form.Control type="email" placeholder="Enter email" name='email' />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Control type="password" placeholder="Password" name='password' />
                    </Form.Group>
                    <Button className='' variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login