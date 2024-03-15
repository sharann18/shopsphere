import React, { useEffect } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import axios from 'axios'
import { useCartStore } from '../store'

const CartPage = () => {
  const { cartItems, addItem, removeItem } = useCartStore()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const quantity = Number(searchParams.get('quantity'))
  const navigateTo = useNavigate()

  useEffect(() => {
    async function fetchProduct() {
      try {
        if (!id || !quantity) return;
        const { data } = await axios.get(`/api/product/${id}`);
        
        addItem({
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            quantity
          }
        )
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }

    if (id && quantity) {
      fetchProduct();
    }
  }, [id, quantity]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const removeFromCartHandler = (id) => {
    removeItem(id)
  }

  const checkoutHandler = () => {
    navigateTo(`/login?redirect=shipping`)
  }

  return (
    <div>
    <Link to='/' className='btn btn-light'>Go Back</Link>
    <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? 
          (
            <Message variant='info'>
              Your cart is empty <Link to='/'>Go back</Link>
            </Message>
          ):

          (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={`${item.product} image`} fluid rounded/>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`} style={{textDecoration: 'none'}}>
                        <b>{item.name}</b>
                      </Link>
                    </Col>
                    <Col md={2}>
                      ${item.price}
                    </Col>
                    <Col>
                      <Form.Select
                          size="sm" 
                          as='select' 
                          defaultValue={item.quantity} 
                          onChange={(e)=>(addItem({
                            ...item,
                            product: item.product,
                            quantity: Number(e.target.value)
                          }))}>
                            {
                              [...Array(item.countInStock).keys()].map((x) => 
                                (<option key={x+1} value={x+1}>
                                    {x + 1}
                                  </option>)
                              )
                            }
                      </Form.Select>
                    </Col>
                    <Col md={1}>
                      <Button type='button' variant='light' 
                      onClick={() => removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )
          }
        </Col>

        <Col md={4} style={{margin: '5rem 0'}}>
          {cartItems.length > 0 && <Card>
            <ListGroup variant='flush'>
            <ListGroup.Item style={{marginInline:'auto'}}>
                <h4>Subtotal({cartItems.reduce((acc, item) => {
                  return acc + item.quantity
                }, 0)}) items:</h4>
                <h4 style={{textAlign:'center'}}>${cartItems.reduce((acc, item) => {
                  return Math.round((acc + item.price*item.quantity)*100)/100;
                }, 0)}</h4>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                type='button'
                className='btn'
                style={{ width: '100%' }}
                onClick={() => checkoutHandler()}>
                  Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>}
        </Col>
    </Row>
    </div>
  )
}

export default CartPage