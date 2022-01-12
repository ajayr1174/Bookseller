import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box';
import { useState,useEffect } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backend from '../../../backend';
import { useDispatch,useSelector } from 'react-redux';
const Login=()=>{
    const history=useNavigate()
    const dispatch=useDispatch();
    const user_person=useSelector((state)=>state.user);
   
    if(user_person  && user_person.token && user_person.user.name)
    {
        
        history('/');

    }
    const [email,setEmail]=useState({value:'',msg:'',error:false});
    const [password,setPassword]=useState({value:'',msg:'',error:false});

    const Loggin=async (e)=>{
        e.preventDefault()
        if(email.value=='')
        {
            setEmail({value:'',error:true,msg:"Please Fill out this field"})
        }
        
        if(password.value=='')
        {
            setPassword({value:'',error:true,msg:'Please Fill out this field'})
        }
        if(!email.error && !password.error)
        {
            const user={email:email.value,password:password.value};
            const res=await axios.post(`${backend.baseUrl}${backend.signIn}`,user)
        
            if(res.status>=200 && res.status<=210)
            {
                dispatch({
                    type:'LOGIN',
                    payload:{
                        data:res.data
                    }
                })
                history('/')
            }
            else
            {

            }
        }
    }
    const classes=useStyles();
    return (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'80vh'}}>
        <Paper elevation={2} sx={{minHeight:'300px',width:'35%',padding:'2rem'}}>
            <Box sx={{marginTop:'1.5rem'}}>
                <Typography fontSize='1.45rem'  fontWeight='bold' color='primary'>Login</Typography>
            </Box>
            <form onSubmit={Loggin}> 
                <TextField className={classes.textField}  error={email.error} helperText={email.msg}  id='newmik' name='asd' label='Email' variant='outlined' fullWidth type='email'
                onChange={(e)=>{
                    
                    let emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

                     if(!emailRegx.test(e.target.value))
                    {
                        setEmail({value:e.target.value,msg:"Please enter a valid email",error:true})
                    }
                    else
                    {
                        setEmail({value:e.target.value,msg:'',error:false})
                    }
                }}
                ></TextField>
                <TextField className={classes.textField} error={password.error} helperText={password.msg} label='Password' id='asdas' name='sad' variant='outlined' fullWidth type='password'
                onChange={(e)=>{
                    if(e.target.value.length<6)
                    {
                        setPassword({value:e.target.value,msg:'Password Should be atleast 6 character long',error:true});
                    }
                    else
                    {
                        setPassword({value:e.target.value,msg:'',error:false});   
                    }
                }}
                
                ></TextField>
                <Button color='primary' variant='contained' onClick={Loggin}fullWidth className={classes.textField}>Login</Button>
            </form>
             <Typography sx={{cursor:'pointer','&:hover':{color:'blue',textDecoration:'underline'},width:'10%'}} onClick={()=>history('/auth/signup')}>SignUp</Typography>
            </Paper>
        </Box>
    )
}
const useStyles=makeStyles({
    textField:{
        margin:'1rem 0'
    }
})
export default Login