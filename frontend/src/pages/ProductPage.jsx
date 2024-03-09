import React, { useState, useEffect }  from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'
import axios from 'axios'

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([])

  useEffect(()=>{
    
    async function fetchProduct() {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/product/${id}`);
      setProduct(data);
    }

    fetchProduct();
  }, [])

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      <Row>
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
            Description: {product.description}
          </ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Price: </Col>
                <Col><strong>${product.price}</strong></Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status: </Col>
                <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button className='btn' style={{ width: '100%' }} type='button' disabled={product.countInStock === 0 && true}> 
                Add to Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductPage