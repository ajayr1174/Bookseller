import Box from '@mui/material/Box'
import { Typography,Paper } from '@mui/material'
import { useState,useEffect } from 'react';
import raw from './raw.json';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
const BookProfile=()=>{
    const {state}=useLocation();
    const [data,setdata]=useState(null);
    if(state==null) {} //make a network request 
    const dispatch=useDispatch();
    useEffect(()=>{
        
        setdata(state);
    },[])

    const giveName=(d)=>{
        let s=d[0];
        for(let i=1;i<d.length;i++)
        {
            s+=` , ${d[i]}`
        }
        return s;
    }
    const AddtoCart=()=>{

        const {data}=axios
        dispatch({
            type:'ADD',
            payload:{
                data:state
            }
        })
    }

    return (
        data
        ? 
        
            <Paper elevation={0} sx={{padding:'1rem',width:'80%',margin:'auto',marginTop:'3rem'}}>
                <Box sx={{display:'flex'}}>
                <Box sx={{height:'400px',width:'240px',display:'flex',flexDirection:'column',justifyContent:'space-around',boxSizing:'content-box'}}>
                    <img src={data.imgurl} style={{objectFit:'fill'}} width='240px' height='300px' alt={data.title}></img>
                    <Button fullWidth color='primary' variant='contained' onClick={()=>AddtoCart()} >Add to cart</Button>
                </Box>
                <Box sx={{marginLeft:'3rem',marginTop:'1rem'}}>
                    <Typography fontSize='1.5rem' color='black' fontWeight='bold'>{data.title}</Typography>
                    <Typography sx={{marginTop:'1rem',letterSpacing:'1px',width:'100ch'}} fontSize=".85rem" color='#9e9e9e'>{data?.description}</Typography>
                    <Typography sx={{marginTop:'1rem'}} fontSize='1.25rem' color='primary'>Authors: <span style={{color:'#9e9e9e',fontSize:'.85rem'}}>{giveName(data.authors)}</span></Typography>
                    <Typography sx={{marginTop:'1rem',}} fontSize='1.75rem' color='secondary'>INR.{data.price}</Typography>
                </Box>
                </Box>
            </Paper>
       
        :
        <h1>Loading...</h1>
    )

}
export default BookProfile