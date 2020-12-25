const Mongoose=require("mongoose");

const shopSchema=new Mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
      },
    description:{
        type:String,
        required:"Description is required"
    },
    logo: {
        data: Buffer,
        contentType: String
      },
    owner: {type: Mongoose.Schema.ObjectId, ref: 'users'},
    createdAt: { type: Date, default: Date.now },
    updatedAt:{
        type:Date
    }
});


module.exports=Mongoose.model("shops",shopSchema);