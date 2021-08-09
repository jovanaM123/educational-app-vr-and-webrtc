"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Exam = new Schema({
    cl: {
        type: String
    },
    description: {
        type: String
    },
    deadline: {
        type: String
    }
});
exports.default = mongoose_1.default.model('exam', Exam);
//# sourceMappingURL=exam.js.map