package com.goyal.municiPal

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.android.synthetic.main.activity_login.*


class LoginActivity : AppCompatActivity() {
    private var db= FirebaseFirestore.getInstance()
    private var counterbackbutton=0
    lateinit var input1: EditText
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        input1=findViewById(R.id.phnofieldlogin)
        loginbut.isEnabled=false
        input1.addTextChangedListener(textWatcher)
        clearinplogin.setOnClickListener {
            input1.setText("")
        }
        loginbut.setOnClickListener {
            var ref=db.collection("Users").document(phnofieldlogin.text.toString())
            ref.get().addOnSuccessListener {
                snapshot -> if (snapshot!=null){
                    Log.d("hello", "DocumentSnapshot data: ${snapshot.data?.get("PhoneNum")}")
                    val intent=Intent(this,MainActivity::class.java)
                    intent.putExtra("PhoneNum",snapshot.data?.get("PhoneNum").toString())
                    intent.putExtra("Name",snapshot.data?.get("Name").toString())
                    intent.putExtra("total",snapshot.data?.get("TotalComplaints").toString())
                    startActivity(intent)
                }else{
                    startActivity(Intent(this,Signuphome::class.java))
                }
            }.addOnFailureListener{
                Toast.makeText(this,"Some error occured.", Toast.LENGTH_LONG).show()
            }
        }
    }
    override fun onBackPressed() {
        if (counterbackbutton==1) {
            finishAffinity()
            finish()
        }else {
            counterbackbutton+=1
            Toast.makeText(this,"Press once again to exit.", Toast.LENGTH_LONG).show()
        }
    }

    private val textWatcher = object : TextWatcher {
        override fun afterTextChanged(s: Editable?) {
        }
        override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
            loginbut.isEnabled=false
        }
        override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
            counterbackbutton=0
            if (!(input1.text!!.isEmpty())){
                loginbut.isEnabled=true
            }
        }
    }
}