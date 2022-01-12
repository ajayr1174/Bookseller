import logo from './logo.svg';
import './App.css';
import Main from './Component/Screen/Main';
import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import axios from 'axios';
import backend from "./backend"



function App() {
  const dispatch=useDispatch();

  useEffect(async ()=>{
  
  
      dispatch({
        type:'IS_LOGIN'
      });
      
      try{
        const {data}= await axios.get(`${backend.baseUrl}/books`)
      
        dispatch({
          type:'LOAD_BOOKS',
          payload:{
            data:data
        }})
        
        dispatch({
          type:'LOAD_CART'
        })
      }catch(err){
        
      }
    
    
  },[]);
  return (
   <>
    <Main />
   </>
  );
}

export default App;
