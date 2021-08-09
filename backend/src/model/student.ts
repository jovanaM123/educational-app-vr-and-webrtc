import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export default mongoose.model('student', Student);