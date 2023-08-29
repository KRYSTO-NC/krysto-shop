import { useState , useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Form, Button, Col } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import CheckoutStep from "../components/CheckoutStep"
import { savePaymentMethod } from "../slices/cartSlice"

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState("PayPal")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

useEffect(() => {
    if(!shippingAddress) {
        navigate("/shipping")
    }
}, [shippingAddress, navigate])


const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder")
}

  return (
   <FormContainer>
    <CheckoutStep step1 step2 step3 />
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as="legend">Selectionner un mode de paiement</Form.Label>
                <Col>
                    <Form.Check
                    type="radio"
                    className="my-2"
                    label="PayPal ou Carte de credit"
                    id="PayPal"
                    name="paymentMethod"
                    value="PayPal"
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                </Col>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2">Continuer</Button>
        </Form>
   </FormContainer>
  )
}

export default PaymentScreen