import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export default mongoose.model('exam', Exam);