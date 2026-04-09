var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')

/* GET home page. */

router.post('/mainbanner_submit', upload.single('fileNames'), function (req, res, next) {
    console.log(req.body)
    console.log(req.file)
    try {
        pool.query("insert into mainbanner( status, filenames, created_at, updated_at, user_admin)values(?,?,?,?,?)",
            [ req.body.status,req.file.filename,req.body.created_at,req.body.updated_at,req.body.user_admin], function (error, result) {
        
                if (error) {
                    console.log(error)
                    res.status(500).json({ message: 'Database error pls contact with backend team.....', status: false })
                }
                else {
                    res.status(200).json({ message: 'Main Banner Submitted Successfully', status: true })
                }

            })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});

 
module.exports = router;

 