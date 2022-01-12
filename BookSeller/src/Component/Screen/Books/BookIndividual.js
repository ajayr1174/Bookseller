import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'
import {Link} from 'react-router-dom'
const Bookind=({data})=>{

    const giveName=(d)=>{
        let s=d[0];
        for(let i=1;i<d.length;i++)
        {
            s+=` , ${d[i]}`
        }
        return s;
    }
    return (
        <Link to={`/Books/${data._id}`} style={{textDecoration:'none'}} state={data}>
            <Paper elevation={0} sx={{padding:'1rem',transition:'transform .125s',cursor:'pointer','&:hover':{transform:'scale(1.09)',boxShadow:'10px 0px 25px rgba(0,0,0,0.1)'}}}>
            <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'250px'}}>
                <Box sx={{height:'80%'}}>
                <img src={data.imgurl} style={{objectFit:'fill'}} width='150px' height='187px' alt={data.title}></img>
                </Box>
                <Typography fontWeight='bold' fontSize='1.2rem'sx={{textAlign:'end',marginTop:'.5rem'}}>{data.price}</Typography>
                <Typography fontSize='14px' color='secondary' sx={{textAlign:'center',marginTop:".5rem 0"}} >{data.title}</Typography>
                <Typography fontSize='10px' color='#bdbdbd' sx={{textAlign:'center',marginTop:".5rem 0"}}>
                    { data.authors.length==1?data.authors[0]
                        :
                        giveName(data.authors)
                    }
                </Typography>
            </Box>
            </Paper>
        </Link>
    )
}
export default Bookind