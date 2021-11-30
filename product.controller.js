const express =require("express");

const router=express.Router();

const Product=require("../models/product.model")

const sendmail=require("../util/sendmail");

const {sendAdmin} = require("./admin.controller");
router.post("/",async(req,res)=>{
    try{
        const product=await Product.create(req.body);
       
        sendmail("l@h.com",`${req.body.email}`,`Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`,`Hi ${req.body.first_name}, Please confirm your email address`,"Please confirm your email address","<h1>Click here to confirm mail address</h1>");
        sendAdmin(req.body.first_name,req.body.last_name)
       
       
        res.status(201).json({product});

    }catch(e){
        res.status(500).json({"message":e.message,"status":"failed"})
    }
});



router.get("/",async(req,res)=>{
    try{
        const page=+(req.query.page) ||1;
        const size=+(req.query.size) ||2;


        const offset=(page-1)*size;


        const product=await Product.find().skip(offset).limit(size).lean().exec();
        const total=Math.ceil(await (Product.find().countDocuments())/size);

        res.status(201).json({product,total});
    }catch(e){
        res.status(500).json({"message":e.message,"status":"failed"})
    }
})

module.exports=router;