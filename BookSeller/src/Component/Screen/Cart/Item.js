import { Box, Typography,Button, ButtonGroup} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';

const Item=({item})=>{

    const history = useNavigate();
    const dispatch=useDispatch()
    const addItem=(data)=>{
       dispatch({
           type:'ADD_INC',
           payload:{
               data:data
           }
       })
    }
    const delItem=(data)=>{
        if(data.quantity<2) return ;
        else
        dispatch({
            type:'DEL_INC',
            payload:{
                data:data
            }
        })
    }
    const giveName=(d)=>{
        if(d.length==0)return '';
        let s=d[0];
        for(let i=1;i<d.length;i++)
        {
            s+=` , ${d[i]}`
        }
        return s;
    }
    const [count,setcount]=useState();
    const delteItem=()=>{

    }

    const orderItem= () =>{
            history("/order",{state:item})
    }



    const RemoveItem=()=>{
        dispatch({
            type:'DELETE',
            payload:{
                data:item
            }
        })
    }
    useEffect(()=>{
        if(item.count)
        {
            setcount(item.count);
        }
        else 
        setcount(1);
    },[])
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
        <Box sx={{position:'absolute',bottom:'1rem',width:'75%',right:'2rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <Box sx={{}}>
            <Button variant='contained' sx={{margin:'0 1rem'}}color='secondary' onClick={()=>orderItem()}>Buy</Button>
            <Button variant ='contained'color='error' onClick={()=>RemoveItem()}>Remove</Button>      
           </Box>
            <Box sx={{display:'flex',background:'rgba(0,0,0,.12)',borderRadius:'4px',padding:'.25rem'}}>
                <AddIcon  onClick={()=>addItem(item)}sx={{cursor:'pointer',padding:'.1rem','&:hover':{background:'rgba(11,11,11,.13)',borderRadius:'50%'}}} />
                <Typography sx={{margin:'0 .5rem ',padding:'.1rem'}}>{item.quantity}</Typography>
                <RemoveIcon onClick={()=>delItem(item)}sx={{cursor:'pointer',padding:'.1rem','&:hover':{background:'rgba(11,11,11,.13)',borderRadius:'50%'}}}></RemoveIcon> 
            </Box>
        </Box>
    </Box>
    )
}
export default Item