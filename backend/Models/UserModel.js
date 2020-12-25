const Mongoose=require("mongoose");
const Bcryptjs=require("bcryptjs");
const config=require("../config");
const Jwt=require("jsonwebtoken");

const userSchema=new Mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Provide Name"]
    },
    email:{
        type:String,
        required:[true,"Please provide email"]
    },
    password:{
        type:String,
        min:[6,"Must provide atkeast 6 characters"]
    },
    about:{
        type:String
    },
    photo:{
        data: Buffer,
        contentType: String
    }
    ,
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date
    },
    followers:[{
        type:Mongoose.Schema.ObjectId,
        ref:"users"
    }],
    following:[{
        type:Mongoose.Schema.ObjectId,
        ref:"users"
    }],
    seller:{
        type:Boolean,
        default:false
    }
});


userSchema.pre("save",function(next){
    let user=this;
    if(user.isNew || user.isModified("password")){
        Bcryptjs.genSalt(10, function(err, salt) {
            Bcryptjs.hash(user.password, salt, function(err, hash) {
                user.password=hash;
                next();
            });
        });
    }else{
        next();
    }
})


userSchema.methods.GenerateToken = id =>
Jwt.sign({ id }, config.JWT_SECRET,{expiresIn:"1d"});

userSchema.statics.VerifyToken = Token =>
Jwt.verify(Token, config.JWT_SECRET);

userSchema.methods.verifyPassword=(password,encPassword)=>
  Bcryptjs.compare(password,encPassword)



module.exports=Mongoose.model("users",userSchema);
