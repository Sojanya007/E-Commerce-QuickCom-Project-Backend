var express = require('express')
var router = express.Router()
var request = require("request")
var nodemailer = require('nodemailer');

router.post('/sendotp',function(req,res){
    console.log("API YES",req.body)
    var options = {
        method:"GET",
        url:'http://167.114.117.218/GatewayAPI/rest',
        qs:{

            loginid: process.env.SMS_LOGIN_ID,
            password: process.env.SMS_PASSWORD,
            msg: req.body.otp,

            send_to: req.body.mobileno,

            routeID: '8',
            snsContentType: 'english'
        },
        headers:{
            "Cache-Control":"no-cache",
        }
    }
        
        console.log("options:",options)
         request(options, function (error, result, body){
            if(error){
                console.log(error)
                return res.json({
                    result: false
                })
            }else{
                console.log(result)
                return res.json({
                    result: true
                })
            }
         
        })
    
    
})


router.post('/send_mail',function(req,res){
  console.log(req.body)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'localhost',
        port: 465,
        secure: false,
       
        auth: {
          user: 'ritikrajgupta@gmail.com',
         pass: 'Raj@4561', 
        }
      });
      
      var mailOptions = {
        from: 'ritikrajgupta@gmail.com',
        to: '',
        subject: req.body.subject,
        //text: 'That was easy!'
        html:req.body.message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });   
      next()


})
module.exports = router