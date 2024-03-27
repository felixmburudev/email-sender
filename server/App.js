const express=require('express')
const cors=require('cors')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const port =process.env.PORT || 3000
const app=express()
app.use(cors(
    {
        origin: 'your frontend address '
    }
))
app.use(bodyParser.json())


app.get('/send',(req,res)=>{
    const {name, email, message} = req.body.fromData
    const email_sender ="email with 2fa enabled"
    const password ='password from app password in gmail account'
    const transporter = nodemailer.createTransport({
    host: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: email_sender,
        pass: password
    }
    });

        transporter.sendMail({
            from: email_sender,
            to: email,
            subject: 'your optional subject',
            text: `${name} contacted you, email: ${email} message ${message}`
        }, (error, info) => {
            if (error) {
                console.log(error);
                res.send({message: "Email failed to send"});
            } else {
                console.log('Email sent:'+ info.response);
                res.send({message: "Email sent successfully"});
            }
        });
})
app.listen(port, () =>{
    console.log('Server listening on port: '+ port);
});