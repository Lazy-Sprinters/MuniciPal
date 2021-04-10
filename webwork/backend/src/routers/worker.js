const express = require("express");
const router = new express.Router();
const path = require("path");
const db = require("../dbconfig/firebase");
const fs = require("fs");
const bucket = require("../dbconfig/storage");
const { file } = require("../dbconfig/storage");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const GetOtp = () => {
  let val = Math.floor(Math.random() * 1000000);
  if (val.toString().length == 5) {
    val *= 10;
  }
  return val;
};

router.post("/add", async (req, res) => {
  try {
    const data = req.body;
    const image = data.worker.Image;
    const flag = GetOtp().toString();
    let type = "";
    for (let i = 6; i < data.worker.imageType.length; i++) {
      type += data.worker.imageType[i];
    }
    fs.writeFileSync(
      path.resolve(__dirname, "../public/" + flag + "." + type),
      image,
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
    const file1 = bucket.file(`EmployeePic/${flag}`);
    await file1.save(updpic, {
      resumable: false,
      metadata: { contentType: "image/" + type },
    });
    const url = await file1.getSignedUrl(options);
    fs.unlinkSync(path.resolve(__dirname, "../public/" + flag + "." + type));
    const workerobj = {
      phone: data.worker.PhoneNo,
      name: data.worker.Name,
      dp: url[0],
      address: data.worker.Address,
      key: data.user.key,
    };
    await db.collection("Worker").add(workerobj);
    res.send({
      success: true,
      code: 201,
      message: "Worker added successfully",
      response: null,
    });
  } catch (err) {
    res.send({
      success: false,
      code: 400,
      message: "Some error occured",
      response: null,
    });
  }
});

router.post("/all", async (req, res) => {
  try {
    const data = req.body.key;
    const snapshot = await db
      .collection("Worker")
      .where("key", "==", data)
      .get();
    if (snapshot.empty) {
      res.send({
        success: true,
        code: 404,
        message: "No Users found",
        response: null,
      });
    } else {
      let ret = [];
      snapshot.forEach((ele) => {
        ret.push({
          id: ele.id,
          Image: ele.data().dp,
          PhoneNo: ele.data().phone,
          Address: ele.data().address,
          Name: ele.data().name,
        });
      });
      res.send({
        success: true,
        code: 200,
        message: "The dish is served",
        response: ret,
      });
    }
  } catch (err) {
    res.send({
      success: false,
      code: 400,
      message: "Some error occured",
      response: null,
    });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const dataworker = req.body.worker;
    const key = req.body.user.key;
    await db.collection("Worker").doc(dataworker.id).delete();
    res.send({
      success: true,
      code: 200,
      message: "Worker gaddhe mei gir gaya",
      response: null,
    });
  } catch (err) {
    res.send({
      success: false,
      code: 400,
      message: "Some error occured",
      response: null,
    });
  }
});

module.exports = router;
