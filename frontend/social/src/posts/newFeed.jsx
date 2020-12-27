import React,{Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider'
import NewPost from './NewPost';
import auth from '../auth/auth-helper';
import {getPosts} from './api-post'
import PostList from './postList';


const styles=(theme)=>({
    card: {
        margin: 'auto',
        paddingTop: 0,
        paddingBottom: theme.spacing(3)
      },
      title: {
        padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        fontSize: '1em'
      }
})

class newFeed extends Component {

    state={
        posts:[]
    }
    
    loadPosts = () => {
        const jwt = auth.isAuthenticated()
        getPosts({
          userId: jwt.user._id
        }, {
          t: jwt.token
        }).then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            this.setState({posts: data})
          }
        })
      }


    addPost = (post) => {
        const updatedPosts = this.state.posts
        updatedPosts.unshift(post)
        this.setState({posts: updatedPosts})
    }

    removePost = (post) => {
        const updatedPosts = this.state.posts
        const index = updatedPosts.indexOf(post)
        updatedPosts.splice(index, 1)
        this.setState({posts: updatedPosts})
    }

    componentDidMount(){
        this.loadPosts();
    }

    render() {

       const {classes}=this.props;

        return (
            <Card
        className={classes.card}
        >
            <Typography
            type="title"
            className={classes.title}
            >NEW FEED</Typography>
            <Divider/>
            <NewPost
            addUpdate={this.addPost}
            />
            <Divider/>
            <PostList 
            posts={this.state.posts}
            removePost={this.removePost}
            />
        </Card>
        )
    }
}


export default withStyles(styles)(newFeed)
