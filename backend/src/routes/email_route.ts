import express from 'express';
import nodemailer from 'nodemailer';

var router = express.Router();
import Student from '../model/student';

//slanje domacih na mejl skole

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: "agroadm123@gmail.com",
        pass: "Agro123@@"
    }, tls: {
        rejectUnauthorized: false
    }
});

router.route('/posaljidomaci').post(
    (req, res) => {
        let fajl = req.body.fajl;
        let username = req.body.username;
        Student.find({ 'username': username },
            (err, student) => {
                if (err) console.log(err);
                else {
                    
                let mejl = student[0].get('mail');

                let mailOptions = {
                    from: mejl, 
                    to: "agroadm123@gmail.com",
                    subject: `Eschool app`,
                    text: `Domaci zadatak: `,
                    attachments: [
                        {
                            path: fajl
                        }
                    ]
                };
        
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        throw error;
                    } else {
                        res.json("ok");
                        console.log("Email uspesno poslat!");
                    }
                });
            
            }
            });

    });


    
router.route('/posaljirez').post(
    (req, res) => {
        let score = req.body.score;
        let username = req.body.username;

        Student.find({ 'username': username },
            (err, student) => {
                if (err) console.log(err);
                else {
                    
                let mejl = student[0].get('mail');
                let emailText = getEmailBody(score);

                let mailOptions = {
                    from: "agroadm123@gmail.com", 
                    to: mejl,
                    subject: `Eschool app`,
                    html: emailText,
                };
        
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        throw error;
                    } else {
                        res.json("ok");
                        console.log("Email uspesno poslat!");
                    }
                });
            
            }
            });

    });

    function getEmailBody(score: any) {
        let emailBody = "";

        if(score >= 15) {
          emailBody = "Po??tovani," +
              "<br>" +
              "<br>" +
              "prema Va??im odgovorima postoje naznake da Va??e dete boluje od autizma. " +
              "Molimo Vas da se posavetujete sa lekarom. " +
              "Na na??oj mobilnoj aplikaciji mo??ete prona??i vi??e detalja kao i dalje korake u dijagnostikovanju autizma." +
              "<br>" +
              "<br>" +
              "Pozdrav.";
    
        } else if(score >= 10) {
          emailBody = "Po??tovani," +
              "<br>" +
              "<br>" +
              "prema Va??im odgovorima ne postoje naznake da Va??e dete boluje od autizma." +
              "<br>" +
              "<br>" +
              "Pozdrav.";
        } else {
          emailBody = "Po??tovani," + 
              "<br>" +
              "<br>" +
              "prema Va??im odgovorima ne postoje zna??ajne naznake da Va??e dete boluje od autizma. " +
              "Ukoliko imate sumnje o stanju Va??eg deteta, molimo Vas da se posavetujete sa lekarom. " +
              "Na na??oj mobilnoj aplikaciji mo??ete prona??i vi??e detalja kao i dalje korake u dijagnostikovanju autizma." +
              "<br>" +
              "<br>" +
              "Pozdrav.";
        }
    
        return emailBody;
    }

    
    module.exports = router;