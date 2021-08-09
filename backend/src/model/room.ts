import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Room = new Schema({
    name: {
        type: String
    }
});

export default mongoose.model('room', Room);