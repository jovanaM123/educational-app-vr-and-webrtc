import express from 'express';
var router = express.Router();
import Student from '../model/student';

router.route('/login').post(
    (req, res) => {
        let username = req.body.username;
        let pass = req.body.pass;

        Student.find({ 'username': username, 'password': pass },
            (err, student) => {
                if (err) console.log(err);
                else res.json(student);
            })
    }
);


router.route('/okUsername').post(
    (req, res) => {
        let username = req.body.username;

        Student.find({ 'username': username },
            (err, student) => {
                if (err) console.log(err);
                else res.json(student);
            });

    });

router.route('/register').post(
    (req, res) => {
        let student = new Student(req.body);

        student.save()
            .then(student => {
                res.status(200).json({ 'uspeh': 'ok' })
            }).catch(err => {
                res.status(400).json({ 'uspeh': 'no' });
            })
    }
);

router.route('/online').post(
    (req, res) => {
        let username = req.body.username;

        Student.findOneAndUpdate({ 'username': username }, { 'online': true },
            (err, student) => {
                if (err) console.log(err);
                else res.json("ok");
            });

    });


router.route('/odjava').post(
    (req, res) => {
        let username = req.body.username;

        Student.findOneAndUpdate({ 'username': username }, { 'online': false },
            (err, student) => {
                if (err) console.log(err);
                else res.json("ok");
            });

    });

    
    module.exports = router;