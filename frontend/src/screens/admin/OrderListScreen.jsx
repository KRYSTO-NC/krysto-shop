import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from "react-bootstrap"
import { FaTimes } from "react-icons/fa"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetOrdersQuery } from "../../slices/ordersApiSlice"

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery()

  return (
    <>
      <h1>Commandes</h1>
      {isLoading ? ( <Loader /> ) : error ? ( <Message variant="danger">{error}</Message> ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>UTILISATEUR</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAYÉ</th>
              <th>LIVRÉ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
             
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.totalPrice}XPF</td>
                <td>
                  {order.isPaid ? (
                    new Date(order.paidAt).toLocaleDateString()
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
              
                    new Date(order.deliveredAt).toLocaleDateString()
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">Détails</Button>
                  </LinkContainer>
                </td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      )
      }
    </>
  )
}

export default OrderListScreen