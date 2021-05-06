import React from 'react'
import axios from 'axios'
import NavBar from '../components/navbar'
import {Button, Modal, Table, Card, Form} from 'react-bootstrap'

class Riwayat extends React.Component{
    constructor(){
        super();
        this.state = {
            token: "",
            pengaduan: []
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getPengaduan = () => {
        let url = "http://localhost:2000/pengaduan";
            
        axios.get(url, this.headerConfig())
        .then(response => {   
            this.setState({pengaduan: response.data.pengaduan});
        })
    
        .catch(error => {
          console.log(error);
        });
      }
    
    componentDidMount(){
        this.getPengaduan()
    }

    render(){
        return (
            <div>
            <NavBar />
            <Card style={{ width: '70rem', margin: '40px', left: '30px'}}>
                <Card.Header className="card-header bg-info text-white" align={'center'}>Riwayat Pengaduan Siswa</Card.Header>
                <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                Nama Siswa
                                <h6>{this.props.id_siswa}</h6>
                            </th>
                            <th>
                                Isi Pengaduan
                                <h6>{this.props.isi_pengaduan}</h6>
                            </th>
                            <th>
                                Lokasi Pengaduan
                                <h6>{this.props.lokasi_pengaduan}</h6>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.pengaduan.map((item,index) => {  
                        return (  
                        <tr key={index}>  
                            <td>{item.id_siswa}</td>  
                            <td>{item.isi_pengaduan}</td>  
                            <td>{item.lokasi_pengaduan}</td>  
                        </tr>  
                        );  
                    })}
                    </tbody>
                    </Table>
                </Card.Body>
                </Card>
                </div>
        )
    }

}

export default Riwayat;