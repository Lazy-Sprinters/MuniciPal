package com.goyal.municiPal

import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.os.Build
import android.os.Bundle
import android.provider.MediaStore
import android.text.Editable
import android.text.TextWatcher
import android.util.Base64
import android.util.Log
import android.widget.EditText
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.android.synthetic.main.activity_main.*
import java.io.ByteArrayOutputStream
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter


class MainActivity : AppCompatActivity() {
    private val req=1999
    private var counterbackbutton=0
    private var db=FirebaseFirestore.getInstance()
    lateinit var input1:EditText
    lateinit var input2:EditText
    lateinit var input3:EditText
    var Compressed:String?=null
    private var name:String?=null
    private var phno:String?=null
    private var totalcomp:Int?=null

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        handletextchange()
        val bundle:Bundle=intent.extras!!
        name=bundle.getString("Name")
        phno=bundle.getString("PhoneNum")
        totalcomp=bundle.getInt("total")
        Log.d("hello","${name} ${phno} ${totalcomp}")
        cambutton.setOnClickListener {
            try{
                this.counterbackbutton=0
                val cameraintent= Intent(MediaStore.ACTION_IMAGE_CAPTURE)
                startActivityForResult(cameraintent,req)
            }catch (ex:Exception){
                Log.d("Hello",ex.message.toString())
            }
        }
        submit.isEnabled=false
        submit.setOnClickListener {
            counterbackbutton=0
            try{
                var counter=0
                val munref=db.collection("Municipalities").whereEqualTo("area",input2.text.toString().toLowerCase()).get().addOnSuccessListener {snapshot ->
                    if (snapshot.isEmpty){
                        Toast.makeText(this,"There is some error in the area selected.", Toast.LENGTH_LONG).show()
                    }else{
                        //there is atleast 1 municipality satisfying the condition
                        for(doc in snapshot){
                            if (counter==1){
                                break
                            }else{
                                counter+=1
                                val Complain= hashMapOf(
                                    "owner" to phno,
                                    "name_mun" to doc.data["name"],
                                    "key_mun" to doc.data["key"],
                                    "complain_title" to input1.text.toString(),
                                    "address" to input3.text.toString(),
                                    "Active" to true,
                                    "Pending" to false,
                                    "Resolved" to false,
                                    "currcomp" to totalcomp,
                                        "status" to "accepted"
                                )
                                Log.d("hello",Complain.toString())
                                val keyforimg=phno+totalcomp.toString()
                                val current=LocalDateTime.now()
                                var formatter=DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS")
                                val formatted=current.format(formatter)

                                val complainimg= hashMapOf(
                                    "img" to Compressed!!.toString(),
                                    "muni_key" to doc.data["key"],
                                    "owmer" to phno,
                                    "before" to true,
                                    "after" to false,
                                    "type" to "base64",
                                    "time" to formatted
                                )
                                Log.d("hello",keyforimg)
                                Log.d("hello",complainimg.toString())

                                var ref1=db.collection("Complaints").document()
                                var ref2=db.collection("ComplaintImg").document(keyforimg)
                                var ref3=db.collection("Users").document(phno.toString())
                                Log.d("hello",phno.toString())
                                db.runBatch { batch ->
                                    batch.set(ref1,Complain)
                                    batch.set(ref2,complainimg)
                                    batch.update(ref3,"TotalComplaints",FieldValue.increment(1))
                                }.addOnSuccessListener {
                                    Log.d("Hello","success")
                                    var intent=Intent(this,ThankuActivity1::class.java)
                                    intent.putExtra("PhoneNum",phno)
                                    intent.putExtra("Name",name)
                                    intent.putExtra("total",(totalcomp!!+1))
                                    startActivity(intent)
                                }.addOnFailureListener {
                                    Log.d("hello",it.localizedMessage)
                                }
                            }
                        }
                    }
                }.addOnFailureListener { exception ->
                    Log.d("hello",exception.message.toString())
                }
            }catch (ex:Exception){
                Log.d("hello",ex.message.toString())
            }
        }
    }

    fun handletextchange(){
        input1=findViewById(R.id.comtitle)
        input2=findViewById(R.id.comarea)
        input3=findViewById(R.id.comadd)
        input1.addTextChangedListener(textWatcher)
        input2.addTextChangedListener(textWatcher)
        input3.addTextChangedListener(textWatcher)
    }
    override fun onBackPressed() {
        if (counterbackbutton==1) {
            startActivity(Intent(this,LoginActivity::class.java))
        }
        else {
            counterbackbutton+=1
            Toast.makeText(this,"Press once again to exit.", Toast.LENGTH_LONG).show()
        }
    }
    private val textWatcher = object : TextWatcher {
        override fun afterTextChanged(s: Editable?) {
        }
        override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
            submit.isEnabled=false
        }
        override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
            counterbackbutton=0
            if (!(input1.text!!.isEmpty()) && !(input2.text!!.isEmpty()) && !(input3.text!!.isEmpty()) && Compressed!=null){
                submit.isEnabled=true
            }
        }

    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode==req){
            Log.d("Hello","Camera is working")
            val photo:Bitmap=data?.extras?.get("data") as Bitmap
            showing.setImageBitmap(photo)
            this.Compressed=encodeImage(photo)
            if (!(input1.text!!.isEmpty()) && !(input2.text!!.isEmpty()) && !(input3.text!!.isEmpty()) && Compressed!=null){
                submit.isEnabled=true
            }
            Log.d("hello","1")
        }
    }

    private fun encodeImage(bm: Bitmap): String? {
        val baos = ByteArrayOutputStream()
        bm.compress(Bitmap.CompressFormat.JPEG, 70, baos)
        val b = baos.toByteArray()
        return Base64.encodeToString(b, Base64.DEFAULT)
    }

    private fun Apicall(){
        val queue = Volley.newRequestQueue(this)
        val url = "https://us1.locationiq.com/v1/reverse.php?key=pk.08af5fa4b900bc20a19b8acdaf2497e1&lat=26.868034&lon=80.9059252&format=json"
        val JsonObjectRequest = JsonObjectRequest(Request.Method.GET, url,null,
                Response.Listener{ response ->
                    val data=response.getJSONObject("address");
                    val data1=data.getString("city")
                    Log.d("hello",data1)
                },
                Response.ErrorListener {
                    Log.d("hello",it.localizedMessage)
                })
        queue.add(JsonObjectRequest)
    }

}