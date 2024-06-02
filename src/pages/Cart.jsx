import React from 'react'
import { Button, ButtonGroup, Table } from 'react-bootstrap'

const Cart = () => {
  return (
    <div className='mt-5'>
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
          <tr>
            <td>1</td>
            <td>sagol, goru</td>
            <td><div>
              {/* <p>1</p> */}
              <ButtonGroup aria-label="Basic example">
                <Button variant="secondary">-</Button>
                <Button variant="primary">1</Button>
                <Button variant="secondary">+</Button>
              </ButtonGroup>
            </div></td>
            <td>
              <Button variant="danger">Remove</Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <div>
        <h3>Total Price: 1000tk</h3>
        <Button variant="success" size='lg'>Place order</Button>
      </div>
    </div>
  )
}

export default Cart