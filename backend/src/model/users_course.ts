import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let UsersCourse = new Schema({
    users_username: {
        type: String
    },
    courses: [String],
});

export default mongoose.model('userscourse', UsersCourse);