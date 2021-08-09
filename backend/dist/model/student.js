"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Student = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    mail: {
        type: String
    },
    school: {
        type: String
    },
    lastname: {
        type: String
    },
    online: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('student', Student);
//# sourceMappingURL=student.js.map