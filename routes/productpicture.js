var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')

/* GET home page. */

router.post('/productpicture_submit', upload.any(), function (req, res, next) {
    console.log(req.body)
    console.log(req.files)
    var f = []
    req.files.map((item) => {
        f.push(item.filename)
    })
    try {
        pool.query("insert into productpictures(categoryid, subcategoryid, brandid, productid, productdetailid, filenames, created_at, updated_at, user_admin)values(?,?,?,?,?,?,?,?,?)",
            [req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productid, req.body.productdetailid, f + " ", req.body.created_at, req.body.updated_at, req.body.user_admin], function (error, result) {

                if (error) {
                    console.log(error)
                    res.status(500).json({ message: 'Database error pls contact with backend team.....', status: false })
                }
                else {
                    res.status(200).json({ message: 'ProductPictures Submitted Successfully', status: true })
                }
            })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});


router.post('/get_all_productpicture_by_productdetailid', function (req, res, next) {
    try {
        pool.query("select PP.*,(select C.categoryname from category C  where C.categoryid=PP.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=PP.subcategoryid ) as subcategoryname, (select B.brandname from brand B where B.brandid=PP.brandid) as brandname, (select P.productname from product P where P.productid=PP.productid) as productname, (select PD.productdetailname from productdetail PD where PD.productdetailid=PP.productdetailid) as productdetailname from productpicture PP where PP.productdetailid",
            [req.body.productdetailid], function (error, result) {
                if (error) {
                    console.log(error)
                    res.status(500).json({ message: 'Database error pls contact with backend team.....', status: false })
                }
                else {
                    res.status(200).json({ message: 'Success', data: result, status: true })
                }

            })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});

module.exports = router;

