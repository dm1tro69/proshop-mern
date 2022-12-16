import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import {Button, Col, Form} from "react-bootstrap";
import {savePaymentMethod, saveShippingAddress} from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
    const {shippingAddress} = useSelector(state => state.cart)
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    if (!shippingAddress){
        navigate('/shipping')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as={'legend'}>Select Method</Form.Label>

                <Col>
                    <Form.Check
                        type={'radio'}
                        label={'PayPal or Credit Card'}
                        id={'PayPal'}
                        value={'PayPal'}
                        checked
                        onChange={(e)=> setPaymentMethod(e.target.value)}
                        name={'paymentMethod'}>

                    </Form.Check>
                    <Form.Check
                        type={'radio'}
                        label={'Stripe'}
                        id={'Stripe'}
                        value={'Stripe'}
                        onChange={(e)=> setPaymentMethod(e.target.value)}
                        name={'paymentMethod'}>

                    </Form.Check>
                </Col>
                </Form.Group>
                <Button className={'mt-3'} type={'submit'} variant={'primary'}>Continue</Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
