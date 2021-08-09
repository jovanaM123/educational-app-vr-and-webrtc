"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_1 = __importDefault(require("../model/room"));
var router = express_1.default.Router();
router.route('/postojiSoba').post((req, res) => {
    let soba = req.body.soba;
    room_1.default.find({ 'name': soba }, (err, r) => {
        if (err)
            console.log(err);
        else
            res.json(r);
    });
});
router.route('/napraviNovu').post((req, res) => {
    let soba = new room_1.default(req.body);
    soba.save()
        .then(r => {
        res.status(200).json({ 'uspeh': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'uspeh': 'no' });
    });
});
module.exports = router;
//# sourceMappingURL=video_call_rooms_route.js.map