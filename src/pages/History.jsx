import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import toast from 'react-hot-toast';

const History = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/past-orders/${user.email}`);
        const data = await response.json();
        if (data?.data) {
          console.log(data);
          setOrders(data.data); // Update state with fetched orders
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (user && user.email) {
      fetchOrders();
    }
  }, [user]); // Effect dependency array
const handleRemoveOrder = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/remove-past-order/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== id));
  toast.success('Order deleted successfully')
}
  return (
    <div>
      <div className="mt-5">
        {orders?.map((item, i) => (
          <div key={i} className='mt-3'>
            <Card>
              <Card.Header>
                <h6>OrderId: {item?.orderId}</h6>
              </Card.Header>
              <Card.Body>
                <Card.Title>Total Price: {item.cart.total}</Card.Title>
                <Card.Text className="d-flex align-items-center gap-2">
                  <h5>Items:</h5> {item?.cart?.items.map(e => e.name + ', ')}
                </Card.Text>
                <Button variant="danger" onClick={() => handleRemoveOrder(item?.orderId)}>Remove</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
