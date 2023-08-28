import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import {Row, Col, ListGroup, Card, Button, Image, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'  
import products from '../products'
  


const ProductScreen = () => {
    
    const {id: productId} = useParams()
    const product = products.find((p) => p._id === productId) 
   

  return (
    <>
    <Link className="btn btn-light my-3" to={'/'}>Retour </Link>
    <Row>
      <Col md={5}>
        <Image src={product.image} alt={product.name} fluid/>  
      </Col>
      <Col md={4}>
        <ListGroup variant="flush ">
        <ListGroup.Item>{product.name}</ListGroup.Item>
        <ListGroup.Item>
          <Rating value={product.rating} text={`${product.numReviews} avis`} color={'#f8e825'}/>
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
                <Col><strong>{product.price} XPF</strong></Col>       
              </Row>
           </ListGroupItem> 
           <ListGroupItem>
              <Row>
                <Col>Status:</Col>
                <Col><strong>{product.countInStock > 0 ? 'En stock' : 'Epuisée' }</strong></Col>       
              </Row>
           </ListGroupItem> 
           <ListGroupItem>
              <Row>
               <Button className="btn-block" type="button" disabled={product.countInStock === 0}>Ajouter au panier</Button>   
              </Row>
           </ListGroupItem> 
         </ListGroup>
         <Card>
           
         </Card>
               </Col>
    </Row>
     </>
  )
}

export default ProductScreen