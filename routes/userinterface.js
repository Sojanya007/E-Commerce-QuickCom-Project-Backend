var express = require('express');
var router = express.Router();
var pool = require('./pool')

 
router.post('/user_display_all_category', function (req, res, next) {
    try {
        if(req.body.status=="all")
        q="select * from category"
    else(req.body.status=="limit")
        q="select * from category limit 7"

        pool.query(q, function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database error pls contact with backend team.....', status: false })
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

 
router.post('/user_get_all_subcategory_by_categoryid', function (req, res, next) {
    try {
        pool.query("select SC.*,(select C.categoryname from category C  where C.categoryid=SC.categoryid) as categoryname from subcategory SC where SC.categoryid=?",[req.body.categoryid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database error pls contact with backend team.....', status: false })
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



router.get('/user_display_all_subcategory', function (req, res, next) {
    try {
        pool.query("select SC.*,(select C.categoryname  from category C  where C.categoryid=SC.categoryid) as categoryname from subcategory SC", function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database error pls contact with backend team.....', status: false })
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


router.post('/user_get_all_subcategory_by_categoryid', function (req, res, next) {
    try {
        pool.query("select SC.*,(select C.categoryname from category C  where C.categoryid=SC.categoryid) as categoryname from subcategory SC where SC.categoryid=?",[req.body.categoryid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database error pls contact with backend team.....', status: false })
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



router.get('/user_display_all_brand', function (req, res, next) {
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


router.post('/user_get_all_brand_by_subcategoryid', function (req, res, next) {
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



router.get('/user_display_all_product', function (req, res, next) {
    try {
    pool.query("select P.*,(select C.categoryname from category C  where C.categoryid=P.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=P.subcategoryid ) as subcategoryname, (select B.brandname from brand B where B.brandid=P.brandid) as brandname from product P", function (error, result) {
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




router.post('/user_get_all_product_by_brandid', function (req, res, next) {
    try {
    pool.query("select P.*,(select C.categoryname from category C  where C.categoryid=P.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=P.subcategoryid ) as subcategoryname, (select B.brandname from brand B where B.brandid=P.brandid) as brandname from product P where P.brandid=?",
        [req.body.brandid], function (error, result) {
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


router.get('/user_display_all_productdetail', function (req, res, next) {
    try {
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




router.post('/user_get_all_productdetail_by_productid', function (req, res, next) {
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


 
router.get('/show_all_banner', function (req, res, next) {
    try {
        

        pool.query("select * from mainbanner where status='show'", function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database error pls contact with backend team.....', status: false })
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


router.get('/show_all_bankoffer', function (req, res, next) {
    try {
        

        pool.query("select * from bankandotheroffers where status='show'", function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database error pls contact with backend team.....', status: false })
            }
            else {
                res.status(200).json({ message: 'Success', data: result, status: true })
            }

        })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

})

    router.get('/all_adoffers', function (req, res, next) {
        try {
            
    
            pool.query("select * from adoffers ", function (error, result) {
                if (error) {
                    console.log(error)
                    res.status(200).json({ message: 'Database error pls contact with backend team.....', status: false })
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

router.post('/display_all_productdetail_by_status', function (req, res, next) {
    try { console.log("Body",req.body)
    pool.query("select PD.*,(select C.categoryname from category C  where C.categoryid=PD.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=PD.subcategoryid ) as subcategoryname, (select B.brandname from brand B where B.brandid=PD.brandid) as brandname, (select P.productname from product P where P.productid=PD.productid) as productname from productdetail PD where PD.productstatus=?",[req.body.productstatus], function (error, result) {
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

 
router.get('/user_display_all_subcategorys', function (req, res, next) {
    try {
      
        q="select * from subcategory"
   
        pool.query(q, function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database error pls contact with backend team.....', status: false })
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

 
router.post('/user_get_all_brand_by_subcategoryid', function (req, res, next) {
    console.log(req.body)
    try {
        pool.query("select B.*,(select SC.subcategoryname from subcategory SC  where SC.subcategoryid=B.subcategoryid) as subcategoryname from brand B where B.subcategoryid=?",
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



router.post('/user_display_product_details_by_subcategory', function (req, res, next) {
    try {
       
        pool.query("select PD.*,(select C.categoryname from category C  where C.categoryid=PD.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=PD.subcategoryid ) as subcategoryname, (select B.brandname from brand B where B.brandid=PD.brandid) as brandname, (select P.productname from product P where P.productid=PD.productid) as productname from productdetail PD where PD.subcategoryid=?",[req.body.subcategoryid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database error pls contact with backend team.....', status: false })
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



router.post('/user_display_product_details_by_id', function (req, res, next) {
    try {
       
        pool.query("select PD.*,(select C.categoryname from category C  where C.categoryid=PD.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=PD.subcategoryid ) as subcategoryname, (select B.brandname from brand B where B.brandid=PD.brandid) as brandname, (select P.productname from product P where P.productid=PD.productid) as productname from productdetail PD where PD.productid=?",[req.body.productid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database error pls contact with backend team.....', status: false })
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


router.post('/user_display_product_pictures', function (req, res, next) {
    try {
       
        pool.query("select * from productpictures where productdetailid=? ",[req.body.productdetailid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database error pls contact with backend team.....', status: false })
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


router.post('/check_user_mobileno', function (req, res, next) {
    try { 
       
        pool.query("select * from usersdata where mobileno=? ",[req.body.mobileno], function (error, result) {
            if (error) {
               
                res.status(200).json({ message: 'Database error pls contact with backend team.....', status: false })
            }
            else {if(result.length==1)
            {
                res.status(200).json({ message: 'mobile no exist', data: result[0], status: true })
            }
            else
            {
                res.status(200).json({ message: 'mobile no not exist', data:[], status: false })
            }
        }
        })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});



router.post('/submit_user_data', function (req, res, next) {
    try { 
       
        pool.query("insert into usersdata(firstname, lastname, gender, emailaddress, dob, mobileno) values(?,?,?,?,?,?)",[req.body.firstname, req.body.lastname, req.body.gender, req.body.emailaddress, req.body.dob, req.body.mobileno], function (error, result) {
            if (error) {
               console.log(error)
                res.status(200).json({ message: 'Database error pls contact with backend team.....', status: false })
            }
            else  
            {   console.log(result)
                res.status(200).json({ message: 'Sucessfully Registerd',  status: true, userid:result.insertId })
            
           
        }
        })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});



router.post('/check_user_address', function (req, res, next) {
    try { 
        console.log("DATA:",req.body)
        pool.query("select * from useraddress where userid=? ",[req.body.userid], function (error, result) {
            if (error) {
               
                res.status(200).json({ message: 'Database error pls contact with backend team.....', status: false })
            }
            else {if(result.length>=1)
            {
                res.status(200).json({ message: 'Address Found', data: result, status: true })
            }
            else
            {
                res.status(200).json({ message: 'Address Not Found', data:[], status: false })
            }
        }
        })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});



router.post('/submit_user_address', function (req, res, next) {
    try { 
       
        pool.query("insert into useraddress(userid, pincode, houseno, floorno, towerno, building, address, landmark, city, state) values(?,?,?,?,?,?,?,?,?,?)",[ req.body.userid, req.body.pincode, req.body.houseno, req.body.floorno, req.body.towerno, req.body.building, req.body.address, req.body.landmark, req.body.city, req.body.state], function (error, result) {
            if (error) {
               console.log(error)
                res.status(200).json({ message: 'Database error pls contact with backend team.....', status: false })
            }
            else  
            {   console.log(result)
                res.status(200).json({ message: 'Adress Submitted Sucessfully',  status: true, userid:result.insertId })
            
           
        }
        })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});




router.post('/submit_order_data', function (req, res, next) {
    try { 
       
        pool.query("insert into orders(orderdate, productdetailid, qty, paymentstatus, deliverystatus, mobileno, emailaddress, userid, address, transactionid, name) values(?,?,?,?,?,?,?,?,?,?,?)",[req.body.orderdate, req.body.productdetailid, req.body.qty, req.body.paymentstatus, req.body.deliverystatus, req.body.mobileno, req.body.emailaddress, req.body.userid, req.body.address, req.body.transactionid, req.body.name], function (error, result) {
            if (error) {
               console.log(error)
                res.status(200).json({ message: 'Database error pls contact with backend team.....', status: false })
            }
            else  
            {   console.log(result)
                res.status(200).json({ message: 'Sucessfully Registerd',  status: true, userid:result.insertId })
            
           
        }
        })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error on Server Pls contact with backend team', status: false })
    }

});

router.post('/display_order',function(req, res, next){
     try {
        pool.query("select * from orders", function (error, result) {
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
})

router.post('/update_delivery_status',function(req,res,next){
     try {
    pool.query(
      "UPDATE orders SET deliverystatus=? WHERE userid=?",
      [req.body.deliverystatus, req.body.userid],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({ message: 'Database error pls contact with backend team', status: false });
        } else {
          res.status(200).json({ message: 'Delivery updated successfully', status: true });
        }
      }
    );
  } catch (e) {
    res.status(500).json({ message: 'Severe Error on Server Pls contact with backend team', status: false });
  }
})

module.exports = router;
