import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import CopyrightBar from '../components/CopyrightBar';
import ComplaintCard from '../components/ComplaintCard';
import ComplaintDetailsPopUp from '../components/ComplaintDetailsPopUp';
import Axios from 'axios';
import * as actionTypes from '../actions/actions';
import { useDispatch , useSelector } from 'react-redux';
import { ContactlessOutlined } from '@material-ui/icons';

export default function ActiveComplaintsPage(){
    const [initial,setInitial] = React.useState(true);
    const [complaints,setComplaints] = React.useState(true);
    const [complaintSelected,setComplaintSelected] = React.useState(false);
    const [currentComplaint,setCurrentComplaint] = React.useState("");
    const user = useSelector(state => state.user);
    const [complaintsData,setComplaintsData]=React.useState("");

    const displayComplaints = () =>{
        setInitial(false);
        const complaints=[];
        //API Call to get Active Complaints
        Axios.post("http://localhost:5000/complaint/active",user)
        .then((res) => {
            console.log(res.data);
            if(res.data.success){
                setComplaintsData(res.data.response);
                const x = res.data.response;
                if(x==undefined || x==null || x.length==0){
                    complaints.push(
                        <div style={{textAlign:"center",fontSize:"3vw",margin:"16vw 0"}} >
                        No Active Complaints Yet
                        </div>
                    )
                }
                // const x = Object.values(complaintsData);
                for(let i=0;i<x.length;i+=2){
                    if(x.length%2!=0 && i==x.length-1){
                        complaints.push(
                            <div style={{justifyContent: "space-between",padding:"2vw 0"}} className="row1" >
                            <ComplaintCard selectComplaint = {selectComplaint} complaint = {x[i]} />
                            </div>
                        )
                    }
                    else{
                        complaints.push(
                            <div style={{justifyContent: "space-between",padding:"2vw 0"}} className="row1" >
                            <ComplaintCard selectComplaint = {selectComplaint} complaint = {x[i]} />
                            <ComplaintCard selectComplaint = {selectComplaint} complaint = {x[i+1]} />
                            </div>
                        )
                    }

                }
                setComplaints(complaints)
            }
            else{
                console.log(res.data.message)
            }
        })
        .catch((err) => {
            console.log("Axios", err.response.data);
        });
    };
    
    const selectComplaint = (complaint) =>{
        setCurrentComplaint(complaint);
        setComplaintSelected(true);
    };

    const rejectComplaint = (complaint,reason) =>{
        const req={user:user,complaint:complaint,reason:reason}
        //API Call for rejecting a complaint with a reason
        Axios.post("http://localhost:5000/complaint/reject",req)
        .then((res) => {
            if(res.data.success){
                console.log("The Complaint Number",complaint.ComplaintNo,"has been rejected with reason",reason);
                setComplaintSelected(false);
                displayComplaints();
            }
            else{
                console.log(res.data.message)
            }
        })
        .catch((err) => {
          console.log("Axios", err.response.data);
        });
        
    }

    const resolveComplaint = (complaint,image,imageType) =>{
        const req={user:user,complaint:complaint,image:image,imageType:imageType}
        console.log(req)
        //API Call for rejecting a complaint with a reason
        Axios.post("http://localhost:5000/complaint/resolve",req)
        .then((res) => {
            if(res.data.success){
                setComplaintSelected(false);
                console.log("The Complaint Number",complaint.ComplaintNo,"has been rejected ");
                displayComplaints();
            }
            else{
                console.log(res.data.message)
            }
        })
        .catch((err) => {
          console.log("Axios", err.response.data);
        });
    }

    useEffect (
        () => {
            initial && displayComplaints(); 
        }
    );

    return(
        <>
            {complaintSelected && 
                <ComplaintDetailsPopUp 
                    show={complaintSelected}
                    complaint={currentComplaint}
                    onHide={() => setComplaintSelected(false)}
                    onReject={rejectComplaint}
                    onResolve={resolveComplaint}
                    rejectFlag={true}
                    size="lg"
                />
            }
            <Navbar />
            <div style={{background: "#2D7B90 0% 0% no-repeat padding-box",padding:"2vw 5vw"}}>
                {complaints}
            </div>
            <CopyrightBar />
        </>
    )
} 