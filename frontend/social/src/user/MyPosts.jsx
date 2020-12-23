import React, { Component } from 'react';
import PostList from '../posts/postList';
import {getPosts} from './user-api';
import {withRouter} from 'react-router-dom';
import Typography from '@material-ui/core/Typography'

 class MyPosts extends Component {

    state={
        posts:[],
        loading:true
    }

    removePost = (post) => {
        const updatedPosts = this.state.posts
        const index = updatedPosts.indexOf(post)
        updatedPosts.splice(index, 1)
        this.setState({posts: updatedPosts})
    }

    componentDidMount(){
        getPosts(this.props.match.params.userId).then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            this.setState({posts: data,loading:false})
          }
        })
    }

    render() {
        return (
           <React.Fragment>
             {!this.state.loading && this.state.posts.length===0?
             <Typography
             color="error"
             variant="h4"
             style={{
               textAlign:"center"
             }}
             >No Posts Found</Typography>: (<PostList
            posts={this.state.posts}
            removePost={this.removePost}
            />)
             }
           </React.Fragment>
        )
    }
}



export default withRouter(MyPosts);