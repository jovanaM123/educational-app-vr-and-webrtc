import express from 'express';
import Room from '../model/room';

var router = express.Router();



router.route('/postojiSoba').post(
    (req, res) => {
        let soba = req.body.soba;

        Room.find({ 'name': soba },
            (err, r) => {
                if (err) console.log(err);
                else res.json(r);
            });

    });

router.route('/napraviNovu').post(
    (req, res) => {
        let soba = new Room(req.body);

        soba.save()
            .then(r => {
                res.status(200).json({ 'uspeh': 'ok' })
            }).catch(err => {
                res.status(400).json({ 'uspeh': 'no' });
            })


    });

    
    module.exports = router;