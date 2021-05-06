import React from 'react'
import axios from 'axios'
import NavBar1 from '../components/navbar_admin'
import {Button,Modal, Table, Card, Form} from 'react-bootstrap' 

class Tanggapan extends React.Component {
    constructor() {  
        super();  
        this.state = {  
          token:"",
            tanggapan: [],
            id_tanggapan:"",
            id_pengaduan:"",
            tgl_tanggapan:"",
            isi_tanggapan:"",
            id_admin:"",
            search:"",
            action:"",
          isModalOpen: false
        }
        if (localStorage.getItem("token")) {
          this.state.token = localStorage.getItem("token")
      } else {
          window.location = "/admin/login"
      }

      this.headerConfig.bind(this)
}
headerConfig = () => {
  let header = {
      headers: { Authorization: `Bearer ${this.state.token}` }
  }
  return header
}

    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleAdd = () => {
        this.setState({
          id_tanggapan:"",
          id_pengaduan:"",
          tgl_tanggapan:"",
          isi_tanggapan:"",
          id_admin:"",
          search:"",
          action:"",
                    action: "insert",
                    isModalOpen: true
        })
    }
    handleEdit = (item) => {
        this.setState({
                    id_tanggapan: item.id_tanggapan,
                    id_pengaduan: item.id_pengaduan,
                    tgl_tanggapan: item.tgl_tanggapan,
                    isi_tanggapan: item.isi_tanggapan,
                    id_admin: item.id_admin,
                    action: "update",
                    isModalOpen: true
        })
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    handleSave = (event) => {
        event.preventDefault();
        
        let url = "";
        if (this.state.action === "insert") {
          url = "http://localhost:2000/tanggapan/save"
        } else {
          url = "http://localhost:2000/tanggapan/update"
        }
        let form = {
            id_tanggapan: this.state.id_tanggapan,
            id_pengaduan: this.state.id_pengaduan,
            tgl_tanggapan: this.state.tgl_tanggapan,
            isi_tanggapan: this.state.isi_tanggapan,
            id_admin: this.state.id_admin

          }
          // mengirim data ke API untuk disimpan pada database
          axios.post(url, form, this.headerConfig())
          .then(response => {
          // jika proses simpan berhasil, memanggil data yang terbaru
          this.gettanggapan();
          })
          this.setState({
            isModalOpen: false
        })
        }
    gettanggapan = () => {
        let url = "http://localhost:2000/tanggapan";
        // mengakses api untuk mengambil data tanggapan
        axios.get(url, this.headerConfig())
        .then(response => {
          // mengisikan data dari respon API ke array tanggapan
          this.setState({tanggapan: response.data.tanggapan});
        })
        .catch(error => {
          console.log(error);
        });
    }
    componentDidMount(){
        // method yang pertama kali dipanggil pada saat load page
        this.gettanggapan()
       
    }
    findtanggapan = (event) => {
        let url = "http://localhost:2000/tanggapan";
        if (event.keyCode === 13) {
        //   menampung data keyword pencarian
          let form = {
            find: this.state.search
          }
          // mengakses api untuk mengambil data 
          // berdasarkan keyword
          axios.post(url, form, this.headerConfig())
          .then(response => {
            // mengisikan data dari respon API ke array 
            this.setState({tanggapan: response.data.tanggapan});
          })
          .catch(error => {
            console.log(error);
          });
        }
    }
    Drop = (id_tanggapan) => {
        let url = "http://localhost:2000/tanggapan/" + id_tanggapan;
        // memanggil url API untuk menghapus data pada database
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url, this.headerConfig())
          .then(response => {
            // jika proses hapus data berhasil, memanggil data yang terbaru
            this.gettanggapan();
          })
          .catch(error => {
            console.log(error);
          });
        }
    }
    render(){
        console.log(this.state.jur)
        return(
            <>
            <NavBar1 />
            <Card style={{ width: '70rem', margin: '40px', left: '30px'}}>
                <Card.Header className="card-header bg-danger text-white" align={'center'}>Riwayat Data Tanggapan</Card.Header>
                <Card.Body>
                <input type="text" className="form-control mb-2" name="search" value={this.state.search} onChange={this.bind} onKeyUp={this.findtanggapan} placeholder="Search..." />
                <Button variant="success" onClick={this.handleAdd}>
                    Tambah Data
                </Button>
                <br></br>
                <br></br>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>  
                            <th>ID Pengaduan</th> 
                            <th>Tanggal</th> 
                            <th>Tanggapan</th> 
                            <th>ID Admin</th>  
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.tanggapan.map((item,index) => {  
                        return (  
                        <tr key={index}>  
                            <td>{item.id_tanggapan}</td>  
                            <td>{item.id_pengaduan}</td>
                            <td>{item.tgl_tanggapan}</td>  
                            <td>{item.isi_tanggapan}</td>
                            <td>{item.id_admin}</td>
                            <td>  
                            <Button className="btn btn-sm btn-info m-1" data-toggle="modal"  
                            data-target="#modal" onClick={() => this.handleEdit(item)}>  
                                Edit  
                            </Button>  
                            <Button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.id_tanggapan)}>  
                                Hapus  
                            </Button>  
                            </td>  
                        </tr>  
                        );  
                    })}
                    </tbody>
                    </Table>
                </Card.Body>
                </Card>

                
                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Form Tanggapan</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                    <Modal.Body>
        
                        ID<input type="number" name="id_tanggapan" value={this.state.id_tanggapan} onChange={this.bind}  
                        className="form-control" required />  
                        ID Pengaduan
                        <input type="text" name="id_pengaduan" value={this.state.id_pengaduan} onChange={this.bind}  
                        className="form-control" required />  
                        Tanggapan
                        <input type="text" name="isi_tanggapan" value={this.state.isi_tanggapan} onChange={this.bind}  
                        className="form-control" required />  
                        ID Admin
                        <input type="text" name="id_admin" value={this.state.lokasi_pengaduan} onChange={this.bind}  
                        className="form-control" required /> 
                        
                    </Modal.Body>
                     <Modal.Footer>
                     <button className="btn-primary btn-sm" type="submit">  
                     Simpan 
                     </button>
                    </Modal.Footer>
                    </Form>
                </Modal>
            </>
    );  
  }
}


export default Tanggapan