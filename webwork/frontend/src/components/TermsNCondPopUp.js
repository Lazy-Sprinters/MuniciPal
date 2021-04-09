import {Button,Modal} from 'react-bootstrap';
import React,{ useEffect } from 'react';
import { TextField } from "@material-ui/core";
import './ComplaintDetailsPopUp.css';
import Axios from 'axios';

function ComplaintDetailsPopUp(props) {
    const [emailOTP,setEmailOTP] = React.useState("");
    const [phoneOTP,setPhoneOTP] = React.useState("");
    const [verified,setVerified] = React.useState(false);
    const [counter,setCounter] = React.useState(30);
    const [errorMessage,setErrorMessage] = React.useState("");

    const verify = () =>{
        const CheckOTP ={email:props.municipalityCorp.email,emailOTP:emailOTP,phoneNo:props.municipalityCorp.phoneNo,phoneOTP:phoneOTP};
        //API Call to verify the OTPs
        Axios.post("http://localhost:5000/user/verify",CheckOTP)
        .then((res) => {
          if(res.data.success){
            console.log("Verified the account with OTPs",CheckOTP);
            setVerified(true)
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

    const resend = () =>{
        setCounter(30);
        props.sendOTP(props.municipalityCorp)
    }

    const clickHandler = (counter>0 || verified)  ? null : () => resend();

    
    useEffect(
        () => {
            const timeout = setTimeout(() => {
                if(counter>0){
                    setCounter(counter-1);
                }
              }, 1000);
        }
    )

  return (
    <Modal
      show={props.show} 
      onHide={props.onHide}
      backdrop="static"
      size={props.size}
      centered
    >
      <Modal.Header closeButton>
      <Modal.Title>
         Verification
      </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div style={{textAlign:"center",fontWeight:"bold",fontSize:"1.5vw"}}>
        Enter the OTPs sent to your registered email and phone number to verify them. 
      </div>
      <br />
      <div className="row1" style={{justifyContent:"space-between"}}>
        <TextField
            placeholder="Email OTP"
            label="Email OTP"
            variant="outlined"
            onChange={(e) => setEmailOTP(e.target.value)}
            type="text"
            disabled ={verified}
        />
        <TextField
            placeholder="Phone OTP"
            label="Phone OTP"
            variant="outlined"
            onChange={(e) => setPhoneOTP(e.target.value)}
            type="text"
            disabled ={verified}
        />
      </div>
      <br /><br />
      <div style={{textAlign:"center"}}>
        <Button disabled={verified || phoneOTP.length!=6 || emailOTP.length!=6} style={{width:"20vw",fontSize:"2vw"}} variant="success" onClick={ () => verify()}>
            {verified ? "Verified" : "Verify"}
        </Button>
      </div>
      <div style={{textAlign:"center"}}>
            {errorMessage.length!=0 &&
              <div style={{color:"red"}}>
                *{errorMessage}
              </div>
            }
            {(counter>0 && !verified) && <b>{counter} secs </b>}<br/>
          <div style={{color:(counter>0 || verified) ? "gray" : "" }}>Didn't recieve the OTP? <b onClick={clickHandler} style={{cursor:(counter>0 || verified) ? "": "pointer"  }}>Resend now</b></div>
      </div>
      <br /><br />
      <div style={{color:"red",textAlign:"center"}}>
        *By clicking accept, you are agreeing to our terms and conditions of privacy and content. 
      </div>
      </Modal.Body>
      <Modal.Footer>
            <Button disabled={!verified} variant="success" onClick={ () => props.signUp(props.municipalityCorp)}>
                Accept
            </Button>
            <Button  variant="danger" onClick={props.onHide}>
                Back
            </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ComplaintDetailsPopUp;