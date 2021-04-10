import {Button,Modal} from 'react-bootstrap';
import React from 'react';
import {
  TextField,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
function WorkerDetailsPopUp(props) {
  const [name,setName]=React.useState("");
  const [image,setImage]=React.useState("");
  const [imageType,setImageType]=React.useState("");
  const [phoneNo,setPhoneNo]=React.useState("");
  const [address,setAddress]=React.useState("");
  const [newWorker,setNewWorker]=React.useState("");

  const handleBase64 = (e) =>{
    let binaryString = e.target.result;
    setImage(btoa(binaryString));
  };

  const uploadImage = (e) => {
    setImageType(e.target.files[0].type);
    const reader=new FileReader();
  	reader.onload=handleBase64.bind(this);
  	reader.readAsBinaryString(e.target.files[0]);
  };
  
  const sendWorkerDetails = () =>{
    let curr={Name:name,Image:image,PhoneNo:phoneNo,Address:address,imageType:imageType};
    setNewWorker(curr);
    props.onAdd(curr);
  }

  if(props.worker==0){
    return(
      <Modal
      show={props.show} 
      onHide={props.onHide}
      backdrop="static"
      size={props.size}
      centered
    >
      <Modal.Header closeButton>
      <Modal.Title>
          Fill New Worker Details
      </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div >
        <TextField
          placeholder="Worker's Name"
          label="Worker's Name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
          type="text"
          fullWidth
        />
        <br />        <br />
        <TextField
          placeholder="Worker's Address"
          label="Worker's Address"
          variant="outlined"
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          fullWidth
        />
        <br />        <br />
        <TextField
          placeholder="Worker's Phone Number"
          label="Worker's Phone Number"
          variant="outlined"
          onChange={(e) => setPhoneNo(e.target.value)}
          type="text"
          fullWidth
        />
        <br />        <br />
        <FormLabel component="legend">Profile Image</FormLabel>
        <TextField
          placeholder="Worker's Profile Image"
          variant="outlined"
          onChange={(e) => uploadImage(e)}
          type="file"
          fullWidth
        />
      </div>
      </Modal.Body>
      <Modal.Footer>
            <Button  variant="success" onClick={ () => sendWorkerDetails()}>
                Add Worker
            </Button>
            <Button  variant="danger" onClick={props.onHide}>
                Cancel
            </Button>
      </Modal.Footer>
    </Modal>
    );
  }
    const worker=props.worker;
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
          Worker Details
      </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div style={{textAlign:"center"}}>
        <h2>{worker.Name}</h2>
            <div className="row1">
                <div style={{width:"50vw",height:"20vw"}}>
                    <img style={{width:"20vw",height:"20vw"}} src={worker.Image} />
                </div>
                <div style={{width:"100%",fontSize:"1.5vw"}}>
                    <b>Phone Number:</b> {worker.PhoneNo}
                    <br/>
                    <b>Address: </b> {worker.Address}
                </div>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
            <Button  variant="danger" onClick={ () => props.onDelete(worker)}>
                Delete Worker
            </Button>
            <Button  variant="success" onClick={props.onHide}>
                Close
            </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default WorkerDetailsPopUp;