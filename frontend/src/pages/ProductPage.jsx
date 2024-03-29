import React, { useEffect, useState }  from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAILED } from '../constants/productConstants'
import axios from 'axios'
import { useProductsStore } from '../store'

const ProductPage = ({ }) => {
  const { id } = useParams();
  const { product, loading, error, dispatchDetails } = useProductsStore()
  const [quantity, setQuantity] = useState(1)
  const navigateTo = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
        try {
          dispatchDetails({ type: PRODUCT_DETAILS_REQUEST });

          const { data } = await axios.get(`/api/products/${id}`);

          dispatchDetails({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
        } catch(error) {
            const errorMessage = error.response && error.response.data && error.response.data.detail
                ? error.response.data.detail
                : error.message;

                dispatchDetails({
                type: PRODUCT_DETAILS_FAILED,
                payload: errorMessage
            });
          }
      }

      fetchProduct();
  }, []);

  const addToCartHandler = () => {
    navigateTo(`/cart/${id}?quantity=${quantity}`)
  }

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      {loading ? <Loader/> :
        error ? <Message variant='danger'>{error}</Message>
        : (<Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} color={'#f8e825'} text={`${product.numReviews} reviews`}/>
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Description</b>: {product.description}
              </ListGroup.Item>
            </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price </Col>
                    <Col><strong>${product.price}</strong></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                <Row>
                  <Col>Status </Col>
                  <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && 
                (
                  <ListGroup.Item>
                    <Row>
                      <Col className='my-auto'>Quantity </Col>
                      <Col xs='auto' className='mx-4'>
                        <Form.Select
                        size="sm" 
                        as='select' 
                        defaultValue={quantity} 
                        onChange={(e)=>(setQuantity(e.target.value))}>
                          {
                            [...Array(product.countInStock).keys()].map((x) => 
                              (<option key={x+1} value={x+1}>
                                  {x + 1}
                                </option>)
                            )
                          }
                        </Form.Select>
                      </Col>
                    </Row>
                  
                  </ListGroup.Item>
                )
              }

              <ListGroup.Item>
                <Button className='btn' style={{ width: '100%' }} type='button' disabled={product.countInStock === 0 && true} onClick={addToCartHandler}> 
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>)
      }
    </div>
  )
}

export default ProductPage