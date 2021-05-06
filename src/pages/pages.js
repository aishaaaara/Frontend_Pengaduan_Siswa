import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './home'
import HomeAdmin from './home_admin'
import Login from './login'
import LoginAdmin from './login_admin'
import Register from './register'
import RegisterAdmin from './register_admin'
import Pengaduan from './pengaduan'
import Tanggapan from './tanggapan'
import Riwayat from './riwayat'
import Lapor from './lapor'



const Pages = () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/admin/home' component={HomeAdmin} />
        <Route path='/login' component={Login} />
        <Route path='/admin/login' component={LoginAdmin} />
        <Route path='/register' component={Register} />
        <Route path='/admin/register' component={RegisterAdmin} />
        <Route path='/pengaduan' component={Pengaduan} />
        <Route path='/admin/tanggapan' component={Tanggapan} />
        <Route path='/riwayat' component={Riwayat} />
        <Route path='/admin/lapor' component={Lapor} />
       
    
    </Switch>
)

export default Pages;