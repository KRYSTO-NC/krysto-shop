import {useNavigate} from 'react-router-dom'
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector , useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/userApiSlice'
import {logout} from '../slices/authSlice'
import SearchBox from './SearchBox'
import logo from '../assets/logo_krysto.png'
import { resetCart } from '../slices/cartSlice'

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {

      await logoutApiCall().unwrap()
      dispatch(logout())
      dispatch(resetCart())
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="header">
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={'/'}>
            <Navbar.Brand>
              <img className="header-logo" src={logo} alt="" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navabar-nav">
            <Nav className="ms-auto">
            <SearchBox />
              <LinkContainer to={'/cart'}>
                <Nav.Link>
                  {' '}
                  <FaShoppingCart /> Mon panier
                  {cartItems.length > 0 && (
                    <Badge
                      pill
                      bg="success"
                      style={{
                        marginLeft: '5px',
                      }}
                    >
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo?.name} id="username">
                  <LinkContainer to={'/profile'}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Deconnexion
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to={'/login'}>
                  <Nav.Link>
                    {' '}
                    <FaUser /> se connecter
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to={'/admin/productlist'}>
                    <NavDropdown.Item>Produits</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={'/admin/userlist'}>
                    <NavDropdown.Item>Utilisteurs</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={'/admin/orderlist'}>
                    <NavDropdown.Item>Commandes</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
