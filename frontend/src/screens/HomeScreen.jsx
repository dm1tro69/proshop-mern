import React, {useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";


const HomeScreen = () => {


    const {products, loading, error} = useSelector(state => state.productList)

    const dispatch = useDispatch()

    useEffect(()=> {
       dispatch(listProducts())
    }, [dispatch])


    return (
        <>
           <h1>Latest Products</h1>
            {loading && <h1>Loading...</h1>}
            {error && <h3>{error}</h3>}
            <Row>
                {products?.map(product => (
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default HomeScreen;
