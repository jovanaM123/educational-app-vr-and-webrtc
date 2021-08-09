import express from 'express';

var router = express.Router();

import UsersCourses from '../model/users_course';
import Courses from '../model/course';



router.route('/kursevi').post(
    (req, res) => {
        let username = req.body.username;

        UsersCourses.find({'users_username': username },
            (err, usrcourse) => {
                if (err) console.log(err);
                else {

                    usrcourse.forEach(async (el) => {
                        let coursers_ids: Array<String> = el.get('courses');

                    
                        Courses.find({ 'unique_id' :{ $in: coursers_ids } },
                        (err, cour) => {
                            if (err) console.log(err);
                            else {
                                res.json(cour);
                            }
                        });

                        
                    });
                
                }
            });

    });

    module.exports = router;