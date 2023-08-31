import { useState, useEffect } from 'react'
import { Table, Form, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FaTimes } from 'react-icons/fa'
import { useProfileMutation } from '../slices/userApiSlice'
import { useGetUserQuery } from '../slices/authSlice'
import { setCredentials } from '../slices/authSlice'
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const userInfos = useSelector((state) => state.auth.userInfo)

  const [
    updateProfile,
    { isLoading: loadingUpdateProfile},
  ] = useProfileMutation()

const {data:orders , isLoading , error} = useGetMyOrdersQuery()
  useEffect(() => {
    if (userInfos) {
      setName(userInfos.name)
      setEmail(userInfos.email)
    }
  }, [ userInfos, userInfos.name, userInfos.email])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
    } else {
     try {
        const res = await updateProfile({ _id:userInfos._id ,name,email,password}).unwrap()
        dispatch(setCredentials(res))
        toast.success('Profile mis à jour')
     } catch (error) {
        toast.error(error?.data.message || error?.error)
     }
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>Votre profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Nom</Form.Label>

            <Form.Control
              type="name"
              placeholder="Entrer votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Adresse email</Form.Label>

            <Form.Control
              type="email"
              placeholder="Entrer votre addresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Mot de passe</Form.Label>

            <Form.Control
              type="password"
              placeholder="Entrer votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Confirmer votre mot de passe</Form.Label>

            <Form.Control
              type="password"
              placeholder="Confirmer votre mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Mettre à jour
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>Mes commandes</h2>
        {isLoading ? <Loader/> : error ?(<Message variant="danger">{error?.data?.message || error.error}</Message>):(
            <Table striped hover responsive className="table-sm">
                <thead>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAYEE</th>
                    <th>LIVREE</th>
                    <th></th>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>{
                                order.isPaid ? (
                                    order.paidAt.substring(0,10)
                                ):(
                                    <FaTimes style={{color:"red"}}/>
                                )
                                }</td>
                            <td>{
                                order.isDelivered ? (
                                    order.isDelivered.substring(0,10)
                                ):(
                                    <FaTimes style={{color:"red"}}/>
                                )
                                }</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>

                                    <Button className="btn-sm" variant="light">Details</Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
