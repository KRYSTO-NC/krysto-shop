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
import { useDispatch , useSelector } from "react-redux";
import {toast} from 'react-toastify'
import Rating from "../components/Rating";
import { useGetProductDetailsQuery , useCreateReviewMutation } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";


const ProductScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  const [rating , setRating] = useState(0)
  const [comment , setComment] = useState('')


  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({...product, qty}));
    navigate('/cart')
   }

const submitHandler = async (e) => {
  e.preventDefault()
 
  try {
    await createReview({productId , rating , comment}).unwrap()
    refetch()
    toast.success('Avis ajouté')
    setRating(0)
    setComment('')
  } catch (error) {
    toast.error(error?.data?.message || error?.error)

    
  }
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
        <>
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

        <Row className="review">
          <Col md={6}>
            <h2>Avis</h2>
            {product.reviews.length === 0 && <Message>Aucun avis sur ce produit</Message>}
            <ListGroup variant="flush">
              {product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} color="#f8e825" />
                  <p>{new Date(review.createdAt).toLocaleDateString()}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>Donnez votre avis</h2>
                {loadingProductReview && <Loader/>}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Control as='select'
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      
                      >
                        <option value="">Selectionnez...</option>
                        <option value="1">1 - Mauvais</option>
                        <option value="2">2 - Passable</option>
                        <option value="3">3 - Bien</option>
                        <option value="4">4 - Très bien</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Control className="my-2" as="textarea" row="3" value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button  disabled={loadingProductReview} type="submit" variant="primary">
                      Envoyer
                    </Button>
                  </Form>
                ): (
                  <Message>Veuillez vous <Link to="/login">connecter</Link> pour donner votre avis</Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
