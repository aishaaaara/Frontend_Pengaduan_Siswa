import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class NavBar extends React.Component {
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location = "/login"
    }
    render(){
        return(
            <Navbar bg="light" variant="light" >
            <Navbar.Brand> <Link to='/' style={{color: 'green'}}>Home </Link></Navbar.Brand>
                <Nav className="mr-auto" >
                <Nav.Link><Link to='/pengaduan' style={{color: 'green'}}>Pengaduan</Link></Nav.Link>
                <Nav.Link><Link to='/riwayat' style={{color: 'green'}}>Riwayat</Link></Nav.Link>
                    <Nav.Link onClick={() => this.Logout()} style={{color: 'green'}}>Logout</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}
export default NavBar;