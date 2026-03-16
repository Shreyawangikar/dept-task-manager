const express = require("express");
const router = express.Router();
const User = require("../modules/User");


router.post("/register", async(req,res)=>{

const user = new User(req.body);

await user.save();

res.json({message:"User Registered"})

})


router.post("/login", async(req,res)=>{

const user = await User.findOne({

email:req.body.email,
password:req.body.password

})

if(user){

res.json({
message:"Login Success",
user
})

}else{

res.json({
message:"Invalid Credentials"
})

}

})


module.exports = router;