import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice'

const ProductEditScreen = () => {
  const { id: productId } = useParams()
  const [name, setName] = useState('')
  const [subname, setSubname] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId)

  const [
    updateProduct,
    { isLoading: loadingUpdate },
  ] = useUpdateProductMutation()

  const [
    uploadProductImage,
    { isLoading: loadingUpload },
  ] = useUploadProductImageMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (product) {
      setName(product.name)
      setSubname(product.subname)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setDescription(product.description)
      setPrice(product.price)
      setCountInStock(product.countInStock)
    }
  }, [product])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await updateProduct({
        productId,
        name,
        subname,
        image,
        brand,
        category,
        description,
        price,
        countInStock,
      })
      toast.success('Produit modifié avec succès')
      refetch()
      navigate('/admin/productlist')
    } catch (error) {
      toast.error(error?.data?.message || error?.message)
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    try {
      const res = await uploadProductImage(formData).unwrap()
      toast.success(res.message)
      setImage(res.image)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  return (
    <>
      <Link to={'/admin/productlist'}>
        <Button className="btn btn-light my-3">Retour</Button>
      </Link>
      <FormContainer>
        <h1>Modifier le produit</h1>
        {loadingUpdate && <Loader />}
        {loadingUpload && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer le nom du produit"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="subname" className="my-2">
              <Form.Label>Entrer le sous titre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer le sous titre du produit"
                value={subname}
                onChange={(e) => setSubname(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price" className="my-2">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrer le prix du produit"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer l\'image du produit"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type="file"
                label="Choisir une image"
                onChange={uploadFileHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand" className="my-2">
              <Form.Label>Marque</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer la marque du produit"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Quantité en stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrer la quantité en stock du produit"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category" className="my-2">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer la catégorie du produit"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer la description du produit"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">
              Mettre à jour
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
