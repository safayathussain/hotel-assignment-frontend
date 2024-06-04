import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'

const Home = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/items`)
      .then(res => res.json())
      .then(data => setItems(data?.data))
  }, [])
  const [cart, setcart] = useState({})
  const [refetch, setrefetch] = useState(0)
  useEffect(() => {
    const cartState = JSON.parse(localStorage.getItem('cart'));
    setcart(cartState)
  }, [refetch])
  
  const setCart = (cartParam) => {
    let total = 0;
    cartParam.items?.map(item => {
      total += item.price * item.qty
    })
    cartParam.total = total
    localStorage.setItem('cart', JSON.stringify(cartParam))
    setrefetch(Math.random())
  }
  const addToCart = (item) => {
    const existedItem = cart?.items?.find(obj => obj.id === item.id)
    if (cart?.items) {
      if (existedItem) {
        existedItem.qty += 1
        setCart(cart)

      } else {
        item.qty = 1
        cart?.items?.push(item)
        setCart(cart)
      }
    } else {
      item.qty = 1
      const newCart = {
        items: [item]
      }
      setCart(newCart)
    }
  }
  return (
    <div className='mt-5'>
      <div className='d-flex flex-wrap gap-2'>

        {
          items?.map((item, i) => {
            return <Card style={{ width: '18rem' }} key={i} className='col-3'>
              <Card.Img variant="top" src={item.img} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>

                <Button variant="primary" onClick={() => addToCart(item)} disabled={(cart?.items?.find(obj => obj.id === item.id)) ? true : false}>Add to cart</Button>
              </Card.Body>
            </Card>

          })
        }
      </div>
    </div>
  )
}

export default Home