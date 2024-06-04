import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Table } from 'react-bootstrap'
import toast from 'react-hot-toast'

const Cart = () => {
  const authData = JSON.parse(localStorage.getItem('auth'))

  const [cart, setcart] = useState({
    total: 0,
    items: []
  })
  const [auth, setAuth] = useState(authData || {})
  const [refetch, setrefetch] = useState(0)
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart'))
    if (cartData) {
      setcart(cartData)
    }
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
  const removeItem = (item) => {
    const updatedItems = cart.items.filter(obj => obj.id !== item.id);
    cart.items = updatedItems;
    setCart(cart)
  }
  const increaseQty = (item) => {
    item.qty += 1
    setCart(cart)
  }
  const decreaseQty = (item) => {
    if (item.qty > 1) {
      item.qty -= 1
      setCart(cart)
    } else {
      removeItem(item)
    }
  }
  const handleOrder = () => {
    if (!auth) {
      return toast.error('Please Login')
    } else {
      const data = {
        user: auth,
        cart: cart
      }
      fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseData => {
          toast.success(responseData.message)
          localStorage.setItem('cart', JSON.stringify({}))
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
  return (
    <div className='mt-5'>
      {
        cart?.items?.length === 0 ? <h5>There is no cart item</h5> :

          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Item</th>
                  <th>quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  cart?.items?.map((item, i) => <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td><div>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" onClick={() => decreaseQty(item)}>-</Button>
                        <Button variant="primary">{item.qty}</Button>
                        <Button variant="secondary" onClick={() => increaseQty(item)}>+</Button>
                      </ButtonGroup>
                    </div></td>
                    <td>
                      <Button variant="danger" onClick={() => removeItem(item)}>Remove</Button>
                    </td>
                  </tr>
                  )
                }
              </tbody>
            </Table>

            <div>
              <h3>Total Price: ${cart?.total}</h3>
              <Button onClick={handleOrder} variant="success" size='lg' disabled={cart?.items?.length === 0}>Place order</Button>
            </div>
          </div>
      }
    </div>
  )
}

export default Cart