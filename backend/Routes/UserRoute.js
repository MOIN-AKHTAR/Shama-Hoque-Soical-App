const Express=require("express");
const {check}=require("express-validator");
const {createUser,getUsers,getUser,getById,removeUser,updateUser,signIn,signout,requireSignin,hasAuthorization,photo,addFollower,addFollowing,removeFollower,removeFollowing,findPeople}=require("../Controller/UserController");
const UserModel=require("../Models/UserModel")

const Router=Express.Router();


Router.route("/").get(getUsers);
Router.route("/signup").post([check("email").isEmail().withMessage("Please Provide Valid Email").custom(value=>{
    return UserModel.findOne({email:value}).then(user=>{
        if(user){
            return Promise.reject('E-mail already in use');
        }
    })
}),
check("password").isLength({min:6}).withMessage("Must be 6 Character Long"),
check("name").isLength({min:1}).withMessage("Must Not Empty")
],
createUser
)

Router.route("/signIn").post(
    [check("email").isEmail().withMessage("Please Provide Valid Email"),
    check("password").isLength({min:6}).withMessage("Must be 6 Character Long")],
    signIn
)


Router.route('/follow')
  .put(requireSignin, addFollowing, addFollower)
Router.route('/unfollow')
  .put(requireSignin, removeFollowing, removeFollower);


  Router.route('/findpeople/:userId')
  .get(requireSignin,findPeople );


Router.route("/photo/:userId").get(photo);

Router.route("/signout").post(signout);

Router.route('/:userId')
  .get(getUser)
  .put(requireSignin,hasAuthorization,updateUser)
  .delete(requireSignin,hasAuthorization,removeUser)

Router.param('userId', getById)


module.exports=Router;