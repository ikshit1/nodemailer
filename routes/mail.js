var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var fs = require("fs");
var pdf = require('html-pdf');
var html = fs.readFileSync('./views/template.html', 'utf8');
var options = { format: 'Letter' };

router.post('/send',function(req,res){
    try{
        //Send mail
        pdf.create(html, options).toFile('./businesscard.pdf', function(error, file) {
            if (error) {
                return console.log(error);
            } else {
                var fromName = "Ikshit";
                var mailOptions = {
                    to: req.body.email,
                    subject: 'Test',
                    from: "from@gmail.com",
                    headers: {
                        "X-Laziness-level": 1000,
                        "charset" : 'UTF-8'
                    },
                    attachments: [{
                        filename: 'output.pdf',
                        path: file.filename
                    }],
                    html: '<p style="color:#0079c1;">Mail'+' '+'received'+'</p></br>'
                }
                var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'from@gmail.com', 
                        pass: 'password' 
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