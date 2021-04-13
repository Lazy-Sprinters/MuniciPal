const {Storage} = require('@google-cloud/storage')
const path=require('path');
const storage=new Storage({
      projectId:/*YOUR PROJECT ID*/,
      keyFilename:path.resolve(__dirname,/*YOUR FIREBASE SERVICE ACCOUNT CREDENTIAL*/)
})

const bucket=storage.bucket(/*YOUR PROJECT NAME*/)
module.exports=bucket
