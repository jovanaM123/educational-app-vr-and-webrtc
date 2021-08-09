"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Mark = new Schema({
    users_username: {
        type: String
    },
    subj1: {
        type: Object
    },
    subj2: {
        type: Object
    },
    subj3: {
        type: Object
    },
    subj4: {
        type: Object
    },
    subj5: {
        type: Object
    },
    subj6: {
        type: Object
    },
    subj7: {
        type: Object
    },
});
exports.default = mongoose_1.default.model('mark', Mark);
//# sourceMappingURL=users_mark.js.map