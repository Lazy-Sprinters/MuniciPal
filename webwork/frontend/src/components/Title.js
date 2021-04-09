import {React,Component} from 'react';
import { useHistory } from "react-router-dom";
import './Title.css';

export default function Title(){
    const history = useHistory();
    return(
        <>
            <div className="title-body">
            <div style={{cursor:"pointer"}} onClick={() => history.push('/')}>
            <img src='./images/Logo.png' style={{margin:"0 1vw",fontSize:"2vw"}}/>
            MuniciPal
            </div>
            </div>
        </>
    )
} 