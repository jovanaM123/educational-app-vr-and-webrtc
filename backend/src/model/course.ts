import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export default mongoose.model('course', Course);