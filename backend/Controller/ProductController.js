const ProductModel=require("../Models/ProductModel");
const formidable=require("formidable");
const fs=require("fs");
const _=require("lodash");

exports.createProduct=async (req,res)=>{
    const Formidable=new formidable.IncomingForm();
    Formidable.keepExtensions=true;
    Formidable.parse(req,async (err,fields,files)=>{
            try {
                if(err){
                    return res.status(400).json({
                        image:"Couldn't upload image"
                    })
                }
            const Product=new ProductModel(fields);
            Product.productShop=req.shop;
            if(files.image){
                Product.image.data=fs.readFileSync(files.image.path);
                Product.image.contentType=files.image.type;
            }
            const newProduct=await Product.save();
            res.status(201).json(newProduct);
            } catch (error) {
                res.status(500).json(error);
            }
        })
}


exports.getByShop=async (req,res)=>{
    try {
        const Products=await ProductModel.find({productShop:req.shop._id});
        res.status(200).json(Products);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getById=async (req,res,next,id)=>{
    try {
        const Product=await ProductModel.findById(id).populate("productShop","_id name");
        req.product=Product;
        next();
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getImage=(req,res)=>{
    if(req.product.image){
        res.set("Content-Type", req.product.image.contentType)
        return res.send(req.product.image.data)
      }
      next();
}


exports.deleteProduct=async (req,res)=>{
   try {
    await req.product.remove();
    res.status(200).json({
        success:`Deleted Product With Id ${req.product._id} Successfully`
    })
   } catch (error) {
       res.status(500).json(error);
   }
}

exports.isProductOwner=(req,res,next)=>{

const isOwner=req.shop&&req.product&&req.shop._id.toString()===req.product.productShop._id.toString();
console.log(req.shop._id);
console.log(req.product.productShop)

if(!isOwner){
       return res.status(403).json({
           error:"You are not authorized for this action"
       })
   }
   next();
}


exports.getLatestProducts=async (req,res)=>{
    try {
        const Products=await ProductModel.find({})
        .sort("-createdAt")
        .populate("productShop","_id name")
        .limit(5);
        res.status(200).json(Products);
    } catch (error) {
        res.status(500).json(error);
    }
}


exports.getProduct=(req,res)=>{
    res.json(req.product)
}


exports.updateProduct=(req,res)=>{
    const Formidable=new formidable.IncomingForm();
    Formidable.keepExtensions=true;
    Formidable.parse(req,async (err,fields,files)=>{
        try {
            if(err){
                return res.status(400).json({
                    image:"Couldn't upload image"
                })
            }
            let product=req.product;
            product=_.extend(product,fields);
            if(files.image){
                product.image.data=fs.readFileSync(files.image.path);
                product.image.contentType=files.image.type;
            }
            product.updatedAt=Date.now();
            const updatedProduct=await product.save();
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    })
}