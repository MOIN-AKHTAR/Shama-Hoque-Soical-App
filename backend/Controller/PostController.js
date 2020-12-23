const PostModel =require('../Models/PostModel');
const formidable = require('formidable');
const fs =require('fs');

exports.createPost = (req, res, next) => {
    try {
        
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded"
        })
      }
      let post = new PostModel(fields)
      post.postedBy= req.profile
      if(files.photo){
        post.photo.data = fs.readFileSync(files.photo.path)
        post.photo.contentType = files.photo.type
      }
      const result=await post.save();
      res.status(201).json(result)
    })
    } catch (error) {
        res.status(500).json(error)
    }
  }

  exports. getPosts = async (req, res) => {try {
    
    let following = req.profile.following;
    following.push(req.profile._id)
    const posts=await PostModel.find({postedBy: { $in : req.profile.following } })
     .populate('comments', 'text created')
     .populate('comments.postedBy', '_id name')
     .populate('postedBy', '_id name')
     .sort('-created');
     res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
  }


  exports.postByID = (req, res, next, id) => {
    PostModel.findById(id).populate('postedBy', '_id name').exec((err, post) => {
      if (err || !post)
        return res.status('400').json({
          error: "Post not found"
        })
      req.post = post
      next()
    })
  }


  exports. getPhoto = (req, res, next) => {
    res.set("Content-Type", req.post.photo.contentType)
    return res.send(req.post.photo.data)
}



exports.isPoster = (req, res, next) => {
  let isPoster = req.post && req.user&&req.post.postedBy._id ==  req.user.id;
  if(!isPoster){
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}


exports.remove = (req, res) => {
  let post = req.post
    post.remove((err, deletedPost) => {
      if (err) {
        return res.status(400).json({
          error:  err.message
        })
      }
      res.json(deletedPost)
    })
}



exports.like = (req, res) => {
  PostModel.findByIdAndUpdate(req.body.postId, {$push: {likes: req.body.userId}}, {new: true})
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error:  err.message
      })
    }
    res.json(result)
  })
}

exports.unlike = (req, res) => {
  PostModel.findByIdAndUpdate(req.body.postId, {$pull: {likes: req.body.userId}}, {new: true})
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error:  err.message
      })
    }
    res.json(result)
  })
}


exports.comment = (req, res) => {
  let comment = req.body.comment
  comment.postedBy = req.body.userId
  PostModel.findByIdAndUpdate(req.body.postId, {$push: {comments: comment}}, {new: true})
  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error:  err.message
      })
    }
    res.json(result)
  })
}


exports.uncomment = (req, res) => {
  let comment = req.body.comment
  PostModel.findByIdAndUpdate(req.body.postId, {$pull: {comments: {_id: comment._id}}}, {new: true})
  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error:  err.message
      })
    }
    res.json(result)
  })
}



exports.listByUser = (req, res) => {
  PostModel.find({postedBy: req.params.byUserId})
  .populate('comments', 'text created')
  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id name')
  .sort('-created')
  .exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error:  err.message
      })
    }
    res.json(posts)
  })
}