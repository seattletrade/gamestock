import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import API from '../../utils/API'

export default function Signup() {
    const emailRef = useRef()
    const nicknameRef = useRef();
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!emailRef.current.value || !passwordRef.current.value || !passwordConfirmRef.current.value){
            return setError("No input field can be left empty")
        }
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Password confirmation do not match the password")
        }
        if(passwordRef.current.value.length < 6){
            return setError("Password should be at least six characters")
        }
        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            API.createUser({
                email: emailRef.current.value,
                nickName: nicknameRef.current.value
            })            
            history.push("/gamestock/user")
        } catch {
            setError('Account creation failed')
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h1 className="text-center mb-4">Sign Up</h1>                                        
                    {error && <Alert variant="danger">{error}</Alert> }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} />
                        </Form.Group>
                        <Form.Group id="nickname">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control type="text" ref={nicknameRef} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit" style={{backgroundColor: "#FD0000"}}>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center text-white mt-2">
                Already have an account? <Link to="/gamestock/login" style={{color: "#FD0000"}}>Log In</Link>
            </div>
        </>
    )
}
