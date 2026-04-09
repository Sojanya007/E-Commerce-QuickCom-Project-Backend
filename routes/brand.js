var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')

/* GET home page. */

router.post('/brand_submit', upload.single('brandicon'), function (req, res, next) {
    console.log(req.body)
    console.log(req.file)
    try {
        pool.query("insert into brand(categoryid, subcategoryid, brandname, brandicon, created_at, updated_at, user_admin)values(?,?,?,?,?,?,?)",
            [req.body.categoryid, req.body.subcategoryid, req.body.brandname, req.file.filename, req.body.created_at, req.body.updated_at, req.body.user_admin], function (error, result) {

                if (error) {
                    console.log(error)
                    res.status(500).json({ message: 'Database error pls contact with backend team.....', status: false })
                }
                else {
                    res.status(200).json({ message: 'Brand Submitted Successfully', status: true })
                }

            })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});



router.post('/edit_brand_data', function (req, res, next) {
    try {
        pool.query("update brand set  categoryid=?, subcategoryid=?,  brandname=?, updated_at=?, user_admin=? where brandid=?",
            [, req.body.categoryid, req.body.subcategoryid, req.body.brandname, req.body.updated_at, req.body.user_admin, req.body.brandid], function (error, result) {
                if (error) {
                    console.log(error)
                    res.status(500).json({ message: 'Database error pls contact with backend team.....', status: false })
                }
                else {
                    res.status(200).json({ message: 'Brand Updated Successfully', status: true })
                }

            })
    }
    catch (e) {

        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});


router.post('/edit_brand_icon', upload.single('brandicon'), function (req, res, next) {
    try {
        pool.query("update brand set brandicon=?, updated_at=?, user_admin=? where brandid=?",
            [req.file.filename, req.body.updated_at, req.body.user_admin, req.body.brandid], function (error, result) {
                if (error) {
                    console.log(error)
                    res.status(500).json({ message: 'Database error pls contact with backend team.....', status: false })
                }
                else {
                    res.status(200).json({ message: 'Brand Updated Successfully', status: true })
                }

            })
    }
    catch (e) {
        console.log(e)
        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});



router.post('/delete_brand', function (req, res, next) {
    try {
        pool.query("delete from brand  where brandid=?", [req.body.brandid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ message: 'Database error pls contact with backend team.....', status: false })
            }
            else {
                res.status(200).json({ message: 'Brand Deleted Successfully', status: true })
            }

        })
    }
    catch (e) {

        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});

router.get('/display_all_brand', function (req, res, next) {
    try {
        pool.query("select B.*,(select C.categoryname  from category C  where C.categoryid=B.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=B.subcategoryid) as subcategoryname from brand B", function (error, result) {
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



router.post('/get_all_brand_by_subcategoryid', function (req, res, next) {
    console.log(req.body)
    try {
        pool.query("select B.*,(select C.categoryname from category C  where C.categoryid=B.categoryid) as categoryname from brand B where B.subcategoryid=?",
            [req.body.subcategoryid], function (error, result) {
                if (error) {
                    console.log(error)
                    res.status(500).json({ message: 'Database error pls contact with backend team.....', status: false })
                }
                else {
                    console.log(result)
                    res.status(200).json({ message: 'Success', data: result, status: true })
                }

            })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});
module.exports = router;
