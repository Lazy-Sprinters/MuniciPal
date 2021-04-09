import React from 'react';
import Title from '../components/Title';
import CopyrightBar from '../components/CopyrightBar';
import { useHistory } from "react-router-dom";
import SignUpForm from '../components/SignUpForm';
import TermsNCondPopUp from '../components/TermsNCondPopUp';
import Axios from 'axios';

export default function SignUpPage(){
    const history = useHistory();
    const  [showModal,setShowModal] = React.useState(false);
    const  [municipalityCorp,setMunicipalityCorp] = React.useState("");
    const [errorMessage,setErrorMessage] = React.useState("");
    
    const TermsNCond = (data) =>{
        setMunicipalityCorp(data);
        console.log(municipalityCorp);
        sendOTP(data);
    }
    const sendOTP = (data) =>{
        //API CALL for sending OTP 
        Axios.post("http://localhost:5000/user/sendotp",data)
        .then((res) => {
            if(res.data.success){
                console.log("Otp send to Email: ",data.email," and Phone Number: ",data.phoneNo);
                setShowModal(true);
            }
            else{
                console.log(res.data.message)
                setErrorMessage(res.data.message)
            }
        })
        .catch((err) => {
          console.log("Axios", err);
        });
    }
    const signUp = (municipalityCorp) =>{
        console.log("Signing Up")
        setShowModal(false);
        //API Call to sign up the user
        Axios.post("http://localhost:5000/user/register",municipalityCorp)
        .then((res) => {
           
            if(res.data.success){
                console.log("Proceeding To login page");
                /*On success ->*/ history.push('/loginPage');
            }
            else{
                console.log(res.data.message)
                setErrorMessage(res.data.message)
            }
        })
        .catch((err) => {
          console.log("Axios", err);
        });
    }
    return(
        <>
            {showModal && 
                <TermsNCondPopUp 
                    show={showModal}
                    municipalityCorp={municipalityCorp}
                    onHide={() => setShowModal(false)}
                    signUp={signUp}
                    size="md"
                    sendOTP={sendOTP}
                />
            }
            <Title />
            <div className="row">
                <div style={{zIndex:"0",background: "#2D7B90 0% 0% no-repeat ",width: "50vw",height: "54vw"}}>
                    <div style={{textAlign:"left",verticalAlign:"middle",padding:"7vw 4vw 5vw 0"}}><img src="./images/SignUp.svg" style={{width:"100%",height:"100%"}}/></div>
                </div>
                <div style={{zIndex:"0",background: "#C0E1FA 0% 0% no-repeat ",width: "50vw",height: "54vw"}}>
                    <SignUpForm TermsNCond={TermsNCond} errorMessage={errorMessage} /> 
                </div>
            </div>
            <CopyrightBar />
        </>
    )
} 