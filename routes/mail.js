var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

router.post('/resend',function(req,res){

    try{
        //Send mail
        var fromName = "Ikshit";
        var mailOptions = {
            to: 'to@gmail.com',
            subject: 'Activation Link',
            from: "from@gmail.com",
            headers: {
                "X-Laziness-level": 1000,
                "charset" : 'UTF-8'
            },
            attachments: [{
                filename: 'license.pdf',
                path: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
            }],
            html: '<p style="color:#0079c1;">Mail'+' '+'sent'+'</p></br>'
        }
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'from@gmail.com', 
                pass: 'your password' 
            }
        });
        transporter.sendMail(mailOptions, function(error, response){
            if(error){
                return res.send({
                    state:"error",
                    message:error
                });
            }
            else{
                return res.send({
                    state:"success",
                    message:"Email send successfully"
                });
            }
        });
    }
    catch(err){
        res.send({
            state:"error",
            message:"Something went wrong."
        });
    }
});


module.exports = router;