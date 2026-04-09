var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
/* GET home page. */

router.post('/productdetail_submit', upload.single('picture'), function (req, res, next) {
    console.log(req.body)
    console.log(req.file)
    
    try { 
        pool.query("insert into productdetail(categoryid, subcategoryid, brandid, productid, productdetailname, weight, weighttype, packagingtype, noofqty, stock, price, offerprice, offertype, productstatus, productdetaildescription, picture, created_at, updated_at, user_admin)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productid, req.body.productdetailname, req.body.weight, req.body.weighttype, req.body.packagingtype, req.body.noofqty, req.body.stock, req.body.price, req.body.offerprice, req.body.offertype, req.body.productstatus, req.body.productdetaildescription, req.file.filename, req.body.created_at, req.body.updated_at, req.body.user_admin], function (error, result) {
        
                if (error) {
                    console.log(error)
                    res.status(500).json({ message: 'Database error pls contact with backend team.....', status: false })
                }
                else {
                    res.status(200).json({ message: 'Productdetails Submitted Successfully', status: true })
                }

            })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});



router.post('/edit_productdetail_data', function (req, res, next) {
    
    try { 
        pool.query("update productdetail set categoryid=?,subcategoryid=?,brandid=?,productid=?,weight=?,weighttype=?,packagingtype=?,noofqty=?,stock=?,price=?,offertype=?,productstatus=?,productdetaildescription=?,updated_at=?,user_admin=? where productdetailid=?", 
            [req.body.categoryid, req.body.subcategoryid,req.body.brandid,req.body.productid, req.body.productdetailname, req.body.weight, req.body.weighttype, req.body.packagingtype, req.body.noofqty, req.body.stock, req.body.price, req.body.offerprice, req.body.offertype, req.body.productstatus, req.body.productdetaildescription, req.body.updated_at, req.body.user_admin, req.body.productdetailid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ message: 'Database error pls contact with backend team.....', status: false })
            }
            else {
                res.status(200).json({ message: 'Productdetail Updated Successfully', status: true })
            }

        })
    }
    catch (e) {

        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});


router.post('/edit_picture', upload.single('picture'), function (req, res, next) {
    try {
        pool.query("update productdetail set picture=?, updated_at=?, user_admin=? where productdetailid=?", 
            [req.file.filename, req.body.updated_at, req.body.user_admin, req.body.productdetailid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ message: 'Database error pls contact with backend team.....', status: false })
            }
            else {
                res.status(200).json({ message: 'Productdetail Updated Successfully', status: true })
            }

        })
    }
    catch (e) {
        console.log(e)
        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});



router.post('/delete_productdetail', function (req, res, next) {
    try {
        pool.query("delete from productdetail where productdetailid=?", [req.body.productdetailid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ message: 'Database error pls contact with backend team.....', status: false })
            }
            else {
                res.status(200).json({ message: 'Productdetail Deleted Successfully', status: true })
            }

        })
    }
    catch (e) {

        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});

 

router.get('/display_all_productdetail', function (req, res, next) {
    try { console.log("Body",req.body)
    pool.query("select PD.*,(select C.categoryname from category C  where C.categoryid=PD.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=PD.subcategoryid ) as subcategoryname, (select B.brandname from brand B where B.brandid=PD.brandid) as brandname, (select P.productname from product P where P.productid=PD.productid) as productname from productdetail PD", function (error, result) {
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




router.post('/get_all_productdetail_by_productid', function (req, res, next) {
    try {
    pool.query("select PD.*,(select C.categoryname from category C  where C.categoryid=PD.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=PD.subcategoryid ) as subcategoryname, (select B.brandname from brand B where B.brandid=PD.brandid) as brandname, (select P.productname from product P where P.productid=PD.productid) as productname from productdetail PD where PD.productid=?",
        [req.body.productid], function (error, result) {
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

 