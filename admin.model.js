const {Schema,model}=require("mongoose");
const adminSchema=new Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    emp_id:{type:Number,required:true},
    email:{type:String,required:true},
},{
    versionKey:false,
    timestamps:true,
})
module.exports=new model("admin",adminSchema)