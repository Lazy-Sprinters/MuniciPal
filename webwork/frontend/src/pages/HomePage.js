import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import CopyrightBar from '../components/CopyrightBar';
import {Button} from 'react-bootstrap';
import CountUp from 'react-countup';
import '../pages_css/HomePage.css';
import WorkForceCard from '../components/WorkForceCard';
import WorkerDetailsPopUp from '../components/WorkerDetailsPopUp';
import Axios from 'axios';
import * as actionTypes from '../actions/actions';
import { useDispatch , useSelector } from 'react-redux';

export default function HomePage(){
    const [initial,setInitial] = React.useState(true);  // API Call to get the numbers 
    const [active,setActive] = React.useState(23130);  // API Call to get the numbers 
    const [pending,setPending] = React.useState(3022);
    const [resolved,setResolved] = React.useState(20108);
    const [WorkForce,setWorkForce] = React.useState(20108);
    const [animate,setAnimate]=React.useState(0);
    const [appear,setAppear]=React.useState(false);
    const [workerSelected,setWorkerSelected]=React.useState(false);
    const [workerDetails,setWorkerDetails]=React.useState({});
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const active1 = useSelector(state => state.active);
    const pending1 = useSelector(state => state.pending);
    const resolved1 = useSelector(state => state.resolved);

    
    const [WorkForceData,setWorkForceData]= React.useState("")
    // ({
    //     worker1:{
    //         Image:"https://picsum.photos/200",
    //         Name:"Devyn Kuhic I",
    //         PhoneNo:1234567890,
    //         Address:"Somewhere in NeverLand"
    //     },
    //     worker2:{
    //         Image:"https://picsum.photos/200",
    //         Name:"Halle Purdy PhD",
    //         PhoneNo:1234567890,
    //         Address:"Somewhere in NeverLand"
        
    //     },
    //     worker3:{
    //         Image:"https://picsum.photos/200",
    //         Name:"Gwendolyn Bins",
    //         PhoneNo:1234567890,
    //         Address:"Somewhere in NeverLand"
        
    //     },
    //     worker4:{
    //         Image:"https://picsum.photos/200",
    //         Name:"Napoleon Becler",
    //         PhoneNo:1234567890,
    //         Address:"Somewhere in NeverLand"
        
    //     },
    //     worker5:{
    //         Image:"https://picsum.photos/200",
    //         Name:"Dennis Hahn III",
    //         PhoneNo:1234567890,
    //         Address:"Somewhere in NeverLand"
        
    //     },
    //     worker6:{
    //         Image:"https://picsum.photos/200",
    //         Name:"Keaton Daugher",
    //         PhoneNo:1234567890,
    //         Address:"Somewhere in NeverLand"
        
    //     },
    //     worker7:{
    //         Image:"https://picsum.photos/200",
    //         Name:"Verlie Smith",
    //         PhoneNo:1234567890,
    //         Address:"Somewhere in NeverLand"
        
    //     },
    //     worker8:{
    //         Image:"https://picsum.photos/200",
    //         Name:"Napoleon Becler",
    //         PhoneNo:1234567890,
    //         Address:"Somewhere in NeverLand"
        
    //     }
    // });
    const selectWorker = (worker) =>{
        const currentWorker={Name:worker.Name,Image:worker.Image,PhoneNo:worker.PhoneNo,Address:worker.Address,id:worker.id}
        setWorkerDetails(currentWorker);
        setWorkerSelected(true);
    };
    const addNewWorker = () =>{
        // Add worker Modal
        setWorkerDetails(0);
        setWorkerSelected(true);
    }
    const displayWorkForce = () =>{
        const workers=[];
        //API Call to get the workforce data;
        console.log("yahan aaya")
        Axios.post("http://localhost:5000/worker/all",user)
        .then((res) => {
            // console.log(res.data)
            if(res.data.success){
                setWorkForceData(res.data.response);
            }
            else{
                console.log(res.data.message)
            }
            const x = res.data.response;
            console.log(x);
            if(x==undefined || x==null || x.length==0 ){
                workers.push(
                    <div style={{justifyContent: 'space-between',padding:"0 2vw"}} className="row1" >
                        <WorkForceCard data={0} selectWorker={addNewWorker} img={null} name={null} />
                    </div>
                )
            }
            else{
                for(let i=0;i<x.length;i+=2){
                    if(x.length%2!=0 && i==x.length-1){
                        workers.push(
                            <div style={{justifyContent: 'space-between',padding:"0 2vw"}} className="row1" >
                                <WorkForceCard data={x[i]} selectWorker={selectWorker} img={x[i].Image} name={x[i].Name} />
                                <WorkForceCard data={0} selectWorker={addNewWorker} img={null} name={null} />
                            </div>
                        )
                    }
                    else if(x.length%2==0 && i==x.length-2){
                        workers.push(
                            <div style={{justifyContent: 'space-between',padding:"0 2vw"}} className="row1" >
                                <WorkForceCard data={x[i]} selectWorker={selectWorker} img={x[i].Image} name={x[i].Name} />
                                <WorkForceCard data={x[i+1]} selectWorker={selectWorker} img={x[i+1].Image} name={x[i+1].Name}/>
                            </div>
                        )
                        workers.push(
                            <div style={{justifyContent: 'space-between',padding:"0 2vw"}} className="row1" >
                                <WorkForceCard data={0} selectWorker={addNewWorker} img={null} name={null} />
                            </div>
                        )
                    }
                    else{
                        workers.push(
                            <div style={{justifyContent: 'space-between',padding:"0 2vw"}} className="row1" >
                                <WorkForceCard data={x[i]} selectWorker={selectWorker} img={x[i].Image} name={x[i].Name} />
                                <WorkForceCard data={x[i+1]} selectWorker={selectWorker} img={x[i+1].Image} name={x[i+1].Name}/>
                            </div>
                        )
                    }
                }
            }
            setWorkForce(workers)
        })
        .catch((err) => {
          console.log("Axios", err.response.data);
        });
		// const x = Object.values(WorkForceData);
		
        
    };
    const startAnimating = () =>{
        displayWorkForce();
        setAnimate(1);
        setAppear(true);
    }
    const deleteWorker = (worker) => {
        //API Call to delete the worker
        const data={worker:worker,user:user}
        Axios.post("http://localhost:5000/worker/delete",data)
        .then((res) => {
            console.log(res.data);
            if(res.data.success){
                setWorkerSelected(false);                   
                displayWorkForce(); 
                console.log("The",worker.Name ,"is deleted");
            }
            else{
                console.log(res.data.message)
            }
        })
        .catch((err) => {
          console.log("Axios", err.response.data);
        });
        
    };
    const addWorker = (worker) =>{
        //API Call to add the worker
        const data={worker:worker,user:user}
        Axios.post("http://localhost:5000/worker/add",data)
        .then((res) => {
            console.log(res.data);
            if(res.data.success){
                setWorkerSelected(false);
                displayWorkForce();
                console.log("The",worker.Name ,"is added");
            }
            else{
                console.log(res.data.message)
            }
        })
        .catch((err) => {
          console.log("Axios", err.response.data);
        });
        
    };
    const getCount = () =>{
        setInitial(false);
        Axios.post("http://localhost:5000/user/count",user)
        .then((res) => {
            console.log(res.data)
            if(res.data.success){
                dispatch({type:actionTypes.CHANGE_ACTIVE , active:res.data.response.active});
                dispatch({type:actionTypes.CHANGE_PENDING , active:res.data.response.pending});
                dispatch({type:actionTypes.CHANGE_RESOLVED , active:res.data.response.resolved});
                setActive(res.data.response.active);
                setPending(res.data.response.pending);
                setResolved(res.data.response.resolved);
            }
            else{
                console.log(res.data.message)
            }
        })
        .catch((err) => {
          console.log("Axios", err.response.data);
        });
    };
    useEffect (
        ()=>{
            setActive(active1);
            setPending(pending1);
            setResolved(resolved1);
            initial && getCount();
        }
    )
    return(
        <>
            <WorkerDetailsPopUp
                show={workerSelected}
                worker={workerDetails}
                onHide={() => setWorkerSelected(false)}
                onDelete={deleteWorker}
                onAdd={addWorker}
                size="md"

            />
            <Navbar />
            <div animate={animate} className="ColoredSection1"></div>
            <div  animate={animate} className="CountSection" >
                <div animate={animate} className="CountUp" ><CountUp end={active} duration={5} /><br /><h2 animate={animate} className="Headings" >Active</h2></div>
                <div animate={animate} className="CountUp" ><CountUp end={pending} duration={5} /><br /><h2 animate={animate} className="Headings" >Pending</h2></div>
                <div animate={animate} className="CountUp" ><CountUp end={resolved} duration={5} /><br /><h2 animate={animate} className="Headings" >Resolved</h2></div>
            </div>
            {!appear && 
                <div style={{position:"absolute",top:"80vh",textAlign:"center"}}>
                    <Button onClick={()=> startAnimating()} style={{background: "#5ACEB6 0% 0% no-repeat padding-box",borderRadius: "40px",border:"none",padding:"0.5vw 5vw",margin:"0 39vw",fontSize:"1.5vw"}}> Your Workforce</Button>
                </div>
            }
            <div animate={animate} className="ColoredSection2" ></div>
            {appear &&
                <div style={{background: "#C0E1FA 0% 0% no-repeat padding-box"}}>
                    <div style={{ padding: "1vw 3vw", textAlign: "left",font: "normal normal 600 2vw/3vw Segoe UI",letterSpacing: "0px",color: "#2D7B90" }}>Workers</div>
                    <br/>
                    <div>{WorkForce}</div>
                </div>
            }
            <CopyrightBar />
        </>
    )
} 