const Express=require("express");
const {getById,requireSignin,hasAuthorization}=require("../Controller/UserController");
const {isSeller}=require("../Controller/ShopController");
const {creatShop,getAllShops,getShopById,getShopLogo,getByOwner,isOwner,removeShop,getShop,updateShop}=require("../Controller/ShopController")

const Router=Express.Router();

Router.route("/").get(getAllShops);
Router.route("/by/:userId")
.post(requireSignin,isSeller,creatShop)
.get(requireSignin,hasAuthorization,getByOwner);

Router.route("/logo/:shopId").get(getShopLogo);
Router.route("/:shopId")
.delete(requireSignin,isOwner,removeShop)
.put(requireSignin,isOwner,updateShop)
.get(getShop);

Router.param("userId",getById);
Router.param("shopId",getShopById);

module.exports=Router;