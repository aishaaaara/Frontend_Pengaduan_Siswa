import React from 'react'
import axios from 'axios'
import {Card, Form, Button, Container} from 'react-bootstrap'
import {Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Login from './login'


class Register extends React.Component {
    constructor () {
        super();
        this.state = {
            id_siswa: "",
            nisn: "",
            email: "",
            username: "",
            password: "",
            telp: "",
            message: "",
            logged: true
        }
    }
    Register = event => {
        const base_url = "http://localhost:2000"
        event.preventDefault()
        let sendData = {
            id_siswa: this.state.id_siswa,
            nisn: this.state.nisn,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            telp: this.state.telp
        }
        let url = base_url + "/register"
        
        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged) {
                let user = response.data.data
                let token = response.data.token
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                this.props.history.push("/")
            } else {
                this.setState({message: response.data.message})
            }
        })
        .catch(error => alert(error))
    }
    render () {
        return(
            <Container className="container d-flex justify-content-center align-items-center">
                <Card className="col-sm-6 card my-5">
                <Card.Header className="card-header bg-danger  text-white text-center" style={{color: "red", fontFamily: "Trebuchet MS"}}><strong>Register</strong></Card.Header>
                <Card.Body>
                    { !this.state.logged ? 
                        (
                            <div className="alert alert-danger mt-1">
                                { this.state.message }
                            </div>
                        ) : null }
                    <Form onSubmit={ev => this.Register(ev)}>
                    <Card.Text>
                    <Form.Group controlId="id_siswa">
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter ID" value={this.state.id_siswa}
                            onChange={ev => this.setState({id_siswa: ev.target.value})}/>
                        </Form.Group>
                        <Form.Group controlId="nisn">
                            <Form.Label>Nisn</Form.Label>
                            <Form.Control type="text" placeholder="Enter Nisn" value={this.state.nisn}
                            onChange={ev => this.setState({nisn: ev.target.value})}/>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter Email" value={this.state.email}
                            onChange={ev => this.setState({email: ev.target.value})}/>
                        </Form.Group>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" value={this.state.username}
                            onChange={ev => this.setState({username: ev.target.value})}/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.password}
                            onChange={ev => this.setState({password: ev.target.value})}
                            autoComplete="false" />
                        </Form.Group>
                        <Form.Group controlId="telp">
                            <Form.Label>No.Telp</Form.Label>
                            <Form.Control type="text" placeholder="Enter No.Telp" value={this.state.telp}
                            onChange={ev => this.setState({telp: ev.target.value})}/>
                        </Form.Group>
                    </Card.Text>
                    <Button variant="danger" type="submit">Submit</Button>
                    <Nav.Link><Link to='/login'><strong style={{color: "red", fontFamily: "verdana"}}>Already have an account? Login</strong></Link></Nav.Link>
                    </Form>
                </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default Register