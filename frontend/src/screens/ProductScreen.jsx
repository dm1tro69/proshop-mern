import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

const ProductScreen = () => {
    const {id} = useParams()
    const [product, setProduct] = useState({})
    const fetchProduct = async () => {
       const {data} = await axios.get(`/api/products/${id}`)
        console.log(data)
        setProduct(data)
    }
    useEffect(() => {
        fetchProduct()
    }, [id, fetchProduct])
    return (
        <>
            <Link to={'/'} className={'btn btn-light my-3'}>Go Back</Link>
            <Row>
                <Col md={6}>
                  <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                   <ListGroup variant={'flush'}>
                       <ListGroup.Item>
                           <h2>{product.name}</h2>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           Price: ${product.price}
                       </ListGroup.Item>
                       <ListGroup.Item>
                           Description: {product.description}
                       </ListGroup.Item>
                   </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant={'flush'}>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock': 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className={'btn btn-block'} type={'button'} disabled={product.countInStock === 0}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductScreen;
