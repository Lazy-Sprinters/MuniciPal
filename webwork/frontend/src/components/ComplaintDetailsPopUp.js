import {Button,Modal} from 'react-bootstrap';
import React, { useEffect } from 'react';
import {
  TextField,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import './ComplaintDetailsPopUp.css';
import { SentimentSatisfiedAltTwoTone } from '@material-ui/icons';

function ComplaintDetailsPopUp(props) {
  const [giveReason,setGiveReason]=React.useState(false);
  const [resolve,setResolve]=React.useState(false);
  const [initial,setInitial]=React.useState(true);
  const [reason,setReason] =React.useState("");
  const [image,setImage] =React.useState("");
  const [imageType,setImageType] =React.useState("");
  const [size1,setSize1] =React.useState(0);
  const [size2,setSize2] =React.useState(0);
  const [problemImageData,setProblemImageData] = React.useState("");
  const [solutionImageData,setSolutionImageData] = React.useState("");
  
  const complaint=props.complaint;

  const handleBase64 = (e) =>{
    let binaryString = e.target.result;
    setImage(btoa(binaryString));console.log(image)

  };

  const uploadImage = (e) => {
    setImageType(e.target.files[0].type);
    const reader=new FileReader();
  	reader.onload=handleBase64.bind(this);
  	reader.readAsBinaryString(e.target.files[0]);
  };

  const displayImages = () =>{
    setInitial(false);
    let x=complaint.Before.length;
    setSize1(x);
    let y=complaint.After.length;
    setSize2(y);
    if(x>0){
      const data1=[];
      complaint.Before.map((value) => {
        data1.push(
          <img className="complaint-img" src={value} />
        )
      })
      setProblemImageData(data1);
    }
    if(y>0){
      const data2=[];
      complaint.After.map((value) => {
        data2.push(
          <img className="complaint-img" src={value} />
        )
      })
      setSolutionImageData(data2);
    }

  } 
  const rejectComplaint = () => {
    setGiveReason(true);
  };
  const resolveComplaint = () => {
    setResolve(true);
  };

  useEffect (
    () => {
      initial && displayImages();
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
          Complaint Details
      </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div style={{textAlign:"center"}}>
        <h3>{complaint.ComplaintTitle}</h3>
            <div >
                <div style={{width:"100%",fontSize:"1.5vw",textAlign:"left"}}>
                    <b>Complainant Phone Number:</b> {complaint.OwnerPhoneNo}
                    <br/>
                    <b>Complaint Date: </b> {complaint.ComplaintDate}
                    <br/>
                    <b>Complaint Address: </b> {complaint.Address}
                    <br/>
                  </div>
                  <div style={{textAlign:"left",fontSize:"1.5vw"}}>
                    <b>Problem:</b>
                    <div className="gallery" style={{width:"8vw",gridTemplateColumns: 'repeat('+size1+', 7vw)',gridTemplateRows: "25vh"}}>
                     {problemImageData}
                    </div>
                  </div>
                  <br />
                  <br />
                  {!props.rejectFlag &&
                    <>
                      <div style={{textAlign:"left",fontSize:"1.5vw"}}>
                        <b>Solution:</b>
                        <div className="gallery" style={{width:"8vw",gridTemplateColumns: 'repeat('+size2+', 7vw)',gridTemplateRows: "25vh"}} >
                        {solutionImageData} 
                        </div>
                      </div>
                      {false && 
                      <div style={{width:"100%",fontSize:"1.3vw",textAlign:"right"}}>
                        Problem fixed By:
                        <br/>
                        <b>Worker Name: </b> {complaint.WorkerWhoFixed.Name}
                        <br/>
                        <b>Contact Details: </b> {complaint.WorkerWhoFixed.PhoneNo}
                      </div>
                      }
                </>
                }
                {giveReason &&
                  <div>
                  <br />
                  <TextField
                    style={{width:"56vw"}}
                    placeholder="Reason For Rejection"
                    label="Reason For Rejection"
                    variant="outlined"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    type="text"
                    fullWidth
                  />
                  <br />
                  </div>
                }
                {resolve &&
                  <div>
                  <br />
                  <FormLabel component="legend">
                    Solution Image
                  </FormLabel>
                  <TextField
                  style={{width:"56vw"}}
                    placeholder="Reason For Rejection"
                    variant="outlined"
                    onChange={(e) => uploadImage(e)}
S                    type="file"
                    fullWidth
                  />
                  <br />
                  </div>
                }
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
            {props.rejectFlag && 
            <>
            {resolve 
            ?
              <Button  variant="success" onClick={ () => props.onResolve(complaint,image,imageType)}>
                Upload Image
              </Button>
            :
              <Button  variant="success" onClick={ () => resolveComplaint()}>
                Resolve Complaint
              </Button>
            }
            {giveReason 
            ?
              <Button  variant="danger" onClick={ () => props.onReject(complaint,reason)}>
                Confirm Rejection of Complaint
              </Button>
            :
              <Button  variant="danger" onClick={ () => rejectComplaint()}>
                Reject Complaint
              </Button>
            }
            </>
            }
            <Button  variant="primary" onClick={props.onHide}>
              Back
            </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ComplaintDetailsPopUp;