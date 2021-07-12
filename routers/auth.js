const express=require('express');
const {register, login, getUser, logout, imageUpload, forgotPassword, resetPassword, editDetails}=require('../controllers/auth');
const router= express.Router(); 
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const profileImageUpload= require("../middlewares/libraries/profileImageUpload");

router.post("/register",register);
router.post("/login", login);
//router.get("/error",errorTest);
//router.get("/tokentest",getAccessToRoute,tokentest);
router.get("/profile",getAccessToRoute,getUser);
router.get("/logout",getAccessToRoute,logout);
router.post("/forgotpassword",forgotPassword);
router.put("/resetpassword", resetPassword);
router.put("/edit",getAccessToRoute,editDetails);
router.post("/upload",[getAccessToRoute, profileImageUpload.single("profile_image")], imageUpload);
module.exports=router;



