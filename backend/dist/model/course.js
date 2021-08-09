"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Course = new Schema({
    unique_id: {
        type: String
    },
    link: {
        type: String
    },
    title: {
        type: String
    },
    image_url: {
        type: String
    },
    type: {
        type: Number
    },
    subject: {
        type: Number,
    }
});
exports.default = mongoose_1.default.model('course', Course);
//# sourceMappingURL=course.js.map