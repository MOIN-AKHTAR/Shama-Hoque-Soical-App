const config = require("../config");
const UserModel=require("../Models/UserModel");
const {generateErrorObj}=require("../utils");
const expressJwt=require("express-jwt");
const _=require("lodash");
const formidable=require("formidable");
const fs=require("fs");

exports.signIn=async (req,res)=>{
    try {
        const {isValid,errors}=generateErrorObj(req);
        if(!isValid){
            res.status(400).json({error:errors});
        }else{
            const user=await UserModel.findOne({email:req.body.email});
            if(user&&user.verifyPassword(req.body.password,user.password)){
            const token=user.GenerateToken(user._id);
            // res.cookie("jwtToken",token,{expire: 360000 + Date.now()})
            user.password=undefined;
            res.status(200).json({
                token,
                user
            })
            }else{
                res.status(400).json({credentials:"Please Provide Correct Credentials"})
            }
            
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}

exports.createUser=async (req,res)=>{
    try {
        const {isValid,errors}=generateErrorObj(req);
        if(!isValid){
            res.status(400).json({error:errors});
        }else{
            const user= new UserModel({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            });
            const newUser=await user.save();
            res.status(200).json(newUser)
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getUsers=async (req,res)=>{
    try {
        const users=await UserModel.find({}).select(["-password"])
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getUser=async (req,res)=>res.json(req.profile);

exports.updateUser=(req,res)=>{
        const form = new formidable.IncomingForm();
        form.keepExtensions=true;
        form.parse(req, async (err, fields, files) => {
           try{ 
            let user = req.profile
            user = _.extend(user, fields);
             if(err){
                 return res.status(400).json({
                     error:err
                 })
             }
             if(files.photo){
                user.photo.data = fs.readFileSync(files.photo.path)
                user.photo.contentType = files.photo.type
              }
            user.updatedAt = Date.now();
            const updatedUser=await user.save();
            res.status(200).json(updatedUser)

           }
            catch (error) {
                console.log(error);
                res.status(500).json(error)
            }
          });
      
}


exports.removeUser=async (req,res)=>{
    try {
        await req.profile.remove();
        res.status(200).json(`Deleted User With Id ${req.profile._id} Successfully!!!`)
    } catch (error) {
        res.status(500).json(error);
    }
}


exports.getById=async (req,res,next,id)=>{
    try {
        const user=await UserModel.findById(id).populate("following","_id name").populate("followers","_id name");
        if(user){
            req.profile=user;
            next();
        }else{
            res.status(404).json("User Not Found");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.signout = (req, res) => {
    // res.clearCookie("jwtToken");
    return res.status('200').json({
      message: "signed out"
    })
  }


  exports.requireSignin = expressJwt({
    secret: config.JWT_SECRET,
    algorithms: ['HS256']
  })



  exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.user && req.profile._id == req.user.id
    if (!(authorized)) {
      return res.status('403').json({
        error: "User is not authorized"
      })
    }
    next()
  }


exports.photo = (req, res, next) => {
    if(req.profile.photo.data){
      res.set("Content-Type", req.profile.photo.contentType)
      return res.send(req.profile.photo.data)
    }
    next()
  }


exports.addFollowing=async (req,res,next)=>{
    try {
        await UserModel.findByIdAndUpdate(req.body.userId, 
            {$push: {following: req.body.followId}});
            next();
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}
  

exports.addFollower=async (req,res)=>{
   try {
    const result=await UserModel.findByIdAndUpdate(req.body.followId, {$push: {followers: req.body.userId}}, {new: true})
    .populate('following', '_id name')
    .populate('followers', '_id name');
      result.password = undefined
      res.json(result)
   } catch (error) {
    console.log(error);
    res.status(500).json({error})
   }
  }

exports.removeFollowing=async(req,res,next)=>{
    try {
         await UserModel.findByIdAndUpdate(req.body.userId, 
           {$pull: {following: req.body.unfollowId}});
    next();
    } catch (error) {
    console.log(error);
    res.status(500).json({error})
    }
} 
exports.removeFollower=async(req,res)=>{
    try {
        const result=await UserModel.findByIdAndUpdate(req.body.unfollowId, {$pull: {followers: req.body.userId}}, {new: true})
    .populate('following', '_id name')
    .populate('followers', '_id name');
    result.password=undefined;
    res.status(200).json(result)
    } catch (error) {
    console.log(error);
    res.status(500).json({error})
    }
  }


 exports.findPeople=(req, res) => {
    let following = req.profile.following
    following.push(req.profile._id)
    UserModel.find({ _id: { $nin : following } }, (err, users) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      }
      res.json(users)
    }).select('name')
  }