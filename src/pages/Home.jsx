import React from 'react'
import { Button, Card } from 'react-bootstrap'

const Home = () => {
  return (
    <div className='mt-5'>
      <div className='d-grid grid-cols-4'>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg?t=st=1717305225~exp=1717308825~hmac=e7190bc041b780782485ff10a709735f57ddc43137ec13652b08fd3ab3648d09&w=826" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>

            <Button variant="primary">Add to cart</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Home