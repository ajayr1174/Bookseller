import Box from '@mui/material/Box';
import { Button, Tooltip, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {makeStyles} from '@mui/styles';
import {connect} from 'react-redux'
import {useNavigate,useLocation, Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
const NavBar=({user,cart})=>{
    const location=useLocation();
    
    const history=useNavigate();
    const len=cart.length;
    const dispatch=useDispatch();
    const classes=useStyles();
    const [loading,setloading]=useState(true)
    useEffect(()=>{
        setloading(false)
    },[])
    return (
        <Box className={classes.navbar}>
            <Typography fontSize='1.2rem' fontWeight='bold' sx={{flex:1,cursor:'pointer'}} onClick={()=>history('/')} >BookSeller</Typography>
            <Box sx={{flex:3}} >
                
            </Box>
            {user.user==null?
            <Box sx={{flex:1,justifySelf:'flex-end'}} className={classes.option}>
                {location.pathname!='/auth/signin' && <Button color='primary' variant='outlined' className={classes.Login}sx={{margin:'0 1rem'}} onClick={()=>history('/auth/signin')}>Login</Button>}
                {location.pathname!='/auth/signup' &&<Button color='secondary' variant='contained' onClick={()=>history('/auth/signup')}>SignUp</Button>}
                
            </Box>
            :
            <Box className={classes.option}>
                <Tooltip title='profile'>
                 <Typography ><Link to="/user" style={{textDecoration:'none', color: "#000"}}>{user.user.name}</Link> </Typography>
                </Tooltip>
                <Badge badgeContent={len} color='error' sx={{'& .MuiBadge-badge': {}}}>
                    <Tooltip title='cart'>
                    <ShoppingCartIcon  onClick={()=>history('/cart')}sx={{marginLeft:'1.5rem',color:'#7b1fa2',cursor:'pointer'}} />
                    </Tooltip>
              </Badge>

                <Tooltip title='My orders'>
                 <LocalShippingIcon sx={{marginLeft:'1.5rem',color:'#7b1fa2',cursor:'pointer'}} onClick={()=>history('/myorders')}/>
                 
                </Tooltip>
                <Tooltip title='Logout'>
                    <LogoutIcon sx={{marginLeft:'1.5rem',color:'#7b1fa2',cursor:'pointer'}} onClick={
                        ()=>{
                            dispatch({
                                type:"LOGOUT"
                            })
                            history('/')
                        }
                    }/>
                </Tooltip>
            </Box>
            }
        </Box>

    )
}
const useStyles=makeStyles(theme=>({
    navbar:{
        padding:'1.5rem 5rem',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        boxShadow:'0 0 1px #aaa',
        background:'#e3f2fd'
    },
    searchBar:{
        display:"flex",
        alignItems:'center',
        boxShadow:'0 0 1px #111',
        padding:'.25rem 1rem',
        borderRadius:'8px',
        border:'transparent',
        background:'#ffff'
        
    },
    inputClass:{
        width:'100%',
        border:'none',
        outline:'none',
        color:'#aaa',
        background:'transparent'
    },
    option:{
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-end'

    }
    
}))

const mapstatetoprops=(state)=>({
    user:state.user,
    cart:state.cart
})
export default connect(mapstatetoprops)(NavBar)
