const Express=require("express");
const {getById,requireSignin}=require("../Controller/UserController");
const {createPost,getPosts,getPhoto,postByID,isPoster,remove,like,unlike,comment,uncomment,listByUser}=require("../Controller/PostController");

const Router=Express.Router();

Router.route("/new/:userId").post(requireSignin,createPost).get(requireSignin,getPosts);

Router.route("/photo/:postId").get(getPhoto);

Router.route('/like').put(requireSignin,like);
Router.route('/unlike').put(requireSignin,unlike);
Router.route("/comment").put(requireSignin,comment);
Router.route("/uncomment").put(requireSignin,uncomment);
Router.route("/by/:byUserId").get(listByUser);

Router.route('/:postId').delete(requireSignin, isPoster,remove);


Router.param('postId', postByID);
Router.param('userId', getById);


module.exports=Router;