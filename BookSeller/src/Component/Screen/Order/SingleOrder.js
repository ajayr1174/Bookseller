import { Box, Typography,Button, ButtonGroup} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';

const Singleorder=({item})=>{
        
    
    const giveName=(d)=>{
        if(d.length==0)return '';
        let s=d[0];
        for(let i=1;i<d.length;i++)
        {
            s+=` , ${d[i]}`
        }
        return s;
    }
    return (
        <Box sx={{width:'60%',margin:'1rem auto',border:'1px solid #aaa',padding:'.5rem 1rem',display:'flex',position:'relative'}}>
        <Box >
            <img src={item.imgurl}  width='150px'/>
        </Box>
        <Box sx={{marginLeft:'1rem',marginTop:'1rem'}}>
            <Typography  color='secondary' fontSize='1.25rem'>
                {item.title}
            </Typography>
            <Typography fontSize='.85rem' color='#9e9e9e'sx={{margin:'.25rem 0'}}>
                {giveName(item.authors)}
            </Typography>
            <Typography sx={{margin:'.25rem 0'}} >
                {item.price}
            </Typography>
        </Box>
        
    </Box>
    )
}
export default Singleorder