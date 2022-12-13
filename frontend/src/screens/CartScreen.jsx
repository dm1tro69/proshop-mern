import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {addToCart, removeFromCart} from "../actions/cartActions";
import {Alert, Button, Card, Col, Form, Image, ListGroup, Row} from "react-bootstrap";

const CartScreen = () => {
    const {id} = useParams()
    const {search} = useLocation()
    const qty = search?.split('=')[1]

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {cartItems} = useSelector(state => state.cart)

    useEffect(()=> {
       if (id){
           dispatch(addToCart(id, qty))
       }
    }, [id, qty, dispatch])

    const removeFromCartHandler = (id) => {
         dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        navigate('/shipping')
    }

    return (
        <Row>
            <Col md={8}>
               <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Alert variant={'info'}>Your cart is empty <Link to={'/'}>Go Back</Link></Alert>: (
                    <ListGroup variant={'flush'}>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as={'select'}
                                            value={item.qty}
                                            onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type={'button'}
                                            variant={'light'}
                                            onClick={()=> removeFromCartHandler(item.product)}
                                        >
                                           <i className={'fas fa-trash'}></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant={'flush'}>
                        <ListGroup.Item>
                            <h3>Subtotal ({cartItems.reduce((acc, cur)=> acc + +cur.qty, 0)}) items</h3>
                            ${cartItems.reduce((acc, cur)=> acc + (cur.qty * cur.price), 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type={'button'}
                                className={'btn-block'}
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                               Proceed for checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

        </Row>
    );
};

export default CartScreen;
