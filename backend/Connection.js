const Mongoose=require("mongoose");
const config=require("./config");

Mongoose.Promise=global.Promise;

Mongoose.connect(config.MONGO_URI,{
     useFindAndModify:false,
     useNewUrlParser:true,
     useUnifiedTopology:true,
},(err)=>{
    if(err){
        return console.log(err);
    }
    console.log("Connected to mongodb");
})