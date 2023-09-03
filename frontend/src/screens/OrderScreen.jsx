import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetOrdersDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDelivereOrderMutation,
} from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    error,
    isLoading,
  } = useGetOrdersDetailsQuery(orderId);

  const [payOrder, { isLoading: isLoadingPay}] =
    usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =useDelivereOrderMutation()

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "EUR",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success("Paiement effectué");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    });
  }
  async function onApproveTest() {
    await payOrder({ orderId, details: {payer:{}} });
    refetch();
    toast.success("Paiement effectué");
  }


  function onError(error) {
    toast.error(error.message);
  }


  const orderPriceEuros = order && typeof order.totalPrice === 'number' 
  ? Number((order.totalPrice / 119.33174).toFixed(2))
  : 0;

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: orderPriceEuros,
          },
        },
      ],
    }).then((orderID) => {
      return orderID;
    });
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId );
      refetch();
      toast.success("Commande livrée");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <>
      <h1>Commande : {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Livraison</h2>
              <p>
                <strong>Nom : </strong> {order.user.name}
              </p>
              <p>
                <strong>Email : </strong> {order.user.email}
              </p>
              <p>
                <strong>Adresse : </strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Livré le {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Non livré</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Methode de paiment</h2>
              <p>
                <strong>Methode:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Payée le {new Date(order.paidAt).toLocaleDateString()} à {new Date(order.paidAt).toLocaleTimeString()}</Message>
              ) : (
                <Message variant="danger">Non payée</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Articles commandés</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  {console.log("item:", item)}
                  <Row>
                    <Col md={1}>
                      <Image
                        src={item.image || "default-image.jpg"}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x {item.price} XPF = {item.qty * item.price}{" "}
                      XPF
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Détails de la commande</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Articles</Col>
                  <Col>{order.itemsPrice} XPF</Col>
                </Row>
                <Row>
                  <Col>Livraison</Col>
                  <Col>{order.shippingPrice} XPF</Col>
                </Row>
                <Row>
                  <Col>TGC</Col>
                  <Col>{order.taxPrice} XPF</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>{order.totalPrice} XPF</Col>
                  <Col>{orderPriceEuros}€</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {isLoadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: "10px" }}
                      >
                        {" "}
                        tester le paiment
                      </Button>

                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

             {loadingDeliver && <Loader />} 
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type="button" className="btn btn-block" onClick={deliverOrderHandler}>
                    Marquer comme livré
                  </Button>
                </ListGroup.Item>
              ) }
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
