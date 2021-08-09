"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
var router = express_1.default.Router();
const student_1 = __importDefault(require("../model/student"));
//slanje domacih na mejl skole
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
let transporter = nodemailer_1.default.createTransport({
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
router.route('/posaljidomaci').post((req, res) => {
    let fajl = req.body.fajl;
    let username = req.body.username;
    student_1.default.find({ 'username': username }, (err, student) => {
        if (err)
            console.log(err);
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
                }
                else {
                    res.json("ok");
                    console.log("Email uspesno poslat!");
                }
            });
        }
    });
});
router.route('/posaljirez').post((req, res) => {
    let score = req.body.score;
    let username = req.body.username;
    student_1.default.find({ 'username': username }, (err, student) => {
        if (err)
            console.log(err);
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
                }
                else {
                    res.json("ok");
                    console.log("Email uspesno poslat!");
                }
            });
        }
    });
});
function getEmailBody(score) {
    let emailBody = "";
    if (score >= 15) {
        emailBody = "Poštovani," +
            "<br>" +
            "<br>" +
            "prema Vašim odgovorima postoje naznake da Vaše dete boluje od autizma. " +
            "Molimo Vas da se posavetujete sa lekarom. " +
            "Na našoj mobilnoj aplikaciji možete pronaći više detalja kao i dalje korake u dijagnostikovanju autizma." +
            "<br>" +
            "<br>" +
            "Pozdrav.";
    }
    else if (score >= 10) {
        emailBody = "Poštovani," +
            "<br>" +
            "<br>" +
            "prema Vašim odgovorima ne postoje naznake da Vaše dete boluje od autizma." +
            "<br>" +
            "<br>" +
            "Pozdrav.";
    }
    else {
        emailBody = "Poštovani," +
            "<br>" +
            "<br>" +
            "prema Vašim odgovorima ne postoje značajne naznake da Vaše dete boluje od autizma. " +
            "Ukoliko imate sumnje o stanju Vašeg deteta, molimo Vas da se posavetujete sa lekarom. " +
            "Na našoj mobilnoj aplikaciji možete pronaći više detalja kao i dalje korake u dijagnostikovanju autizma." +
            "<br>" +
            "<br>" +
            "Pozdrav.";
    }
    return emailBody;
}
module.exports = router;
//# sourceMappingURL=email_route.js.map