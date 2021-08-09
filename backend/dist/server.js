"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = __importDefault(require("socket.io"));
const node_cron_1 = __importDefault(require("node-cron"));
const app = express_1.default();
var server = app.listen(4000, function () {
    console.log('listening for requests on port 4000,');
});
var io = socket_io_1.default(server);
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true });
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('Database connected');
});
var mainRouter = require('./routes/accessing_routes');
var videoRouter = require('./routes/video_call_rooms_route');
var emailRouter = require('./routes/email_route');
var courseRouter = require('./routes/courses_route');
var homeworkRouter = require('./routes/homework_route');
app.use('/', mainRouter);
app.use('/d', homeworkRouter);
app.use('/c', videoRouter);
app.use('/k', courseRouter);
app.use('/e', emailRouter);
const course_1 = __importDefault(require("./model/course"));
const users_mark_1 = __importDefault(require("./model/users_mark"));
const users_course_1 = __importDefault(require("./model/users_course"));
//cron - tracking grades every day at 11:59 p.m.
// type - type of course
//1 - incentive for bad students
//2 - incentive for good students 
//3 - for excelent students
//4 - motivational video content for students with gpa 2-3
//5 - video content for concentration
//6 - science vs social science
// subject - type of subject
// 0 - all 
// 1-7 - specific subject
// 8 - language
// 9 - science
// 10 - social science
node_cron_1.default.schedule('59 23 * * *', () => {
    users_mark_1.default.find({}, (err, mark) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            console.log(err);
        else {
            for (let i = 0; i < Object.keys(mark).length; i++) {
                let username = mark[i].get('users_username');
                //delete all courses
                yield users_course_1.default.deleteMany({ 'users_username': username });
                let allCourses = [];
                let course1 = [];
                let course2 = [];
                let course3 = [];
                let course4 = [];
                let course5 = [];
                //GPA
                let gpa = (mark[i].get("subj1").grade + mark[i].get("subj2").grade + mark[i].get("subj3").grade
                    + mark[i].get("subj4").grade + mark[i].get("subj5").grade + mark[i].get("subj6").grade
                    + mark[i].get("subj7").grade) / 7;
                let type = 0;
                if (gpa == 5) {
                    type = 3;
                }
                else if (gpa >= 4 && gpa < 5) {
                    type = 2;
                }
                else if (gpa >= 3 && gpa < 4) {
                    type = 5;
                }
                else if (gpa >= 2 && gpa < 3) {
                    type = 4;
                }
                else if (gpa < 2) {
                    type = 1;
                }
                course1 = yield getCourses(type, 0);
                //languages vs science vs social science
                let gpaLang = (mark[i].get("subj1").grade + mark[i].get("subj2").grade) / 2;
                let gpaScience = (mark[i].get("subj3").grade + mark[i].get("subj4").grade
                    + mark[i].get("subj5").grade) / 3;
                let gpaSocial = (mark[i].get("subj6").grade + mark[i].get("subj7").grade) / 2;
                var max = Math.max(gpaLang, gpaScience, gpaSocial);
                let subject = 0;
                if (max == gpaLang) {
                    subject = 8;
                }
                else if (max == gpaScience) {
                    subject = 9;
                }
                else {
                    subject = 10;
                }
                course2 = yield getCourses(6, subject);
                // go through all the grades and test if there are less than grade 3
                let a = [];
                let b = [];
                let c = [];
                let d = [];
                let e = [];
                let f = [];
                let g = [];
                if (mark[i].get("subj1").grade < 3) {
                    a = yield getCourses(4, 1);
                }
                else if (mark[i].get("subj2").grade < 3) {
                    b = yield getCourses(4, 2);
                }
                else if (mark[i].get("subj3").grade < 3) {
                    c = yield getCourses(4, 3);
                }
                else if (mark[i].get("subj4").grade < 3) {
                    d = yield getCourses(4, 4);
                }
                else if (mark[i].get("subj5").grade < 3) {
                    e = yield getCourses(4, 5);
                }
                else if (mark[i].get("subj6").grade < 3) {
                    f = yield getCourses(4, 6);
                }
                else if (mark[i].get("subj7").grade < 3) {
                    g = yield getCourses(4, 7);
                }
                course3 = course3.concat(a, b, c, d, e, f, g);
                // if student has all 5s and one grade is less or = than 5
                let grades = [mark[i].get("subj1").grade, mark[i].get("subj2").grade, mark[i].get("subj3").grade,
                    mark[i].get("subj4").grade, mark[i].get("subj5").grade, mark[i].get("subj6").grade,
                    mark[i].get("subj7").grade];
                grades = grades.reverse();
                if (grades[6] == 5 && grades[6] == grades[5] && grades[5] == grades[4] && grades[4] == grades[3]
                    && grades[3] == grades[2] && grades[2] == grades[1] && grades[1] != grades[0]) {
                    let subject = 0;
                    //languages vs science vs social science
                    if (grades[0] == mark[i].get("subj1").grade) {
                        subject = 1;
                    }
                    else if (grades[0] == mark[i].get("subj2").grade) {
                        subject = 2;
                    }
                    else if (grades[0] == mark[i].get("subj3").grade) {
                        subject = 3;
                    }
                    else if (grades[0] == mark[i].get("subj4").grade) {
                        subject = 4;
                    }
                    else if (grades[0] == mark[i].get("subj5").grade) {
                        subject = 5;
                    }
                    else if (grades[0] == mark[i].get("subj6").grade) {
                        subject = 6;
                    }
                    else if (grades[0] == mark[i].get("subj7").grade) {
                        subject = 7;
                    }
                    course4 = yield getCourses(3, subject);
                }
                // if student has all 2s and one grade is more or = than 3
                let grades2 = [mark[i].get("subj1").grade, mark[i].get("subj2").grade, mark[i].get("subj3").grade,
                    mark[i].get("subj4").grade, mark[i].get("subj5").grade, mark[i].get("subj6").grade,
                    mark[i].get("subj7").grade];
                grades = grades.reverse();
                if (grades2[6] == 1 && grades2[6] == grades2[5] && grades2[5] == grades2[4] && grades2[4] == grades2[3]
                    && grades2[3] == grades2[2] && grades2[2] == grades2[1] && grades2[1] != grades2[0]) {
                    let subject = 0;
                    if (grades2[0] >= 3) {
                        //languages vs science vs social science
                        if (grades2[0] == mark[i].get("subj1").grade) {
                            subject = 1;
                        }
                        else if (grades2[0] == mark[i].get("subj2").grade) {
                            subject = 2;
                        }
                        else if (grades2[0] == mark[i].get("subj3").grade) {
                            subject = 3;
                        }
                        else if (grades2[0] == mark[i].get("subj4").grade) {
                            subject = 4;
                        }
                        else if (grades2[0] == mark[i].get("subj5").grade) {
                            subject = 5;
                        }
                        else if (grades2[0] == mark[i].get("subj6").grade) {
                            subject = 6;
                        }
                        else if (grades2[0] == mark[i].get("subj7").grade) {
                            subject = 7;
                        }
                        course5 = yield getCourses(2, subject);
                    }
                }
                allCourses = allCourses.concat(course1, course2, course3, course4, course5);
                if (allCourses.length) {
                    users_course_1.default.insertMany({ 'users_username': username, "courses": allCourses });
                }
            }
        }
    }));
});
//end of crons
function getCourses(type, subject) {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = yield course_1.default.find({
            'type': type,
            'subject': subject,
        });
        let courseArray = [];
        if (courses.length != 0) {
            yield courses.forEach(course => {
                courseArray.push(course.get('unique_id'));
            });
        }
        return courseArray;
    });
}
//video chat
const peers = {};
io.on('connect', (socket) => {
    console.log('a client is connected');
    // Initiate the connection process as soon as the client connects
    peers[socket.id] = socket;
    // Asking all other clients to setup the peer connection receiver
    for (let id in peers) {
        if (id === socket.id)
            continue;
        console.log('sending init receive to ' + socket.id);
        peers[id].emit('initReceive', socket.id);
    }
    /**
     * relay a peerconnection signal to a specific socket
     */
    socket.on('signal', data => {
        console.log('sending signal from ' + socket.id + ' to ', data);
        if (!peers[data.socket_id])
            return;
        peers[data.socket_id].emit('signal', {
            socket_id: socket.id,
            signal: data.signal
        });
    });
    /**
     * remove the disconnected peer connection from all other connected clients
     */
    socket.on('disconnect', () => {
        console.log('socket disconnected ' + socket.id);
        socket.broadcast.emit('removePeer', socket.id);
        delete peers[socket.id];
    });
    /**
     * Send message to client to initiate a connection
     * The sender has already setup a peer connection receiver
     */
    socket.on('initSend', init_socket_id => {
        console.log('INIT SEND by ' + socket.id + ' for ' + init_socket_id);
        peers[init_socket_id].emit('initSend', socket.id);
    });
});
//end of video chat
//# sourceMappingURL=server.js.map