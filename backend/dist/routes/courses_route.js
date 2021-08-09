"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const users_course_1 = __importDefault(require("../model/users_course"));
const course_1 = __importDefault(require("../model/course"));
router.route('/kursevi').post((req, res) => {
    let username = req.body.username;
    users_course_1.default.find({ 'users_username': username }, (err, usrcourse) => {
        if (err)
            console.log(err);
        else {
            usrcourse.forEach((el) => __awaiter(void 0, void 0, void 0, function* () {
                let coursers_ids = el.get('courses');
                course_1.default.find({ 'unique_id': { $in: coursers_ids } }, (err, cour) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json(cour);
                    }
                });
            }));
        }
    });
});
module.exports = router;
//# sourceMappingURL=courses_route.js.map