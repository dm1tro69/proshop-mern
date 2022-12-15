import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {register} from "../actions/userActions";

const RegisterScreen = () => {
    const [email, setEmail ] = useState('')
    const [name, setName ] = useState('')
    const [password, setPassword ] = useState('')
    const [message, setMessage ] = useState(null)
    const [confirmPassword, setConfirmPassword ] = useState('')
    const dispatch = useDispatch()
    const {userInfo, loading, error} = useSelector(state => state.userRegister)
    const navigate = useNavigate()

    useEffect(()=> {
        if (userInfo){
            navigate('/')
        }
    }, [userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage('Password do not match')

        }else {
            dispatch(register(name, email, password))
        }

    }

    return (
        <FormContainer>
            <h1>Register</h1>
            {error && <Alert variant={'danger'}>{error}</Alert>}
            {message && <Alert variant={'danger'}>{message}</Alert>}
            {loading && <h3>Loading...</h3>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId={'name'}>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control
                        type={'text'}
                        placeholder={'Enter Name'}
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group >
                <Form.Group controlId={'email'}>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type={'email'}
                        placeholder={'Enter email'}
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group >
                <Form.Group controlId={'password'}>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type={'password'}
                        placeholder={'Enter password'}
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group >
                <Form.Group controlId={'password'}>
                    <Form.Label>
                       Confirm Password
                    </Form.Label>
                    <Form.Control
                        type={'password'}
                        placeholder={'Confirm password'}
                        value={confirmPassword}
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group >
                <Button type={'submit'} variant={'primary'} className={'mt-3'}>
                    Register
                </Button>
            </Form>
            <Row className={'py-3'}>
                <Col>
                    Have an Account? <Link to={'/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;
