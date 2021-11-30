const express=require("express");

const app=express();

app.use(express.json());

const productController=require("./controller/product.controller");
const {router}=require("./controller/admin.controller");
app.use("/products",productController);
app.use("/admin",router);

module.exports=app;