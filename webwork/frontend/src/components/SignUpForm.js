import React from 'react';
import {Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {Divider,TextField,InputAdornment,ThemeProvider,createMuiTheme} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {FileCopy,Home,AssignmentInd,VpnKey,ContactPhone,Lock,Email} from '@material-ui/icons';

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
export default function SignUpForm({TermsNCond,errorMessage}){
    const [municipalityName,setMunicipalityName] = React.useState("");
    const [areaOfJurisdiction,setAreaOfJurisdiction] = React.useState("");
    const [municipalityID,setMunicipalityID] = React.useState("");
    const [securityKey,setSecurityKey] = React.useState("");
    const [phoneNo,setPhoneNo] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [confirmPassword,setConfirmPassword] = React.useState("");
    const [securityKeyValidation,setSecurityKeyValidation] = React.useState(false);
    const [phoneNoValidation,setPhoneNoValidation] = React.useState(false);
    const [emailValidation,setEmailValidation] = React.useState(false);
    const [passwordValidation,setPasswordValidation] = React.useState(false);
    const [confirmPasswordValidation,setConfirmPasswordValidation] = React.useState(false);
    const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const history = useHistory();
    
    const signUp = () =>{
        const municipalityCorp={municipalityName:municipalityName,areaOfJurisdiction:areaOfJurisdiction,municipalityID:municipalityID,securityKey:securityKey,phoneNo:phoneNo,email:email,password:password}
        console.log(municipalityCorp);
        TermsNCond(municipalityCorp);
    }

    return(
        <div style={{background: "#FFFFFF 0% 0% no-repeat padding-box",textAlign:"center",padding:"1vw 0 2vw 0",margin:"2vw 4vw"}}>
            <h1 style={{font:"normal normal 600 3vw/4vw Segoe UI",color: "#2D7B90"}}>Sign Up</h1>
            <Divider style={{margin:"2vw 2vw 1.5vw 2vw",height:"0.2vw",backgroundColor:"#2D7B90",borderRadius:"40px"}}/>
            <div style={{textAlign:"left"}}>
            
            <ThemeProvider theme={theme}>
            <div style={{border:"solid 1px #2D7B90",borderRadius:"10px",margin:"1vw",padding:"1vw"}}>
                <div style={{position:"absolute",left:"70vw",top:"15.3vw",zIndex:"1",backgroundColor:"#FFFFFF",border:"solid 1px #2D7B90",borderRadius:"10px",color:"#2D7B90",textAlign:"center",width:"7.5vw",fontSize:"1vw",fontWeight: 'bold'}}>Municipality</div>
                <TextField
                    style={{margin:"1vw 4vw 0.3vw 4vw",width:"24vw"}}
                    InputProps={{
                        style:{color:"#2D7B90",fontSize:"1.2vw",fontWeight:municipalityName.length==0 ? 'bold' : 'normal',borderColor:"#2D7B90"},
                        startAdornment: (
                            <InputAdornment position="start">
                            <FileCopy fontSize="small" style={{margin:"0 1vw 0 0"}} />
                            </InputAdornment>
                        ),
                        
                    }}
                    placeholder="Municipality Name"
                    value={municipalityName}
                    onChange={(e) => setMunicipalityName(e.target.value)}
                    type="text"
                />
                <TextField
                    style={{margin:"0.3vw 4vw",width:"24vw"}}
                    InputProps={{
                        style:{color:"#2D7B90",fontSize:"1.2vw",fontWeight:areaOfJurisdiction.length==0 ? 'bold' : 'normal',borderColor:"#2D7B90"},
                        startAdornment: (
                            <InputAdornment position="start">
                            <Home fontSize="small" style={{margin:"0 1vw 0 0"}} />
                            </InputAdornment>
                        ),
                        
                    }}
                    placeholder="Area Of Jurisdiction"
                    value={areaOfJurisdiction}
                    onChange={(e) => setAreaOfJurisdiction(e.target.value)}
                    type="text"
                />
                <TextField
                    style={{margin:"0.3vw 4vw",width:"24vw"}}
                    InputProps={{
                        style:{color:"#2D7B90",fontSize:"1.2vw",fontWeight:municipalityID.length==0 ? 'bold' : 'normal',borderColor:"#2D7B90"},
                        startAdornment: (
                            <InputAdornment position="start">
                            <AssignmentInd fontSize="small" style={{margin:"0 1vw 0 0"}} />
                            </InputAdornment>
                        ),
                        
                    }}
                    placeholder="Municipality ID"
                    value={municipalityID}
                    onChange={(e) => setMunicipalityID(e.target.value)}
                    type="text"
                />
                <TextField
                    style={{margin:"0.3vw 4vw",width:"24vw"}}
                    InputProps={{
                        style:{color:"#2D7B90",fontSize:"1.2vw",fontWeight:securityKey.length==0 ? 'bold' : 'normal',borderColor:"#2D7B90"},
                        startAdornment: (
                            <InputAdornment position="start">
                            <VpnKey fontSize="small" style={{margin:"0 1vw 0 0"}} />
                            </InputAdornment>
                        ),
                        
                    }}
                    placeholder="Security Key"
                    value={securityKey}
                    onChange={(e) => setSecurityKey(e.target.value)}
                    type="password"
                    onFocus={() => setSecurityKeyValidation(true)}
                    error={securityKeyValidation && securityKey.length!=6}
                    helperText={
                        (securityKeyValidation && securityKey.length!=6) 
                        ? 
                            "Key must exactly contain 6 characters. Keep this key secure as it will be the access key for all your employees. " 
                        : 
                            "Keep this key secure as it will be the access key for all your employees. "
                    } 
                />
            </div>
            <div style={{border:"solid 1px #2D7B90",borderRadius:"10px",margin:"1.2vw 1vw 1vw 1vw",padding:"1vw"}}>
                <div style={{position:"absolute",left:"70vw",top:"34.9vw",zIndex:"1",backgroundColor:"#FFFFFF",border:"solid 1px #2D7B90",borderRadius:"10px",color:"#2D7B90",textAlign:"center",width:"7.5vw",fontSize:"1vw",fontWeight: 'bold'}}>Coordinator</div>
                <TextField
                    style={{margin:"0.3vw 4vw",width:"24vw"}}
                    InputProps={{
                        style:{color:"#2D7B90",fontSize:"1.2vw",fontWeight:phoneNo.length==0 ? 'bold' : 'normal',borderColor:"#2D7B90"},
                        startAdornment: (
                            <InputAdornment position="start">
                            <ContactPhone fontSize="small" style={{margin:"0 1vw 0 0"}} />
                            </InputAdornment>
                        ),
                        
                    }}
                    placeholder="Phone Number"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    type="number"
                    onFocus={() => setPhoneNoValidation(true)}
                    error={phoneNoValidation && phoneNo.length!=10}
                    helperText={(phoneNoValidation && phoneNo.length!=10) ? "Invalid Phone Number" : ""}
                />
                <TextField
                    style={{margin:"0.3vw 4vw",width:"24vw"}}
                    InputProps={{
                        style:{color:"#2D7B90",fontSize:"1.2vw",fontWeight:email.length==0 ? 'bold' : 'normal',borderColor:"#2D7B90"},
                        startAdornment: (
                            <InputAdornment position="start">
                            <Email fontSize="small" style={{margin:"0 1vw 0 0"}} />
                            </InputAdornment>
                        ),
                        
                    }}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    onFocus={() => setEmailValidation(true)}
                    error={emailValidation && !emailCheck.test(String(email).toLowerCase())}
                    helperText={(emailValidation && !emailCheck.test(String(email).toLowerCase())) ? "Invalid Email" : ""}
                />
                <TextField
                    style={{margin:"0.3vw 4vw",width:"24vw"}}
                    InputProps={{
                        style:{color:"#2D7B90",fontSize:"1.2vw",fontWeight:password.length==0 ? 'bold' : 'normal',borderColor:"#2D7B90"},
                        startAdornment: (
                            <InputAdornment position="start">
                            <Lock fontSize="small" style={{margin:"0 1vw 0 0"}} />
                            </InputAdornment>
                        ),
                        
                    }}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    onFocus={() => setPasswordValidation(true)}
                    error={passwordValidation && password.length<8}
                    helperText={(passwordValidation && password.length<8) ? "Password must contain atleast 8 characters" : ""}
                />
                <TextField
                    style={{margin:"0.3vw 4vw 1vw 4vw",width:"24vw"}}
                    InputProps={{
                        style:{color:"#2D7B90",fontSize:"1.2vw",fontWeight:confirmPassword.length==0 ? 'bold' : 'normal',borderColor:"#2D7B90"},
                        startAdornment: (
                            <InputAdornment position="start">
                            <Lock fontSize="small" style={{margin:"0 1vw 0 0"}} />
                            </InputAdornment>
                        ),
                        
                    }}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    onFocus={() => setConfirmPasswordValidation(true)}
                    error={confirmPasswordValidation && (confirmPassword!=password && password.length>=8)}
                    helperText={(confirmPasswordValidation && (confirmPassword!=password && password.length>=8)) ? "Does Not Match" : ""}

                />
            </div>
            </ThemeProvider>
                <div className="row1">
                    <Button 
                        disabled = {
                            securityKey.length!=6 || confirmPassword!=password || phoneNo.length!=10 || !emailCheck.test(String(email).toLowerCase()) || password.length<8
                        } 
                        onClick = {
                            () =>  signUp()
                        } 
                        style = {{
                            background: "#5ACEB6 0% 0% no-repeat padding-box",
                            borderRadius: "40px",
                            border:"none",
                            padding:"0.5vw 6vw",
                            margin:"0 3vw 0 4vw",
                            fontSize:"1.5vw"
                        }}
                    > 
                        Sign Up
                    </Button>
                    <h6 style={{cursor:"pointer",margin:"0.8vw 0",fontSize:"1.3vw",color:"#2D7B90"}} onClick={() => history.push('/loginPage')}>Already A User?</h6>
                </div>
                {errorMessage.length!=0 &&
                    <div style={{color:"red",textAlign:"center"}}>
                        *{errorMessage}
                    </div>
                }
            </div>
        </div>
    )
} 