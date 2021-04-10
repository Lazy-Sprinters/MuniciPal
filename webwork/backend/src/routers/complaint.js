const express = require("express");
const router = new express.Router();
const path = require("path");
const db = require("../dbconfig/firebase");
const fs=require('fs');
const bucket=require('../dbconfig/storage');

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const GetOtp = () => {
  let val = Math.floor(Math.random() * 1000000);
  if (val.toString().length == 5) {
    val *= 10;
  }
  return val;
};

router.post('/active',async(req,res)=>{
      try{
            const allcomplaints=await db.collection("Complaints").where("key_mun",'==',req.body.key).get();
            if (allcomplaints.empty)
            {     
                  res.send({
                              success: true,
                              code: 200,
                              message: "No Complaints found",
                              response: null,
                  });
            }else{      
                  let ret=[];
                  let data=[];
                  allcomplaints.forEach(ele=>{
                        data.push({meta:ele.data(),id:ele.id});
                  })
                  for(let i=0;i<data.length;i++){
                        const curr=data[i].meta;
                        const imagekey=curr.owner+curr.currcomp;
                        const ref=await db.collection("ComplaintImg").doc(imagekey).get();
                        const flag=GetOtp();
                        if (ref.data().type==null || ref.data().type=="base64")
                        {
                              const type="jpeg";
                              fs.writeFileSync(
                                    path.resolve(__dirname, "../public/" + flag + "." + type),
                                    ref.data().img,
                                    "base64"
                              );
                              const options = {
                                    version: "v4",
                                    action: "read",
                                    expires: Date.now() + 10005 * 60 * 1000, // 10005 minutes
                              };
                              const updpic = new Uint8Array(
                              fs.readFileSync(path.resolve(__dirname, "../public/" + flag + "." + type))
                              );
                              const file1 = bucket.file(`ComplaintPic/${flag}`);
                              await file1.save(updpic, {
                              resumable: false,
                              metadata: { contentType: "image/" + type },
                              });
                              const url = await file1.getSignedUrl(options);
                              const updref=await db.collection("ComplaintImg").doc(imagekey).update({img:url[0],type:"url"});
                        }
                  }
                  // console.log(data);
                  // console.log("hello");
                  for(let i=0;i<data.length;i++){
                        const curr=data[i].meta
                        if (curr.Active==true){
                              const imagekey=curr.owner+curr.currcomp;
                              const ref=await db.collection("ComplaintImg").doc(imagekey).get();
                              // console.log(ref.data().img);
                              let arr1=[];
                              arr1.push(ref.data().img);
                              ret.push({
                                    OwnerPhoneNo:curr.owner,
                                    ComplaintNo:imagekey,
                                    ComplaintTitle:curr.complain_title,
                                    Address:curr.address,
                                    Before:arr1,
                                    After:[],
                                    ComplaintDate:null,
                                    id:data[i].id
                              })
                        }
                  }
                  console.log(ret);
                  res.send({
                        success: true,
                        code: 200,
                        message: "Complaints",
                        response: ret,
                  });
            }     
      }catch(err){
            console.log(err);
            res.send({
                  success: false,
                  code: 400,
                  message: "Some error occured",
                  response: null,
            });
      } 
})


router.post('/reject',async(req,res)=>{
      try{
            console.log(req.body);
            const idtobedeleted=req.body.complaint.id
            const batch=db.batch();
            const delref=db.collection("Complaints").doc(idtobedeleted);
            const newref=db.collection("RejComplaints").doc(idtobedeleted);
            const o1={
                  OwnerPhoneNo:req.body.complaint.OwnerPhoneNo,
                  ComplaintTitle:req.body.complaint.ComplaintTitle,
                  Address:req.body.complaint.Address,
                  id:req.body.complaint.id,
                  message:req.body.reason,
                  ComplaintDate:null,
            }
            batch.delete(delref);
            batch.set(newref,o1)

            await batch.commit();
            res.send({
                  success: true,
                  code: 200,
                  message: "Successfully deleted!",
                  response: null,
            })

      }catch(err){
            console.log(err);
            res.send({
                  success: false,
                  code: 400,
                  message: "Some error occured",
                  response: null,
            });

      }
})

