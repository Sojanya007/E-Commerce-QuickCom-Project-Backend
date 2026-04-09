var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')

/* GET home page. */

router.post('/adoffers_submit', upload.any(), function (req, res, next) {
    console.log(req.body)
    var f=[]
    req.files.map((item)=>{
       f.push(item.filename)
    })
    try {
        pool.query("insert into adoffers(categoryid, subcategoryid, brandid, productid, productdetailid, filenames)values(?,?,?,?,?,?)",
            [req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productid, req.body.productdetailid, f+""], function (error, result) {
        
                if (error) {
                    console.log(error)
                    res.status(500).json({ message: 'Database error pls contact with backend team.....', status: false })
                }
                else {
                    res.status(200).json({ message: 'Adoffers Submitted Successfully', status: true })
                }

            })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});

 
 
module.exports = router;

 