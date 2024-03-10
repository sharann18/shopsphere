import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useProductsStore } from '../store'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILED } from '../constants/productConstants'
import axios from 'axios'

function HomePage() {
  const { products, error, loading, dispatchList } = useProductsStore()

  useEffect(()=>{
    async function fetchProductsList() {
      try {
        dispatchList({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get('api/products/');

        dispatchList({ type: PRODUCT_LIST_SUCCESS, payload: data })
        
      } catch(error) {
        const errorMessage = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;

          dispatchList({
            type: PRODUCT_LIST_FAILED,
            payload: errorMessage
        })
     }
    }

    fetchProductsList();
  }, [])

  return (
    <div>
        <h1>Latest Products</h1>
        {loading ? <Loader/> : 
          error ? <Message variant='danger'>{error}</Message> :
          <Row>
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
        }
    </div>
  )
}

export default HomePage