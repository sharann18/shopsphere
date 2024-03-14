import React, { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import axios from 'axios'
import { useCartStore } from '../store'

const CartPage = () => {
  const { cartItems, addItem } = useCartStore()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const quantity = searchParams.get('quantity')

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
  
  return (
    <div>
        CartPage
    </div>
  )
}

export default CartPage