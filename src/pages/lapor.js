import React from 'react'
import axios from 'axios'
import NavBar1 from '../components/navbar_admin'
import {Button,Modal, Table, Card, Form} from 'react-bootstrap' 

class Lapor extends React.Component {
    constructor() {  
        super();  
        this.state = {  
          token:"",
            pengaduan: [],
            id_pengaduan:"",
            tgl_pengaduan:"",
            id_siswa:"",
            isi_pengaduan:"",
            lokasi_pengaduan:"",
            image:"",
            status:"",
            search:"",
            action:"",
          isModalOpen: false
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

    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleAdd = () => {
        this.setState({
            id_pengaduan:"",
            tgl_pengaduan:"",
            id_siswa:"",
            isi_pengaduan:"",
            lokasi_pengaduan:"",
            image:"",
            status:"",
            search:"",
            action:"",
                    action: "insert",
                    isModalOpen: true
        })
    }
    handleEdit = (item) => {
        this.setState({
                    id_pengaduan: item.id_pengaduan,
                    tgl_pengaduan: item.tgl_pengaduan,
                    id_siswa: item.id_siswa,
                    isi_pengaduan: item.isi_pengaduan,
                    lokasi_pengaduan: item.lokasi_pengaduan,
                    image: item.image,
                    status: item.status,
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
          url = "http://localhost:2000/pengaduan/save"
        } else {
          url = "http://localhost:2000/pengaduan/update"
        }
        let form = {
            id_siswa: this.state.id_siswa,
            tgl_pengaduan: this.state.tgl_pengaduan,
            id_siswa: this.state.id_siswa,
            isi_pengaduan: this.state.isi_pengaduan,
            lokasi_pengaduan: this.state.lokasi_pengaduan,
            image: this.state.image,
            status: this.state.status

          }
          // mengirim data ke API untuk disimpan pada database
          axios.post(url, form, this.headerConfig())
          .then(response => {
          // jika proses simpan berhasil, memanggil data yang terbaru
          this.getpengaduan();
          })
          this.setState({
            isModalOpen: false
        })
        }
    getpengaduan = () => {
        let url = "http://localhost:2000/pengaduan";
        // mengakses api untuk mengambil data pengaduan
        axios.get(url, this.headerConfig())
        .then(response => {
          // mengisikan data dari respon API ke array pengaduan
          this.setState({pengaduan: response.data.pengaduan});
        })
        .catch(error => {
          console.log(error);
        });
    }
    componentDidMount(){
        // method yang pertama kali dipanggil pada saat load page
        this.getpengaduan()
       
    }
    findsiswa = (event) => {
        let url = "http://localhost:2000/pengaduan";
        if (event.keyCode === 13) {
        //   menampung data keyword pencarian
          let form = {
            find: this.state.search
          }
          // mengakses api untuk mengambil data pengaduan
          // berdasarkan keyword
          axios.post(url, form, this.headerConfig())
          .then(response => {
            // mengisikan data dari respon API ke array pengaduan
            this.setState({pengaduan: response.data.pengaduan});
          })
          .catch(error => {
            console.log(error);
          });
        }
    }
    Drop = (id_pengaduan) => {
        let url = "http://localhost:2000/pengaduan/" + id_pengaduan;
        // memanggil url API untuk menghapus data pada database
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url, this.headerConfig())
          .then(response => {
            // jika proses hapus data berhasil, memanggil data yang terbaru
            this.getpengaduan();
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
                <Card.Header className="card-header bg-success text-white" align={'center'}>Data Pengaduan</Card.Header>
                <Card.Body>
                <input type="text" className="form-control mb-2" name="search" value={this.state.search} onChange={this.bind} onKeyUp={this.findpengaduan} placeholder="Search.." />
                <Button variant="success" onClick={this.handleAdd}>
                    Tambah Data
                </Button>
                <br></br>
                <br></br>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>  
                            <th>Tanggal</th> 
                            <th>ID Siswa</th> 
                            <th>Laporan</th> 
                            <th>Lokasi</th>  
                            <th>Gambar</th>  
                            <th>Status</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.pengaduan.map((item,index) => {  
                        return (  
                        <tr key={index}>  
                            <td>{item.id_pengaduan}</td>  
                            <td>{item.tgl_pengaduan}</td>
                            <td>{item.id_siswa}</td>  
                            <td>{item.isi_pengaduan}</td>
                            <td>{item.lokasi_pengaduan}</td>
                            <td>{item.image}</td>  
                            <td>{item.status}</td> 
                            <td>   
                            <Button className="btn btn-sm btn-info m-1" data-toggle="modal"  
                            data-target="#modal" onClick={() => this.handleEdit(item)}>  
                                Berikan Tanggapan
                            </Button>
                            
                            <Button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.id_pengaduan)}>  
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
                    <Modal.Title>Form Pengaduan Siswa</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                    <Modal.Body>
        
                        ID<input type="number" name="id_pengaduan" value={this.state.id_pengaduan} onChange={this.bind}  
                        className="form-control" required /> 
                        Id Siswa
                        <input type="text" name="id_siswa" value={this.state.id_siswa} onChange={this.bind}  
                        className="form-control" required />  
                        isi
                        <input type="text" name="isi_pengaduan" value={this.state.isi_pengaduan} onChange={this.bind}  
                        className="form-control" required />  
                        Lokasi
                        <input type="text" name="lokasi_pengaduan" value={this.state.lokasi_pengaduan} onChange={this.bind}  
                        className="form-control" required /> 
                        Gambar
                        <Form.File id="exampleFormControlFile1" name="image" value={this.state.image} onChange={this.bind}  
                        className="form-control" required />
                        <br></br>
                        Status
                        <input type="text" name="status" value={this.state.status} onChange={this.bind}  
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


export default Lapor