router.post('/resolve',async(req,res)=>{
      try{
            console.log(req.body.complaint);
            const id=req.body.complaint.id
            
            const docref=await db.collection("Complaints").doc(id).get()
            const type="jpeg";
            const flag=GetOtp()
            fs.writeFileSync(
                  path.resolve(__dirname, "../public/" + flag + "." + type),
                  req.body.image,
                  "base64"
            );
            const options = {
                  version: "v4",
                  action: "read",
                  expires: Date.now() + 10005 * 60 * 1000, // 10005 minutes
            };
            const updpic = new Uint8Array(
            fs.readFileSync(path.resolve(__dirname, "../public/" + flag + "." + type))
            );
            const file1 = bucket.file(`ComplaintPic/${flag}`);
            await file1.save(updpic, {
            resumable: false,
            metadata: { contentType: "image/" + type },
            });
            const url = await file1.getSignedUrl(options);
            const newcompimgid="R"+docref.data().owner+docref.data().currcomp
            const doccc={
                  after:true,
                  before:false,
                  img:url[0],
                  muni_key:docref.data().key_mun,
                  owner:docref.data().owner,
                  type:"url"
            }
            const batch=db.batch();
            const delref=db.collection("Complaints").doc(id);
            const ref2=db.collection("ComplaintImg").doc(newcompimgid)

            batch.update(delref,{Active:false,Pending:true});
            batch.set(ref2,doccc)

            await batch.commit();
            res.send({
                  success: true,
                  code: 200,
                  message: "Successfully Modified!",
                  response: null,
            })

      }catch(err){
            console.log(err);
            res.send({
                  success: false,
                  code: 400,
                  message: "Some error occured",
                  response: null,
            });

      }
})

router.post('/pending',async(req,res)=>{
      try{
            const allcomplaints=await db.collection("Complaints").where("key_mun",'==',req.body.key).get();
            if (allcomplaints.empty)
            {     
                  res.send({
                              success: true,
                              code: 200,
                              message: "No Complaints found",
                              response: null,
                  });
            }else{      
                  let ret=[];
                  let data=[];
                  allcomplaints.forEach(ele=>{
                        data.push({meta:ele.data(),id:ele.id});
                  })
                  for(let i=0;i<data.length;i++){
                        const curr=data[i].meta
                        if (curr.Pending==true){
                              const imagekey=curr.owner+curr.currcomp;
                              console.log(imagekey);
                              const ref=await db.collection("ComplaintImg").doc(imagekey).get();
                              const ref1=await db.collection("ComplaintImg").doc("R"+imagekey).get();
                              console.log(ref1.data());
                              let arr1=[];
                              arr1.push(ref.data().img);
                              let arr2=[];
                              arr2.push(ref1.data().img);
                              ret.push({
                                    OwnerPhoneNo:curr.owner,
                                    ComplaintNo:imagekey,
                                    ComplaintTitle:curr.complain_title,
                                    Address:curr.address,
                                    Before:arr1,
                                    After:arr2,
                                    ComplaintDate:null,
                                    id:data[i].id
                              })
                        }
                  }
                  console.log(ret);
                  res.send({
                        success: true,
                        code: 200,
                        message: "Complaints",
                        response: ret,
                  });
            }     
      }catch(err){
            console.log(err);
            res.send({
                  success: false,
                  code: 400,
                  message: "Some error occured",
                  response: null,
            });
      } 
})

router.post('/resolved',async(req,res)=>{
      try{
            const allcomplaints=await db.collection("Complaints").where("key_mun",'==',req.body.key).get();
            if (allcomplaints.empty)
            {     
                  res.send({
                              success: true,
                              code: 200,
                              message: "No Complaints found",
                              response: null,
                  });
            }else{      
                  let ret=[];
                  let data=[];
                  allcomplaints.forEach(ele=>{
                        data.push({meta:ele.data(),id:ele.id});
                  })
                  for(let i=0;i<data.length;i++){
                        const curr=data[i].meta
                        if (curr.Resolved==true){
                              const imagekey=curr.owner+curr.currcomp;
                              console.log(imagekey);
                              const ref=await db.collection("ComplaintImg").doc(imagekey).get();
                              const ref1=await db.collection("ComplaintImg").doc("R"+imagekey).get();
                              console.log(ref1.data());
                              let arr1=[];
                              arr1.push(ref.data().img);
                              let arr2=[];
                              arr2.push(ref1.data().img);
                              ret.push({
                                    OwnerPhoneNo:curr.owner,
                                    ComplaintNo:imagekey,
                                    ComplaintTitle:curr.complain_title,
                                    Address:curr.address,
                                    Before:arr1,
                                    After:arr2,
                                    ComplaintDate:null,
                                    id:data[i].id
                              })
                        }
                  }
                  console.log(ret);
                  res.send({
                        success: true,
                        code: 200,
                        message: "Complaints",
                        response: ret,
                  });
            }     
      }catch(err){
            console.log(err);
            res.send({
                  success: false,
                  code: 400,
                  message: "Some error occured",
                  response: null,
            });
      } 
})


module.exports=router