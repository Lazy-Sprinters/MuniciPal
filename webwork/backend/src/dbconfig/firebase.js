const admin=require('firebase-admin');
const path=require('path');

const serviceAccount=require(path.resolve(__dirname,'./municipal-d0e42-firebase-adminsdk-ymbia-4ddf48747e.json'));

admin.initializeApp({
      credential:admin.credential.cert(serviceAccount)
});

const db=admin.firestore();

module.exports=db;