import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap'
import Axios from 'axios';
import * as actionTypes from '../actions/actions';
import { useDispatch , useSelector } from 'react-redux';

function Navbar1() {
    const [colors,setColors] = React.useState(["#2D7B90","#2D7B90","#2D7B90","#2D7B90","#2D7B90"]);
    const user = useSelector(state => state.user);

    const activeColor = (x) =>{
        let currcolors=["#2D7B90","#2D7B90","#2D7B90","#2D7B90","#2D7B90"];
        currcolors[x]="#5ACEB6";
        setColors(currcolors);
    }
    
    const logout = () =>{
      activeColor(4);
      Axios.post("http://localhost:5000/user/logout",user)
        .then((res) => {
            if(res.data.success){
              window.localStorage.clear();
            }
            else{
                console.log(res.data.message)
            }
        })
        .catch((err) => {
          console.log("Axios", err.response.data);
        });
    }
  return (
  <Navbar style={{backgroundColor:"#f2f2f2"}}sticky="top" collapseOnSelect expand="lg" >
    <Navbar.Brand onClick={() =>activeColor(0) } as={Link} to='/homePage' ><img style={{width:"2vw"}}src="./images/Logo.png" /></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
    <Navbar.Collapse style={{textAlign:"center",padding:"0 4vw"}}id="responsive-navbar-nav">
      <Nav style={{fontSize:"2vw"}}>
        <Nav.Link onClick={() =>activeColor(0) } style={{marginLeft:"-5vw" , textAlign:"left",font: "normal normal 600 20px/27px Segoe UI",color: "#2D7B90"}} as={Link} to='/homePage' active>MuniciPal</Nav.Link>
      </Nav>
      <Nav className="ml-auto" >
        <Nav.Link style={{margin:"0 1vw",font: "normal normal 600 20px/27px Segoe UI",color: colors[0]}}  onClick={() =>activeColor(0) } as={Link} to='/homePage' active>Home</Nav.Link>
        <Nav.Link style={{margin:"0 1vw",font: "normal normal 600 20px/27px Segoe UI",color: colors[1]}}  onClick={() =>activeColor(1) } as={Link} to='/activeComplaintsPage' active>Active</Nav.Link>
        <Nav.Link style={{margin:"0 1vw",font: "normal normal 600 20px/27px Segoe UI",color: colors[2]}}  onClick={() =>activeColor(2) } as={Link} to='/pendingComplaintsPage' active>Pending</Nav.Link>
        <Nav.Link style={{margin:"0 1vw",font: "normal normal 600 20px/27px Segoe UI",color: colors[3]}}  onClick={() =>activeColor(3) } as={Link} to='/resolvedComplaintsPage' active>Resolved</Nav.Link>
        <div onClick={() => logout() } style={{cursor:"pointer", backgroundColor: colors[4], borderRadius:"40px",padding:"0 2vw"}}><Nav.Link style={{font: "normal normal 600 20px/27px Segoe UI",color: "#FFFFFF"}} as={Link} to='/loginPage' active>Logout</Nav.Link></div>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default Navbar1;
