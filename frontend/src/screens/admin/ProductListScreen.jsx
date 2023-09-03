import { LinkContainer } from "react-router-bootstrap"
import { Table, Button , Row , Col } from "react-bootstrap"
import { FaTimes , FaEdit , FaTrash} from "react-icons/fa"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetProductsQuery } from "../../slices/productsApiSlice"

const ProductListScreen = () => {

    const { data: products, isLoading, error } = useGetProductsQuery()

    const deleteHandler = (id) => {

        console.log('====================================');
        console.log(id);
        console.log('====================================');
        
    }

  return (
    <>
    <Row className="align-items-center">
        <Col>
        <h1>Produits</h1>
        </Col>
        <Col className="text-end">
            <Button className="my-3 btn-sm">
                <FaEdit /> Créer un produit
            </Button>
        </Col>
    </Row>
        {isLoading ? ( <Loader /> ) : error ? ( <Message variant="danger">{error}</Message> ) : (
            <>
            <Table striped hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOM</th>
                        <th>PRIX</th>
                        <th>CATÉGORIE</th>
                        <th>MARQUE</th>
                        <th></th>
                    </tr>

                </thead>
                <tbody>
                    {products?.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}XPF</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant="light" className="btn-sm mx-2">
                                        <FaEdit />
                                    </Button>
                                </LinkContainer>
                                <Button variant="danger" className="btn-sm mx-2" onClick={() => deleteHandler(product._id)}>
                                    <FaTrash  style={{color: "white"}}/>
                                </Button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
            </>
        )}
    </>
  )
}

export default ProductListScreen