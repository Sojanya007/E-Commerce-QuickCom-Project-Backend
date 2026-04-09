var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')

/* GET home page. */

router.post('/chk_admin_login', function (req, res, next) {

    try {
        pool.query("select * from admins where (emailid=? or mobileno=?) and password=?",[req.body.emailid,req.body.mobileno,req.body.password  ], function (error, result) {
        
                if (error) {
                    console.log(error)
                    res.status(500).json({ message: 'Database error pls contact with backend team.....', status: false })
                }
                else
                { if(result.length==1)
                {  console.log('valid')
                    res.status(200).json({ message: 'Success', status: true })

                }
                else 
                {  console.log('invalid')
                    res.status(200).json({ message: 'Invalid Emailid/Mobile Number/Password', status: false })
                }
            }
            })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});

 
 
module.exports = router;

 