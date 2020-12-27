const ShopModel=require("../Models/ShopModel");
const formidable=require("formidable");
const fs=require("fs");
const _=require("lodash");

exports.creatShop=(req,res)=>{
   const Formidable=new formidable.IncomingForm();
   Formidable.keepExtensions=true;
   Formidable.parse(req,async (err,fields,files)=>{
    try {
        if(err){
            return res.status(400).json({
                error:err
            })
        }
           const Shop=new ShopModel(fields);
           Shop.owner=req.profile;
           if(files.logo){
            Shop.logo.data = fs.readFileSync(files.logo.path);
            Shop.logo.contentType = files.logo.type
          }
        const newShop=await Shop.save();
        res.status(201).json(newShop);
    } catch (error) {
        return res.status(500).json(error);
    }
   })
}

exports.isSeller=(req,res,next)=>{
    if(!req.profile.seller){
           return res.status(403).json({
                error:"Sorry you, are not a seller"
            })
    }
    next();
}

exports.getAllShops=async (req,res)=>{
    try {
        const shops=await ShopModel.find({});
        res.status(200).json(shops);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getShopById=async (req,res,next,id)=>{
    try {
        const Shop=await ShopModel.findById(id).populate("owner","_id name");
        if(!Shop){
            return res.status(404).json({
                error:"Couldn't Find Any Shop With This Id"
            })
        }
        req.shop=Shop;
        next();
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getShopLogo=(req,res,next)=>{
    if(req.shop.logo.data){
        res.set("Content-Type", req.shop.logo.contentType)
        return res.send(req.shop.logo.data)
      }
    next();
}


exports.getByOwner=async (req,res)=>{
    try {
        const shops=await ShopModel.find({owner:req.profile._id}).populate("owner","_id name");
        res.status(200).json(shops);
    } catch (error) {
        res.status(500).json(error);
    }
}


exports.isOwner=(req,res,next)=>{
const isOwner=req.user&&req.shop&&req.user.id.toString()===req.shop.owner._id.toString();
    if(!isOwner){
        return res.status(403).json({
            error:"You are not authorized for this action"
        })
    }
    next();
}

exports.removeShop=async (req,res)=>{
    try {
        await req.shop.delete();
        res.status(200).json()
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.getShop=(req,res)=>{
    res.status(200).json(req.shop);
}

exports.updateShop=async (req,res)=>{
    const Formidable=new formidable.IncomingForm();
    Formidable.keepExtensions=true;
    Formidable.parse(req,async (err,fields,files)=>{
        try {
            if(err){
                return res.status(400).json({
                    error:"Photo couldn't be uploaded"
                })
            }
           let shop=req.shop;
           shop=_.extend(shop,fields);
           if(files.logo){
               shop.logo.data=fs.readFileSync(files.logo.path);
               shop.logo.contentType=files.logo.type;
           }
           shop.updatedAt=Date.now();
           const updatedShop=await shop.save();
           res.status(200).json(updatedShop);
        } catch (error) {
            res.status(500).json(error)
        }
    })
}