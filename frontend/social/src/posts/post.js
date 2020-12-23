import React, { Component } from 'react';
import auth from '../auth/auth-helper';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete'
import profileImage from '../assets/images/Anonymous.png';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import Divider from '@material-ui/core/Divider';
import {remove,like,unlike} from './api-post';
import Comments from './comments'

const style=(theme)=>({
    card: {
        maxWidth:600,
        margin: 'auto',
        marginBottom: theme.spacing.unit*3,
        backgroundColor: 'rgba(0, 0, 0, 0.06)'
      },
      cardContent: {
        backgroundColor: 'white',
        padding: `${theme.spacing.unit*2}px 0px`
      },
      cardHeader: {
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit
      },
      text: {
        margin: theme.spacing.unit*2
      },
      photo: {
        textAlign: 'center',
        backgroundColor: '#f2f5f4',
        padding:theme.spacing.unit
      },
      media: {
        height: 200
      },
      button: {
       margin: theme.spacing.unit,
      }
})

class post extends Component {

    state={
        like:false,
        likes:0,
        comments:[]
    }

    componentDidMount(){
        this.setState({like:this.checkLike(this.props.post.likes), likes: this.props.post.likes.length, comments: this.props.post.comments})
    }

    checkLike = (likes) => {
        const jwt = auth.isAuthenticated();
        if(jwt){
          let match = likes.indexOf(jwt.user._id) !== -1
          return match
        }

        return false;
        
      }

    updateComments = (comments) => {
        this.setState({comments: comments})
      }

      like = () => {
        let callApi = this.state.like ? unlike : like
        const jwt = auth.isAuthenticated()
        if(jwt){
          callApi({
            userId: jwt.user._id
          }, {
            t: jwt.token
          }, this.props.post._id).then((data) => {
            if (data.error) {
              console.log(data.error)
            } else {
              this.setState({like: !this.state.like, likes: data.likes.length})
            }
          })
        }
      }

deletePost = () => {
    const jwt = auth.isAuthenticated()
    remove({
      postId: this.props.post._id
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
       this.props.removePost(this.props.post)
      }
    })
}


    render() {

        const {classes}=this.props;
        return (
            <Card className={classes.card}>
            <CardHeader
            avatar={
              <Avatar src={'http://localhost:3001/api/v1/users/photo/'+this.props.post.postedBy._id || profileImage}/>
            }
            action={auth.isAuthenticated()&&this.props.post?.postedBy._id === auth.isAuthenticated()?.user._id &&
              <IconButton onClick={this.deletePost}>
                <DeleteIcon />
              </IconButton>
            }
            title={<Link to={"/user/" + this.props.post?.postedBy._id}>{this.props.post.postedBy.name}</Link>}
            subheader={(new Date(this.props.post.created)).toDateString()}
            className={classes.cardHeader}
          />
          <CardContent className={classes.cardContent}>
          <Typography component="p" className={classes.text}>
            {this.props.post.text}
          </Typography>
          {this.props.post.photo &&
            (<div className={classes.photo}>
              <img
                className={classes.media}
                src={'http://localhost:3001/api/v1/posts/photo/'+this.props.post._id}
                aria-hidden
                alt="No image"
                />
            </div>)}
        </CardContent>
        <CardActions>
          { this.state.like
            ? <IconButton onClick={this.like} className={classes.button} aria-label="Like" color="secondary">
                <FavoriteIcon />
              </IconButton>
            : <IconButton onClick={this.like} className={classes.button} aria-label="Unlike" color="secondary">
                <FavoriteBorderIcon />
              </IconButton> } <span>{this.state.likes}</span>
              <IconButton className={classes.button} aria-label="Comment" color="secondary">
                <CommentIcon/>
              </IconButton> <span>{this.state.comments.length}</span>
        </CardActions>
        <Divider/>
        <Comments 
        postId={this.props.post?._id}
        comments={this.state.comments} 
        updateComments={this.updateComments}
        />
    </Card>
        )
    }
}


export default withStyles(style)(post);
