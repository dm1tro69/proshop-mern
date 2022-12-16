import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import {Alert, Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const PlaceOrderScreen = () => {
    const dispatch = useDispatch()
    const {shippingAddress, paymentMethod, cartItems, } = useSelector(state => state.cart)
    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    const itemsPrice = addDecimal(cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0))
    const shippingPrice = addDecimal(itemsPrice > 100 ? 50: 10)


    const taxPrice = addDecimal((0.15*itemsPrice))

    const totalPrice = Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)

    const placeOrderHandler = () => {

    }
    return (
        <>
         <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant={'flush'}>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {shippingAddress.address}, {shippingAddress.city},
                                {shippingAddress.postalCode}, {' '} {shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cartItems.length === 0 ? <Alert>You cart is empty</Alert>: (
                                <ListGroup variant={'flush'}>
                                    {cartItems.map((item, i) => (
                                        <ListGroup.Item key={i}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant={'flush'}>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                       Items
                                    </Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping
                                    </Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax
                                    </Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total
                                    </Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type={'button'}
                                    className={'btn-block'}
                                    disabled={cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                   Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
