import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import backend from "../../backend";
import axios from "axios";
import { connect } from "react-redux";

function User({ user }) {
  const [currentUser, setcurrentUser] = useState({});

  useEffect(() => {
    if (user.user !== null) {
      // console.log(user)
      axios
        .get(`${backend.baseUrl}${backend.user}/${user.user._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((e) => {
          // console.log(e.data)
          setcurrentUser({ ...e.data });
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [user]);

  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100vw",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: 500, height: 400 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="div" sx ={{marginBottom : "2rem"}}>
               User Name:  {currentUser.name}
              </Typography>
              <Typography variant="h5" component="div"  sx ={{marginBottom : "2rem"}}>
               Eamil : {currentUser.email}
              </Typography>
              <Typography >
               Purchases
              </Typography>
             
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained">Edit Details</Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </React.Fragment>
  );
}
const mapstatetoprops = (state) => ({
  user: state.user,
});

export default connect(mapstatetoprops)(User);
