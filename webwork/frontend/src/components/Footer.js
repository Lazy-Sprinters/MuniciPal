import {React,Component} from 'react';
import Twitter from '@material-ui/icons/Twitter';
import Mail from '@material-ui/icons/Mail';
import LinkedIn from '@material-ui/icons/LinkedIn';

export default function Footer(){
    return(
        <>
            <div className="row">
                <div style={{zIndex:"0",background: "#2D7B90 0% 0% no-repeat ",width: "50vw",height: "30vw"}}>
                    <div style={{textAlign: "left",letterSpacing: "0px",color: "#C0E1FA",opacity: "1",padding:"4vw 8vw"}}>
                        <span style={{font: "normal normal bold 3vw/4vw Segoe UI"}}>Contact Us</span>
                        <br/>
                        <br/>
                        <div style={{font: "normal normal normal 2vw/3vw Segoe UI",margin:"1vw 0"}}> 
                            MuniciPal Headquarters, City
                            <br/>
                        </div>
                        <div style={{font: "normal normal normal 2vw/3vw Segoe UI",margin:"1vw 0"}}> 
                            Building Number, Street Name,
                            <br/>
                        </div>
                        <div style={{font: "normal normal normal 2vw/3vw Segoe UI",margin:"1vw 0"}}> 
                            Locality, City
                            <br/>
                        </div>
                        <div style={{font: "normal normal normal 2vw/3vw Segoe UI",margin:"1vw 0"}}> 
                            Pincode
                        </div>
                    </div>
                </div>
                <div style={{zIndex:"0",background: "#C0E1FA 0% 0% no-repeat ",width: "50vw",height: "30vw"}}>
                    <div style={{textAlign: "left",letterSpacing: "0px",color: "#2D7B90",opacity: "1",padding:"4vw 8vw"}}>
                        <span style={{font: "normal normal normal 2vw/3vw Segoe UI"}}>Follow Us</span>
                        {/* <br /><br /><br /> */}
                        <div className="row1" style={{margin:"4vw 0"}}>
                            <Twitter style={{fontSize:"3vw",margin:"0 1vw 0 1vw",cursor:"pointer"}}/>
                            <LinkedIn style={{fontSize:"3vw",margin:"0 0 0 1vw",cursor:"pointer"}} onClick={()=> window.location="https://www.linkedin.com/in/anuraj-agarwal-48bb6218b/" }/>
                        </div>
                        {/* <br /><br /> */}
                        <span style={{font: "normal normal normal 2vw/3vw Segoe UI"}}>Any Queries</span>
                        <br /><br />
                        <div className="row1" style={{cursor:"pointer"}}onClick={()=> window.location="mailto:anuraj.agarwal@vitstudent.ac.in" }>
                            <Mail style={{fontSize:"3vw",margin:"0 1vw 0 0"}}/>
                            <div style={{margin:"0 0.5vw",font: "normal normal normal 1.7vw/2vw Segoe UI"}} >anuraj.agarwal2019@vitstudent.ac.in</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 