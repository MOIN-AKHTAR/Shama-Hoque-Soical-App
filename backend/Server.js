const Express=require("express")
const BodyParser=require("body-parser");
const Cors=require("cors");
const UserRoute=require("./Routes/UserRoute");
const PostRoute=require("./Routes/PostRoute");
const Morgan=require("morgan");
require("./Connection");

const App=Express();

App.use(Morgan("dev"));

App.use(BodyParser.json());
App.use(BodyParser.urlencoded({extended:true}));
App.use(Cors())

App.use("/api/v1/users",UserRoute);
App.use("/api/v1/posts",PostRoute)

App.all("*",(req,res)=>{
    res.status(404).json("Path Not Found");
})


// If JWT GET EXPIRED
App.use((err, req, res, next)=>{
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message})
      }
})

App.listen(3001,(err)=>{
    if(err){
        console.log("Error");
    }else{
        console.log("Running on port %s",3001);
    }
});
