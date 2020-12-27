const Express=require("express");
const {requireSignin}=require("../Controller/UserController");
const {isOwner,getShopById}=require("../Controller/ShopController");
const {createProduct,getByShop,getById,getImage,deleteProduct,isProductOwner,getLatestProducts,getProduct,updateProduct,distinctCategory,serchedList,getProductList}=require("../Controller/ProductController");

const Router=Express.Router();

Router.route("/:shopId")
.post(requireSignin,isOwner,createProduct);

Router.route("/:shopId/:productId")
.delete(requireSignin,isProductOwner,deleteProduct)
.put(requireSignin,isProductOwner,updateProduct)
;

Router.route("/latest").get(getLatestProducts);
Router.route("/categories").get(distinctCategory);
Router.route("/list").get(getProductList)

Router.route("/search").get(serchedList);

Router.route("/by/:shopId").get(getByShop);
Router.route("/image/:productId").get(getImage);
Router.route("/:productId").get(getProduct);

Router.param("shopId",getShopById);
Router.param("productId",getById);

module.exports=Router;