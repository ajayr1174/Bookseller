import {useState,useEffect} from 'react';
import {connect,useDispatch} from 'react-redux'
import { Box, Typography,Button, ButtonGroup} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Item from './Item'
const Cart=(props)=>{

    
    
    useEffect(()=>{
        
    },[]);
    return (
        <Box sx={{padding:'1rem'}}>
            <Typography fontSize='2.5rem' sx={{width:'60%',margin:'1rem auto',color:'#9e9e9e',textAlign:'end'}}> Your Cart</Typography>
            {props.cart.length===0 && <h5 style={{textAlign:'center',fontSize:'1.25rem',color:'#9e9e9e'}}>Cart Empty !</h5>}
            {props && props.cart && props.cart.length>0 && 
                props.cart.map((item)=>{
                    return (
                       <Item item={item} />
                    ) 
                })
            
            }
        </Box>
    )
}
const mapstatetoprops=(state)=>({
    cart:state.cart,
    user:state.user
})
export default connect(mapstatetoprops)(Cart)