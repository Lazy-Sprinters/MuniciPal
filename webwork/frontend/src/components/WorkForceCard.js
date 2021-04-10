import {React,Component} from 'react';
import PersonAddTwoTone from '@material-ui/icons/PersonAddTwoTone';
// import './WorkForceCard.css';

export default function WorkForceCard({data,selectWorker,img,name}){
    if(data==0){
        return(
            <div onClick={() => selectWorker()} style={{cursor:"pointer",}}className="row1">
            <div style={{margin:"2vw 3vw",width:"8vw",height:"8vw",border: "1px solid #707070",backgroundColor:"gray",borderRadius:"30px",verticalAlign:"middle",textAlign:"center"}}><PersonAddTwoTone style={{fontSize:"7.5vw"}}/></div>
            <div style={{verticalAlign:"middle",margin:"4vw 5vw 4vw 0", fontSize:"2.5vw",color: "gray"}}>ADD WORKER</div>
            </div>
        )
    }
    return(
        <>
            <div onClick={() => selectWorker(data)} style={{cursor:"pointer"}}className="row1">
            <div style={{margin:"2vw 3vw",width:"8vw",height:"8vw",border: "1px solid #707070"}}><img style={{width:"100%",height:"100%"}}src={img}/></div>
            <div style={{verticalAlign:"middle",margin:"4vw 5vw 4vw 0", fontSize:"2vw",color: "#2D7B90"}}>{name}</div>
            </div>
        </>
    )
} 