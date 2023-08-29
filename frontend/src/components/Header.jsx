import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaShoppingCart , FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import logo from '../assets/logo_krysto.png'
const Header = () => {
  return (
    <header className='header'>
        <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>

                <Container>
                  <LinkContainer to={'/'}>
                    <Navbar.Brand>
                        <img className='header-logo' src={logo} alt="" />
                    </Navbar.Brand>
                  </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navabar-nav'>
                            <Nav className='ms-auto'>
                              <LinkContainer to={'/cart'}>
                                <Nav.Link> <FaShoppingCart/> Mon panier</Nav.Link>
                              </LinkContainer>
                              <LinkContainer to={'/login'}>
                                <Nav.Link> <FaUser/> S'enregistrer</Nav.Link>
                              </LinkContainer>
                            </Nav>
                    </Navbar.Collapse>
                </Container>

        </Navbar>
    </header>
  )
}

export default Header