import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import NavBar from '../Common/Navbar';
import Books from './Books/Books';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import BookProfile from './Books/BookProfile';
import {connect} from 'react-redux'
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Cart from './Cart';
import Order from "./Order"
import User from "../Common/User.js"
import Vieworders from './Order/Vieworders';
import FOUR from '../Common/Four'
const Main=({user})=>{
    return (
        <BrowserRouter>
        <Box>

                <NavBar />
                    <Routes>
                    <Route path='/' element={<Books/>} />
                    <Route path='/auth/signin' element={<Login />} />
                    <Route path='/auth/signup' element={<SignUp />} />
                    <Route path='/Books/:id' element={<BookProfile/>} />
                    {user.user!==null &&<Route path='/cart' element={<Cart/>} /> }
                    {user.user!==null &&<Route path='/order' element={<Order/>} />}
                    {user.user!==null &&<Route path='/user' element={<User/>} />}
                    {user.user!==null && <Route path='/myorders' element={<Vieworders />} />}
                    <Route path='/*' element={<FOUR/>} />
                    
               </Routes>
                </Box>
        </BrowserRouter>

    )
}

const mapstatetoprops=(state)=>{
   
    return ({
        user:state.user
    })
}

export default connect(mapstatetoprops)(Main)