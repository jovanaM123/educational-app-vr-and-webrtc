import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export default mongoose.model('mark', Mark);