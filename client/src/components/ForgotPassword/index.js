import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef();       
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    

    const handleSubmit = async(e) => {
        e.preventDefault();        
        try{
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox to reset your password')            
        } catch {
            setError('Failed to reset password')
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h1 className="text-center mb-4">Reset Password</h1>                                        
                    {message && <Alert variant="success">{message}</Alert> }
                    {error && <Alert variant="danger">{error}</Alert> }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} />
                        </Form.Group>                                              
                        <Button disabled={loading} className="w-100" type="submit" style={{backgroundColor: "#FD0000"}}>Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/gamestock/login">Log In</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center text-white mt-2">
                Don't have an account? <Link to="/gamestock/signup" style={{color: "#FD0000"}}>Sign Up</Link>
            </div>
        </>
    )
}
