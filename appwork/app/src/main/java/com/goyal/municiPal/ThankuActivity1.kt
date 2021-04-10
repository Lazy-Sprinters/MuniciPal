package com.goyal.municiPal

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_thanku1.*


class ThankuActivity1 : AppCompatActivity() {
    private var name:String?=null
    private var phno:String?=null
    private var totalcomp:Int?=null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_thanku1)
        val bundle:Bundle=intent.extras!!
        name=bundle.getString("Name")
        phno=bundle.getString("PhoneNum")
        totalcomp=bundle.getInt("total")
        okbutton.setOnClickListener {
            val intent=Intent(this,MainActivity::class.java)
            intent.putExtra("PhoneNum",phno)
            intent.putExtra("Name",name)
            intent.putExtra("total", totalcomp!!)
            startActivity(intent)
        }
    }

    override fun onBackPressed() {
//        super.onBackPressed()
        Toast.makeText(this,"There is no back action",Toast.LENGTH_LONG).show()
        return
    }
}