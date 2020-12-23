const Mongoose=require("mongoose");

const postSchema=new Mongoose.Schema({
    text: {
        type: String,
        required: 'Name is required'
      },
      photo: {
        data: Buffer,
        contentType: String
      },
      postedBy: {type: Mongoose.Schema.ObjectId, ref: 'users'},
      created: { type: Date, default: Date.now },
      likes: [{type: Mongoose.Schema.ObjectId, ref: 'users'}],
      comments: [{
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: Mongoose.Schema.ObjectId, ref: 'users'}
      }]
});


module.exports=Mongoose.model("posts",postSchema);