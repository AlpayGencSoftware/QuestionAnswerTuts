const CustomError= require('../../helpers/error/CustomError');
const asyncErrorWrapper= require('express-async-handler');
const User=require("../../models/User");
const Question= require("../../models/Question");
const Answer=require("../../models/Answer");
const jwt=require('jsonwebtoken');
const {isTokenIncluded, getAccessTokenFromHeader}=require("../../helpers/authorization/tokenHelpers");

const getAccessToRoute=(req,res,next)=>{
    // Token

    const {JWT_SECRET_KEY}=process.env;
    if(!isTokenIncluded(req)){
        // 401 - 403 
        // 401 Unauthorized
        // 403 Forbidden
        return next(new CustomError("You are not authorized to access this route", 401));
    }
    const accessToken=getAccessTokenFromHeader(req);
    jwt.verify(accessToken, JWT_SECRET_KEY,(err,decoded)=>{
        if(err){
            return  next(new CustomError("You are authorized to access  this route.",401));
        }
        req.user={
            id:decoded.id,
            name:decoded.name
        }  
        next();
    });
    //CustomError
};
// admin giriş izni için
const getAdminAccess= asyncErrorWrapper(async(req, res, next)=>{
    const {id}=req.user;
    const user= await User.findById(id);
    if(user.role!=="admin"){
        return next(new CustomError("Only admins can access this route", 403));

    }
    next();

});

const getQuestionOwnerAccess= asyncErrorWrapper(async(req, res, next)=>{
    const userId= req.user.id;
    const questionId=req.params.id;
    const question=await Question.findById(questionId);
    
    if(question.user!=userId){
        return next(new CustomError("Only owner can handle this operation.",403));
    }
    next(); 
});

const getAnswerOwnerAccess= asyncErrorWrapper(async(req, res, next)=>{
    const userId=req.id.params;
    const answerId=req.params.answer_Id;

    const answer=await Answer.findById(answerId);
    if(answer.user!=userId){
        
        return next(new CustomError("Only owner can handle this operation",403));
    }
    next();
    

});

module.exports={getAccessToRoute, getAdminAccess, getQuestionOwnerAccess, getAnswerOwnerAccess}
 