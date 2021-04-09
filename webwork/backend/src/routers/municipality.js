const express = require("express");
const router = new express.Router();
const Vonage = require("@vonage/server-sdk");
const nodemailer = require("nodemailer");
const axios = require("axios").default;
const path = require("path");
const bcrypt = require("bcryptjs");
const db = require("../dbconfig/firebase");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const GetOtp = () => {
  let val = Math.floor(Math.random() * 1000000);
  if (val.toString().length == 5) {
    val *= 10;
  }
  return val;
};

//Setting up functionality for message-based authentication
const vonage = new Vonage({
  apiKey: process.env.VKEY,
  apiSecret: process.env.SECRET,
});

//Setting up functionality for email-based authentication
const transporter = nodemailer.createTransport({
  service: process.env.SECRET,
  auth: {
    user: process.env.TEST_MAIL,
    pass: process.env.TEST_PASS,
  },
});

router.post("/sendotp", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const otp1 = GetOtp();
    const otp2 = GetOtp();
    const obj = {
      useremail: data.email,
      userphno: data.phoneNo,
      emailotp: otp1,
      phoneotp: otp2,
    };
    const batch = db.batch();

    const otpdatref = db.collection("otpdata").doc();
    const delolddatref = await db
      .collection("otpdata")
      .where("userphno", "==", data.phoneNo)
      .get();
    delolddatref.forEach((element) => {
      const ref = db.collection("otpdata").doc(element.id);
      batch.delete(ref);
    });
    batch.set(otpdatref, obj);

    await batch.commit();

    res.send({
      success: true,
      code: 200,
      message: "Otp sent successfully",
      response: null,
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      code: 400,
      message: "Some error occured",
      response: null,
    });
  }
});


router.post("/verify", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const otpdatref = db.collection("otpdata");
    const snapshot = await otpdatref
      .where("userphno", "==", data.phoneNo)
      .get();
    if (snapshot.empty) {
      res.send({
        success: false,
        code: 404,
        message: "Invalid Input data",
        response: null,
      });
    } else {
      let data1 = [];
      snapshot.forEach((ele) => {
        data1.push(ele.data());
      });
      if (
        data.email == data1[0].useremail &&
        data.phoneNo == data1[0].userphno &&
        data.emailOTP == data1[0].emailotp &&
        data.phoneOTP == data1[0].phoneotp
      ) {
        const batch = db.batch();
        const delolddatref = await db
          .collection("otpdata")
          .where("userphno", "==", data.phoneNo)
          .get();
        delolddatref.forEach((element) => {
          const ref = db.collection("otpdata").doc(element.id);
          batch.delete(ref);
        });
        await batch.commit();
        res.send({
          success: true,
          code: 200,
          message:
            "Otp Validation Successful,Click the signup button to complete the registration",
          response: null,
        });
      } else {
        res.send({
          success: false,
          code: 400,
          message: "Otp Validation Failed,Please Try Again",
          response: null,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      code: 400,
      message: "Some error occured",
      response: null,
    });
  }
});


router.post("/register", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const hash = await bcrypt.hash(data.password, 8);
    const snapshot = await db
      .collection("Municipalities")
      .where("key", "==", data.securityKey)
      .get();
    if (snapshot.empty) {
      const userobj = {
        name: data.municipalityName,
        area: data.areaOfJurisdiction.toLowerCase(),
        muniId: data.municipalityID,
        key: data.securityKey,
        phno: data.phoneNo,
        email: data.email,
        password: hash,
      };
      await db.collection("Municipalities").doc(data.securityKey).set(userobj);
      res.send({
        success: true,
        code: 201,
        message: "User Registration Successful!!",
        response: null,
      });
    } else {
      console.log("same key");
      res.send({
        success: false,
        code: 400,
        message: "Please try some other security key!!",
        response: null,
      });
    }
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      code: 400,
      message: "Some error occured",
      response: null,
    });
  }
});


router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const docref = await db.collection("Municipalities").doc(data.key).get();
    if (docref.exists) {
      const currentpass = data.password;
      const isMatch = await bcrypt.compare(currentpass, docref.data().password);
      console.log(currentpass, docref.data().password, isMatch);
      if (isMatch) {
        res.send({
          success: true,
          code: 200,
          message: "Login Successful!",
          response: { key: docref.data().key },
        });
      } else {
        res.send({
          success: false,
          code: 401,
          message: "Key/Password not matching!",
          response: null,
        });
      }
    } else {
      res.send({
        success: false,
        code: 401,
        message: "Key/Password not matching!",
        response: null,
      });
    }
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      code: 400,
      message: "Some error occured",
      response: null,
    });
  }
});


router.post("/count", async (req, res) => {
  try {
    const key = req.body.key;
    console.log(key);
    const allcomplaints = await db
      .collection("Complaints")
      .where("muni_key", "==", key)
      .get();
    let active = 0;
    let pending = 0;
    let resolved = 0;
    if (allcomplaints.empty) {
      const ret = {
        active: 0,
        pending: 0,
        resolved: 0,
      };
      res.send({
        success: true,
        code: 200,
        message: "No complaints found",
        response: ret,
      });
    } else {
          console.log(allcomplaints.size);
      allcomplaints.forEach((ele) => {
        if (ele.data().Active == true) {
          active += 1;
        } else if (ele.data().Pending == true) {
          pending += 1;
        } else if (ele.data().Resolved == true) {
          resolved += 1;
        }
      });
      const ret = {
        active: active,
        pending: pending,
        resolved: resolved,
      };
      res.send({
        success: true,
        code: 200,
        message: "Fetched Complaints Successfully",
        response: ret,
      });
    }
  } catch (err) {
        console.log(err);
    res.send({
      success: false,
      code: 400,
      message: "Some error occured",
      response: null,
    });
  }
});



module.exports = router;
