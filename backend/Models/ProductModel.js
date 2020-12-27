const Mongoose=require("mongoose");

const productSchema=new Mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
      },
      image: {
        data: Buffer,
        contentType: String
      },
      description:{
          type:String,
          required:[true,"Please Provide Description"]
      },
      quantity:{
          type:Number
      },
      productShop:{
          type:Mongoose.Schema.ObjectId,
          ref:"shops"
      },
      category:{
          type:String,
          required:[true,"Please Provide Category"]
      },
      price:{
          type:Number,
          required:[true,"Please provide price of product"]
      },
      postedBy: {type: Mongoose.Schema.ObjectId, ref: 'users'},
      createdAt: { type: Date, default: Date.now },
      updatedAt:{type:Date}
});


module.exports=Mongoose.model("products",productSchema);