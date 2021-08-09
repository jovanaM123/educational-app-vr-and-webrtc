import express from 'express';

var router = express.Router();

import Exam from '../model/exam';


router.route('/domaci').get(
    (req, res) => {
        let datum = new Date();

        Exam.find({},
            (err, ex) => {
                if (err) console.log(err);
                else {
                    let avEx = new Array();

                    ex.forEach(element => {
                        let d = element.get('deadline');
                        let dt1 = parseInt(d.substring(0, 2));
                        let mon1 = parseInt(d.substring(3, 5));
                        let yr1 = parseInt(d.substring(6, 10));
                        let dat = new Date(yr1, mon1, dt1);

                        if (datum.getTime() < dat.getTime()) {
                            avEx.push(element);
                        }

                    });

                    res.json(avEx)
                }
            });

    });

    
    module.exports = router;