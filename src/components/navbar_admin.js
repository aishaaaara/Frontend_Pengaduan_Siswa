import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class NavBar extends React.Component {
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location = "/admin/login"
    }
    render(){
        return(
            <Navbar bg="light" variant="light">
            <Navbar.Brand> <Link to='/admin/home' style={{color: 'red'}}>Home </Link></Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link><Link to='/admin/tanggapan' style={{color: 'red'}}>Tanggapan</Link></Nav.Link>
                <Nav.Link><Link to='/admin/lapor' style={{color: 'red'}}>Pengaduan</Link></Nav.Link>
                    <Nav.Link onClick={() => this.Logout()} style={{color: 'red'}}>Logout</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}
export default NavBar;