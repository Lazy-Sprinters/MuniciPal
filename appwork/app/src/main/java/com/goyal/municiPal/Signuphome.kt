package com.goyal.municiPal

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.isVisible
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.android.synthetic.main.activity_signuphome.*

class Signuphome : AppCompatActivity() {
    private var db=FirebaseFirestore.getInstance()
    private var otp=123456
    private var counterbackbutton=0
    lateinit var input1: EditText
    lateinit var input2: EditText
    lateinit var input3: EditText
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signuphome)
        otpfield.isVisible=false
        verifybut.isVisible=false
        verifybut.isEnabled=false
        loginprompt.setOnClickListener {
            counterbackbutton=0
            startActivity(Intent(this,LoginActivity::class.java))
        }
        otpsendbut.setOnClickListener {
            counterbackbutton=0
            var docref=db.collection("Users").document(phnofield.text.toString())
            docref.get().addOnSuccessListener { document->
                Log.d("hello",document.exists().toString())
                if (document.exists()){
                    Toast.makeText(this, "User already registered, redirecting to login!", Toast.LENGTH_LONG).show()
                    startActivity(Intent(this,LoginActivity::class.java))
                }else{
                    otpfield.isVisible=true
                    verifybut.isVisible=true
                    Log.d("hello",otp.toString())
                }
            }.addOnFailureListener { exception ->
                Toast.makeText(this, "Some error occured!", Toast.LENGTH_LONG).show()
            }
        }
        verifybut.setOnClickListener {
            try {
                if (otpfield.text.toString() == otp.toString()) {
                    var user = hashMapOf(
                        "Name" to namefield.text.toString(),
                        "PhoneNum" to phnofield.text.toString(),
                        "TotalComplaints" to 0
                    )
                    db.collection("Users").document(phnofield.text.toString()).set(user)
                        .addOnSuccessListener {
                            val intent = Intent(this, MainActivity::class.java)
                            intent.putExtra("PhoneNum", phnofield.text.toString())
                            intent.putExtra("Name", namefield.text.toString())
                            intent.putExtra("total", 0!!)
                            startActivity(intent)
                        }.addOnFailureListener {
                        Toast.makeText(this, "Some error occured!!", Toast.LENGTH_LONG).show()
                    }
                } else {
                    Toast.makeText(this, "Invalid Otp entered!.", Toast.LENGTH_LONG).show()
                }
            }catch (ex:Exception){
                Log.d("hello",ex.message.toString())
            }
        }
        clear1.setOnClickListener {
            phnofield.setText("")
        }
        clear2.setOnClickListener {
            namefield.setText("")
        }
        input1=findViewById(R.id.otpfield)
        input2=findViewById(R.id.phnofield)
        input3=findViewById(R.id.namefield)
        input1.addTextChangedListener(textWatcher)
        input2.addTextChangedListener(textWatcher)
        input3.addTextChangedListener(textWatcher)
    }

    private val textWatcher = object : TextWatcher {
        override fun afterTextChanged(s: Editable?) {
        }
        override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
            verifybut.isEnabled=false
        }
        override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
            counterbackbutton=0
            if (!(input1.text!!.isEmpty()) && !(input2.text!!.isEmpty()) && !(input3.text!!.isEmpty())){
                verifybut.isEnabled=true
            }
        }
    }

    override fun onBackPressed() {
        if (counterbackbutton==1) {
            super.onBackPressed()
        }else {
            counterbackbutton+=1
            Toast.makeText(this,"Press once again to exit.", Toast.LENGTH_LONG).show()
        }
    }
}