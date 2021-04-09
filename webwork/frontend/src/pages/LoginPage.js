import {React,Component} from 'react';
import Title from '../components/Title';
import CopyrightBar from '../components/CopyrightBar';
import { useHistory } from "react-router-dom";
import LoginForm from '../components/LoginForm';
export default function LoginPage(){
    const history = useHistory();
    return(
        <>
            <Title />
            <div className="row">
                <div style={{zIndex:"0",background: "#2D7B90 0% 0% no-repeat ",width: "50vw",height: "47vw"}}>
                    <div style={{textAlign:"left",verticalAlign:"middle",padding:"5vw 2vw 5vw 4vw"}}><img src="./images/Login.svg" style={{width:"80%",height:"80%"}}/></div>
                </div>
                <div style={{zIndex:"0",background: "#C0E1FA 0% 0% no-repeat ",width: "50vw",height: "47vw"}}>
                    <LoginForm />
                </div>
            </div>
            <CopyrightBar />
        </>
    )
} 