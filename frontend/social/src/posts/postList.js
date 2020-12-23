import React, {Component} from 'react'
import Post from './post'

class PostList extends Component {
  render() {
    return (
      <div style={{marginTop: '24px'}}>
        {this.props.posts.map((item, i) => {
            return <Post
            post={item}
            key={i}
            removePost={this.props.removePost}
             />
          })
        }
      </div>
    )
  }
}

export default PostList
