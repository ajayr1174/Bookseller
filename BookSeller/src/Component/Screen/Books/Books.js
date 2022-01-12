import { Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper'
import { Box } from '@mui/system';
import { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import {connect} from 'react-redux'
import Bookind from './BookIndividual';
const Books=({data})=>{
    const classes=useStyles();
    
    return(
        <Box className={classes.outerBox}>
            <Box sx={{margin:'1rem'}}>
                <Typography color='primary'sx={{textAlign:'end',cursor:'pointer',textDecoration:'underline'}}>All</Typography>
            </Box>
            <Grid container spacing={3}>
                {data.map((item)=>{
                    return (
                        <Grid item xs={6} md={3} >
                            <Bookind  data={item} key={item.isbn}/>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}
const useStyles=makeStyles(theme=>({
    outerBox:{
        padding:'3rem 5rem'
    }
}))
const mapstatetoprops=(state)=>({
    data:state.book
})
export default connect(mapstatetoprops)(Books)