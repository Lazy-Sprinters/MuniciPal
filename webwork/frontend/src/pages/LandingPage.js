import React from 'react';
import Title from '../components/Title';
import Footer from '../components/Footer';
import CopyrightBar from '../components/CopyrightBar';
import {Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

export default function LandingPage(){
    const history = useHistory();
    return(
        <>
            <Title />
            <div className="row">
                <div style={{zIndex:"0",background: "#2D7B90 0% 0% no-repeat ",width: "50vw",height: "50vw"}}>
                    <div style={{textAlign:"center",verticalAlign:"middle",padding:"5vw 0"}}><img src="./images/Land1.svg" style={{width:"70%",height:"70%"}}/></div>
                    <div className="row" >
                        <Button onClick={()=>  history.push('/signUpPage')} style={{background: "#5ACEB6 0% 0% no-repeat padding-box",borderRadius: "40px",border:"none",padding:"0.5vw 6vw",margin:"0 4.5vw",fontSize:"1.5vw"}}> Sign Up</Button>
                        <Button onClick={()=>  history.push('/loginPage')} style={{background: "#5ACEB6 0% 0% no-repeat padding-box",borderRadius: "40px",border:"none",padding:"0.5vw 6vw",margin:"0 4.5vw",fontSize:"1.5vw"}}> Login</Button>
                    </div>
                </div>
                <div style={{zIndex:"0",background: "#C0E1FA 0% 0% no-repeat ",width: "50vw",height: "50vw"}}>
                    <div style={{textAlign:"center",verticalAlign:"middle",padding:"5vw 0"}}><img src="./images/Land2.svg" style={{width:"75%",height:"75%"}}/></div>
                    <Button style={{background: "#5ACEB6 0% 0% no-repeat padding-box",borderRadius: "40px",border:"none",padding:"0.5vw 6vw",margin:"0 6vw",fontSize:"1.5vw"}}> Click here to download the Mobile App</Button>
                </div>
            </div>
            <br/>
            <br/>
            <Footer />
            <CopyrightBar />
        </>
    )
} 