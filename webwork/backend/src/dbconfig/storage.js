const {Storage} = require('@google-cloud/storage')
const path=require('path');

const storage=new Storage({
      projectId:"municipal-d0e42",
      keyFilename:path.resolve(__dirname,'./municipal-d0e42-firebase-adminsdk-ymbia-4ddf48747e.json')
})

const bucket=storage.bucket('gs://municipal-d0e42.appspot.com')
module.exports=bucket