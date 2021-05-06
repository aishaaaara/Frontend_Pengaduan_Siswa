import React from 'react'
import axios from "axios";
import NavBar1 from "../components/navbar_admin";

class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            userName: null,
            
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
    getUser = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        this.setState({userName: user[0].username})
    }
    getAdmin = () => {
        let url = "http://localhost:2000/admin";
        // mengakses api untuk mengambil data 
        console.log(this.headerConfig())
        axios.get(url, this.headerConfig())
        .then(response => {
          // mengisikan data dari respon API ke array 
          this.setState({adminCount: response.data.count});
        })
        .catch(error => {
          console.log(error);
        });
    }
    getPengaduan = () => {
        let url = "http://localhost:2000/pengaduan";
        // mengakses api untuk mengambil data 
        console.log(this.headerConfig())
        axios.get(url, this.headerConfig())
        .then(response => {
          // mengisikan data dari respon API ke array 
          this.setState({pengaduanCount: response.data.count});
        })
        .catch(error => {
          console.log(error);
        });
    }
    getTanggapan = () => {
        let url = "http://localhost:2000/tanggapan";
        // mengakses api untuk mengambil data 
        console.log(this.headerConfig())
        axios.get(url, this.headerConfig())
        .then(response => {
          // mengisikan data dari respon API ke array 
          this.setState({tanggapanCount: response.data.count});
        })
        .catch(error => {
          console.log(error);
        });
    }

   
    
    componentDidMount(){
        this.getUser()
        this.getAdmin()
        this.getPengaduan()
        this.getTanggapan()
    }
    render(){
        return(
            <div>
                <NavBar1/>
                <div className="container mt-2">
                    <h3 className="my-2">
                        <strong>Welcome back, {this.state.userName}</strong>
                    </h3>
                    <div className="row">

                        {/* Pengaduan */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-warning">
                                    <h4 className="text-dark">
                                        <strong>Jumlah Pengaduan</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.pengaduanCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        
                         {/* Tanggapan*/}
                         <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-danger">
                                    <h4 className="text-dark">
                                        <strong>Jumlah Tanggapan</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.tanggapanCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        )
    }
}

export default Home