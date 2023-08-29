import { useState } from "react"
import {Link} from 'react-router-dom'
import { Form, Button, Row, Col } from "react-bootstrap"
import FormContainer from "../components/FormContainer"

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault()
        // DISPATCH LOGIN
        console.log('submit')
    }
  return (
    <FormContainer>
        <h1>Connection</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="my-3" controlId='email'>
                <Form.Label>Votre adresse email</Form.Label>
                <Form.Control type="email" placeholder="Entrer votre email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className="my-3" controlId='password'>
                <Form.Label>Votre mot de passe</Form.Label>
                <Form.Control type="password" placeholder="Entrer votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-2">Connection</Button>
        </Form>
        <Row className="py-3">
            <Col>Nouveau client ? <Link to='/register'>S'enregistrer</Link></Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen