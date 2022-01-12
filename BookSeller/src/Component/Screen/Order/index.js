import React,{useState}from 'react'
import {useLocation} from 'react-router-dom'
import {TextField,Box,Typography, Button} from '@mui/material'
import axios from 'axios';
import backend from '../../../backend'
import {connect} from 'react-redux';

function Order({user,cart}) {
    const {state}=useLocation();
    
    const [add,setadd]=useState({value:'',msg:'',error:false});
  
    const placeorder=async ()=>{
        if(add.value=='')
        {
            setadd({value:'',error:true,msg:'Please Fill out this fields'})
            return;
        }
        if(add.error)
        {
            return ;
        }
        const order={products:[state],address:add.value};
       
        try{

            const res=await axios.post(`${backend.baseUrl}${backend.order}/${user.user._id}`,{order},{
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
        })
         
            if(res.data.products.length>0)
            {
                alert('Order Place Successfully')
                
            }
            else
            {
                alert('Something went wrong');
            }
        }
        catch(err)
        {
            console.log(err)
        }
    }
    return (
        <Box sx={{display:'flex',flexDirection:"column",alignItems:'center',width:'50%',margin:"auto"}}>
            <Box sx={{width:'80%',marginTop:'3rem'}}>

                <Typography sx={{padding:'1rem 0'}}>Enter Your Address details</Typography>
                <TextField label='Address' error={add.error} helperText={add.msg} onChange={(e)=>{
                    if(e.target.value.length>6)
                    {
                        setadd({value:e.target.value,error:false,msg:''})
                    }
                    else
                    {
                        setadd({value:e.target.value,msg:'Address must be 7 character long',error:true})
                    }
                }}fullWidth ></TextField>
                <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Box>
                    <Box sx={{marginTop:'1rem'}}>
                        <img src={state.imgurl}alt={state.title}></img>
                    </Box>
                    <Box sx={{padding:'1rem 0'}}>
                        <Typography>{state.title}</Typography>
                    </Box>
                    </Box>
                    <Box sx={{marginTop:'1rem',padding:'1rem',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                        
                            <Box>
                            <Typography sx={{textAlign:'end'}}>Price : {state.price}</Typography>
                            <Typography sx={{textAlign:'end'}}>Quantity : {state.quantity}</Typography>
                            </Box>
                            <Typography sx={{textAlign:'end'}} fontSize='1.25rem'>Total : {parseInt(state.price) * parseInt(state.quantity)}</Typography>
                       
                    </Box>
                </Box>
                <Button variant='contained' sx={{margin:'1rem 0'}} fullWidth onClick={placeorder}>Order Now</Button>
            </Box>
        </Box>
    )
}
const mapstatetoprops=((state)=>({
    user:state.user,
    cart:state.cart
}))

export default connect(mapstatetoprops)(Order)
