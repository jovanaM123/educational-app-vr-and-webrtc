"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const student_1 = __importDefault(require("../model/student"));
router.route('/login').post((req, res) => {
    let username = req.body.username;
    let pass = req.body.pass;
    student_1.default.find({ 'username': username, 'password': pass }, (err, student) => {
        if (err)
            console.log(err);
        else
            res.json(student);
    });
});
router.route('/okUsername').post((req, res) => {
    let username = req.body.username;
    student_1.default.find({ 'username': username }, (err, student) => {
        if (err)
            console.log(err);
        else
            res.json(student);
    });
});
router.route('/register').post((req, res) => {
    let student = new student_1.default(req.body);
    student.save()
        .then(student => {
        res.status(200).json({ 'uspeh': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'uspeh': 'no' });
    });
});
router.route('/online').post((req, res) => {
    let username = req.body.username;
    student_1.default.findOneAndUpdate({ 'username': username }, { 'online': true }, (err, student) => {
        if (err)
            console.log(err);
        else
            res.json("ok");
    });
});
router.route('/odjava').post((req, res) => {
    let username = req.body.username;
    student_1.default.findOneAndUpdate({ 'username': username }, { 'online': false }, (err, student) => {
        if (err)
            console.log(err);
        else
            res.json("ok");
    });
});
module.exports = router;
//# sourceMappingURL=accessing_routes.js.map