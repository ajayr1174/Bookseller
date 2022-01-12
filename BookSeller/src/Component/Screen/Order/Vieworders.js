import axios from 'axios';
import React,{useEffect} from 'react'
import backend from '../../../backend';
import {connect} from 'react-redux'
import {useDispatch} from 'react-redux'
import { Box,Typography } from '@mui/material';
import Singleorder from './SingleOrder';
function Vieworders({user,order}) {
    const dispatch=useDispatch()
    
    useEffect(async()=>{
        if(user.user!==null){
        const res=await axios.get(`${backend.baseUrl}/orders/${user.user._id}`)
        
            dispatch({
                type:'LOAD_ORDERS',
                payload:{data:res.data}
            })
    }
    },[user]);
    return (
        <Box>
         <Typography fontSize='2.5rem' sx={{width:'60%',margin:'1rem auto',color:'#9e9e9e',textAlign:'end'}}> Your Orders</Typography>
           
            {order.length!=0 ?
                
                order.map((item)=>{
                    return <Singleorder item={item.products[0]} />
                })
            :
            <h1>No Order Found!</h1>
            }
        </Box>
    )
}
const mapstate=((state)=>({
    user:state.user,
    order:state.order
}))

export default connect(mapstate)(Vieworders)