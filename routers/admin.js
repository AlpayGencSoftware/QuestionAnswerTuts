const express= require('express');
const router= express.Router();
const {getAccessToRoute, getAdminAccess}=require("../middlewares/authorization/auth");
const {checkUserExist}= require("../middlewares/database/databaseErrorHelpers");
// Block User

const  {blockUser, deleteUser}=require("../controllers/admin");
// Delete User

router.use([getAccessToRoute,getAdminAccess]);
  
router.get("/block/:id",checkUserExist, blockUser);
router.delete("/user/:id",checkUserExist,deleteUser);

module.exports=router;
