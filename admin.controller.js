const express =require("express");

const router=express.Router();

const Product=require("../models/admin.model")
const sendmail=require("../util/sendmail");

router.post("/",async(req,res)=>{
    try{
        const product=await Product.create(req.body);
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
sendAdmin= async(a,b)=>{

    const admin_mails = await Product.find({},{"email" : 1,"_id" : 0}).lean().exec();

    const mails = [];
    admin_mails.forEach(element => {
        mails.push(element.email);
    });
console.log(mails)
    sendmail("a@a.com",mails,`${a},${b} has registered with us`,`Please welcome ${a} ${b}`,`<h1>Please welcome ${a} ${b}</h1>`);
}

module.exports = {router,sendAdmin};


