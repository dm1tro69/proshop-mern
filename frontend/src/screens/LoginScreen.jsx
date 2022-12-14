import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../actions/userActions";

const LoginScreen = () => {
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')
    const dispatch = useDispatch()
    const {userInfo, loading, error} = useSelector(state => state.userLogin)
    const navigate = useNavigate()

    useEffect(()=> {
       if (userInfo){
           navigate('/')
       }
    }, [userInfo, navigate])

    const submitHandler = (e) => {
       e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
           <h1>Sign In</h1>
            {error && <Alert variant={'danger'}>{error}</Alert>}
            {loading && <h3>Loading...</h3>}
            <Form onSubmit={submitHandler}>
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
                <Button type={'submit'} variant={'primary'} className={'mt-3'}>
                    Sign In
                </Button>
            </Form>
            <Row className={'py-3'}>
                <Col>
                    New Customer? <Link to={'/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;
