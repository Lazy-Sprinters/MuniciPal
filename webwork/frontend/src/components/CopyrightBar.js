import {React,Component} from 'react';
import Copyright from '@material-ui/icons/Copyright';
import './CopyrightBar.css';

export default function CopyrightBar(){
    return(
        <>
            <div className="copyright-body">
            <Copyright style={{width: "2.5vw",height: "2.5vw",margin:"0 1vw 0.3vw 0"}}/>
            2021, Municipality Corporation. All rights reserved.
            </div>
        </>
    )
} 