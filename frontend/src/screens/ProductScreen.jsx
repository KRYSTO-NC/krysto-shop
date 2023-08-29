import { useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Image,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);


  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({...product, qty}));
    navigate('/cart')
   }

  return (
    <>
      <Link className="btn btn-light my-3" to={"/"}>
        Retour{" "}
      </Link>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush ">
              <ListGroup.Item>{product.name}</ListGroup.Item>
              <ListGroup.Item>
                <strong>{product.subname} </strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} avis`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>Prix: {product.price} XPF </ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Prix:</Col>
                  <Col>
                    <strong>{product.price} XPF</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "En stock" : "Epuisée"}
                    </strong>
                  </Col>
                </Row>
              </ListGroupItem>

              {product.countInStock > 0 && (
  <ListGroupItem>
    <Row>
      <Col>Quantité</Col>
      <Col>
        <Form.Control
          as='select'
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        >
          {[...Array(product.countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>{x + 1}</option>
          ))}
        </Form.Control>
      </Col>
    </Row>
  </ListGroupItem>
)}

              <ListGroupItem>

                <Row>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Ajouter au panier
                  </Button>
                </Row>
              </ListGroupItem>

            </ListGroup>
            <Card></Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
