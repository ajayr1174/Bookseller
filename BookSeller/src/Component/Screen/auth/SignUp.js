import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box';
import { useState,useEffect } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
import backend from '../../../backend';
import { useSelector,useDispatch } from 'react-redux';
const SignUp=()=>{
    const history=useNavigate();
    
    const classes=useStyles();

    const user_person=useSelector((state)=>state.user);
  
    if(user_person  && user_person.token && user_person.user.name)
    {
        
        history('/');

    }

    const [email,setEmail]=useState({value:'',msg:'',error:false});
    
    const [name,setName]=useState({value:'',msg:'',error:false});
    const [password,setPassword]=useState({value:'',msg:'',error:false});
    const [confirm,SetConfirm]=useState({value:'',msg:'',error:false});
    const Signup=async(e)=>{
        e.preventDefault()
        if(email.value=='')
        {
            setEmail({value:'',error:true,msg:"Please Fill out this field"})
        }
        if(name.value=='')
        {
            setName({value:'',error:true,msg:'Please Fill out this field'})
        }
        if(password.value=='')
        {
            setPassword({value:'',error:true,msg:'Please Fill out this field'})
        }
        if(confirm.value=='')
        {
            SetConfirm({value:'',error:true,msg:'Please Fill out this field'})
        }
        if(!confirm.error && !email.error && !password.error && !name.error)
        {
            ///axios
            const user={email:email.value,password:password.value,name:name.value}
            const data=await axios.post(`${backend.baseUrl}${backend.signUp}`,user);
           
           if(data.status>=200 && data.status<=210)
           {
                history('/auth/signin')
           }
           else{

           }

        }
        else
        {
            return  ;
        }
       
    }

    return (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'80vh'}}>
        <Paper elevation={2} sx={{minHeight:'300px',width:'35%',padding:'2rem'}}>
            <Box sx={{marginTop:'1.5rem'}}>
                <Typography fontSize='1.45rem'  fontWeight='bold'color='primary'>SignUp</Typography>
            </Box>
            <form onSubmit={Signup}> 
                <TextField className={classes.textField} error={name.error} helperText={name.msg} id='newasmik' name='assasd' label='Name' variant='outlined' fullWidth type='text'
                onChange={(e)=>{
                  
                    if((e.target.value.length<3))
                    {
                        setName({value:e.target.value,msg:"Please enter a valid name",error:true})
                    }
                    else
                    {
                        setName({value:e.target.value,msg:'',error:false})
                    }
                }}
                
                ></TextField>
                <TextField className={classes.textField} error={email.error} helperText={email.msg} id='newmik' name='asd' label='Email' variant='outlined' fullWidth type='email'
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
                
                <TextField className={classes.textField} error={password.error} helperText={password.msg} label='Password' id='asdas' name='sad'variant='outlined'fullWidth type='password'
                
                onChange={(e)=>{
                    if(e.target.value.length<6)
                    {
                        setPassword({value:e.target.value,msg:'Password Should be atleast 8 character long',error:true});
                    }
                    else
                    {
                        setPassword({value:e.target.value,msg:'',error:false});   
                    }
                }}
                
                ></TextField>
                <TextField className={classes.textField} error={confirm.error} helperText={confirm.msg} label='Confirm Password' id='asdafsasf' name='safasfd'variant='outlined'fullWidth type='password'
                    onChange={(e)=>{
                        if(e.target.value!=password.value)
                        {
                            SetConfirm({value:e.target.value,error:true,msg:'Password do not match'})
                        }
                        else
                        {
                            
                            SetConfirm({value:e.target.value,error:false,msg:''})
                        }
                    }}
                ></TextField>
                <Button type='submit' color='primary'  onClick={Signup}variant='contained'fullWidth className={classes.textField}>Signup</Button>
            </form>
             <Typography sx={{cursor:'pointer','&:hover':{color:'blue',textDecoration:'underline'},width:'10%'}} onClick={()=>history('/auth/signin')}>Login</Typography>
            </Paper>
        </Box>
    )
}
const useStyles=makeStyles(({
    textField:{
        margin:'1rem 0'
    }
}))
export default SignUp