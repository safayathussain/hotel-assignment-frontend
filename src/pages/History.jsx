import React from 'react'
import { Button, Card } from 'react-bootstrap'

const History = () => {
  return (
    <div>
      <div className='mt-5'>
        <Card>
          <Card.Header><h6>OrderId: 31321</h6></Card.Header>
          <Card.Body>
            <Card.Title>Total Price: </Card.Title>
            <Card.Text className='d-flex align-items-center gap-2'>
              <h5>Items:</h5> With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Button variant="danger">Remove</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default History