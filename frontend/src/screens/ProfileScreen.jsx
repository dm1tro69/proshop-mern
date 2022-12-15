import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {getUsersDetails, updateUsers} from "../actions/userActions";

const ProfileScreen = () => {
    const [email, setEmail ] = useState('')
    const [name, setName ] = useState('')
    const [password, setPassword ] = useState('')
    const [message, setMessage ] = useState(null)
    const [confirmPassword, setConfirmPassword ] = useState('')
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.userLogin)
    const {success} = useSelector(state => state.userUpdate)
    const {user, loading, error} = useSelector(state => state.userDetails)
    const navigate = useNavigate()

    useEffect(()=> {
        if (!userInfo){
            navigate('/login')
        } else {
            if (!user.name){
                dispatch(getUsersDetails('profile'))
            } else {
               setName(user.name)
               setEmail(user.email)
            }
        }
    }, [user, navigate, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage('Password do not match')

        }else {
           dispatch(updateUsers({id: user._id, email, name, password}))
        }

    }

    return (
       <Row>
           <Col md={3}>
               <h2>User Profile</h2>
               {error && <Alert variant={'danger'}>{error}</Alert>}
               {success && <Alert variant={'success'}>{'success'}</Alert>}
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
                       Update
                   </Button>
               </Form>
           </Col>
           <Col md={9}>
               <h2>My Orders</h2>
           </Col>
       </Row>
    );
};

export default ProfileScreen;
