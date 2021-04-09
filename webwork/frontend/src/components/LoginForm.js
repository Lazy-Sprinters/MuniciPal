import React from 'react';
import {Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {Divider,TextField,InputAdornment,ThemeProvider,createMuiTheme} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {VpnKey,Lock} from '@material-ui/icons';
import Axios from 'axios';
import * as actionTypes from '../actions/actions'
import { useDispatch , useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    input: {
        color: '#2D7B90'
    }
}))
const theme = createMuiTheme({
    palette: {
      primary: { main: '#2D7B90' },
    },
  });
  
export default function LoginForm(){
    const [key,setKey] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [errorMessage,setErrorMessage] = React.useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    const login = () =>{
        const user={key:key,password:password};
        console.log("Logging In");
        //API Call to login the user
        Axios.post("http://localhost:5000/user/login",user)
        .then((res) => {
            console.log(res.data);
            if(res.data.success){
                console.log("Proceeding to Home Page");
                dispatch({type:actionTypes.CHANGE_USER , user:res.data.response})
                /*On success ->*/ history.push('/homePage');
            }
            else{
                console.log(res.data.message)
                setErrorMessage(res.data.message)
            }
        })
        .catch((err) => {
          console.log("Axios", err.response.data);
        });
        
    }

    return(
        <div style={{background: "#FFFFFF 0% 0% no-repeat padding-box",textAlign:"center",padding:"2vw 0 4vw 0",margin:"7vw 7vw"}}>
            <h1 style={{font:"normal normal 600 3vw/4vw Segoe UI",color: "#2D7B90"}}>Login</h1>
            <Divider style={{margin:"2vw 2vw 5vw 2vw",height:"0.2vw",backgroundColor:"#2D7B90",borderRadius:"40px"}}/>
            <div style={{textAlign:"left"}}>
            
            <ThemeProvider theme={theme}>
            <TextField
                style={{margin:"0 4vw 1.5vw 4vw",width:"24vw"}}
                InputProps={{
                    style:{color:"#2D7B90",fontWeight:key.length==0 ? "bold" : "normal"},
                    startAdornment: (
                        <InputAdornment position="start">
                        <VpnKey style={{margin:"0 1vw 0 0"}} />
                        </InputAdornment>
                    ),
                    
                }}
                placeholder="Security Key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                type="text"
            />
            <TextField
                style={{margin:"1.5vw 4vw 4vw 4vw",width:"24vw"}}
                InputProps={{
                    style:{color:"#2D7B90",fontWeight:password.length==0 ? "bold" : "normal"},
                    startAdornment: (
                        <InputAdornment position="start">
                        <Lock style={{margin:"0 1vw 0 0"}} />
                        </InputAdornment>
                    ),
                    
                }}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            </ThemeProvider>
                <div className="row1">
                    <Button disabled={ password.length==0 || key.length==0} onClick={()=>  login()} style={{background: "#5ACEB6 0% 0% no-repeat padding-box",borderRadius: "40px",border:"none",padding:"0.5vw 6vw",margin:"0 4vw",fontSize:"1.5vw"}}> Sign-in</Button>
                    <h6 style={{cursor:"pointer",margin:"0.8vw",fontSize:"1.3vw",color:"#2D7B90"}} onClick={() => history.push('/signUpPage')}>New User?</h6>
                </div>
                <br />
                {errorMessage.length!=0 &&
                    <div style={{color:"red",textAlign:"center"}}>
                        *{errorMessage}
                    </div>
                }
            </div>
        </div>
    )
} 