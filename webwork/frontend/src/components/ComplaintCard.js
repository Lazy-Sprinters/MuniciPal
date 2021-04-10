import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Card , CardHeader , CardContent , CardActions ,Avatar , Typography } from '@material-ui/core';
import { FormatListBulletedRounded} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '47%',
    borderRadius: '20px',
    background: '#C0E1FA 0% 0% no-repeat padding-box',
    color:'#2D7B90',
    font: 'Segoe UI'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor:'#5ACEB6',
    width:'4.5vw',
    height:'4.5vw',
  },
}));

export default function ComplaintCard({complaint,selectComplaint}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const previewComplaint = (complaint) =>{
    selectComplaint(complaint);
      //Open Modal ->> respective
      //Common Modal -> Before Pics || After Pics || Worker Name & PhoneNumber
      //> Active   : Before Pics || Reject with reason -> No worker has solved it yet
      //> Pending  : Common Modal -> waiting for approval of work
      //> Resolved : Common Modal -> for auditing only
  }
  
  const data = complaint;
  const cno = complaint.ComplaintNo;
  const date = complaint.ComplaintDate;
  const title = complaint.ComplaintTitle;
  const phoneNo = complaint.OwnerPhoneNo;
  const address = complaint.Address;
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <div style={{backgroundColor:"#2D7B90",borderRadius:"2px",width:"2.7vw",height:"2.7vw"}}>
                <FormatListBulletedRounded style={{color:"5ACEB6",fontSize:"2.7vw"}} />
            </div>
          </Avatar>
        }
        
        title={<b style={{fontSize:"2vw"}}>Complaint Number: {cno}</b>}
        subheader={<h6 style={{color:"#2D7B90",fontSize:"1.3vw"}}>{date}</h6>}
      />
      
      <CardContent style={{width:"100%",textAlign:"left",font: 'Segoe UI'}}>
        <Typography style={{fontSize:"1.5vw"}}>
          <b>Title:</b> {title}
        </Typography>
        <Typography style={{fontSize:"1.5vw"}}>
          <b>Complainant Phone Number:</b> {phoneNo}
        </Typography>
        <Typography style={{fontSize:"1.5vw"}}>
          <b>Address:</b> {address}
        </Typography>
        
      </CardContent>
      <div 
        onClick={() => {
            previewComplaint(data);
        }}
        style={{ 
            cursor:"pointer", 
            height:"3vw",
            padding:"0.3vw",
            fontSize:"1.5vw",
            textAlign:"center",
            background:"#5ACEB6 0% 0% no-repeat padding-box",
            color:"#FFFFFF"
        }}
        >
        Preview
      </div>
    </Card>
  );
}