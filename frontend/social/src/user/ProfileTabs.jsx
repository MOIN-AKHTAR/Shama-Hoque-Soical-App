import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FollowGrid from './FollowGrid';
import MyPosts from './MyPosts'

class ProfileTabs extends Component {
  state = {
    tab: 0,
    posts: []
  }

  componentWillReceiveProps = (props) => {
    this.setState({tab:0})
  }
  handleTabChange = (event, value) => {
    this.setState({ tab: value })
  }

  render() {
    return (
    <div>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.tab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Posts" />
            <Tab label="Following" />
            <Tab label="Followers" />
          </Tabs>
        </AppBar>
       {this.state.tab === 0 && <TabContainer><MyPosts userId={this.props.user._id}/></TabContainer>}
       {this.state.tab === 1 && <TabContainer><FollowGrid people={this.props.user.following} type="following"/></TabContainer>}
       {this.state.tab === 2 && <TabContainer><FollowGrid people={this.props.user.followers} type="follower"/></TabContainer>}
    </div>)
  }
}

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  )
}

export default ProfileTabs
