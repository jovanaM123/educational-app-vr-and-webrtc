"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let UsersCourse = new Schema({
    users_username: {
        type: String
    },
    courses: [String],
});
exports.default = mongoose_1.default.model('userscourse', UsersCourse);
//# sourceMappingURL=users_course.js.map