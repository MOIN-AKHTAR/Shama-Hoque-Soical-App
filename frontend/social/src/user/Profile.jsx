import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import auth from '../auth/auth-helper'
import {read} from './user-api.js'
import {Redirect, Link} from 'react-router-dom';
import profileImage from '../assets/images/Anonymous.png';
import ProfileButtons from './ProfileButtons';
import ProfileTabs from './ProfileTabs';
import Loader from '../utils/Loader'

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle
  }
})

class Profile extends Component {
  constructor({match}) {
    super()
    this.state = {
      user: '',
      redirectToSignin: false,
      following:false,
      loading:true
    }
    this.match = match
  }
  init = (userId) => {
    const jwt = auth.isAuthenticated();
    read({
      userId: userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({redirectToSignin: true})
      } else {
        const isFollowing=this.checkFollow(data)
        this.setState({user: data,following:isFollowing,loading:false})
      }
    })
  }


  checkFollow = (user) => {
    const jwt = auth.isAuthenticated();
    if(jwt){
      const match = user.followers.find((follower)=> {
        return follower._id === jwt.user._id
      })
      return match;
    }
  }


  clickFollowButton = (callApi) => {
    const jwt = auth.isAuthenticated()
    callApi({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.state.user._id).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({user: data, following: !this.state.following})
      }
    })
  }


  componentWillReceiveProps = (props) => {
    this.init(props.match.params.userId)
  }
  componentDidMount = () => {
    this.init(this.match.params.userId)
  }
  render() {
    const {classes} = this.props
    const redirectToSignin = this.state.redirectToSignin;
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}
        variant="h5"
        color="secondary"
        >
          Profile
        </Typography>
        {this.state.loading?<Loader/>:null}
        {!this.state.loading&&(
             <React.Fragment>
             <List dense>
          <ListItem>
            <ListItemAvatar>
            <Avatar src={this.state.user?("http://localhost:3001/api/v1/users/photo/"+this.state.user._id || profileImage):profileImage} />
            </ListItemAvatar>
            <ListItemText primary={this.state.user.name} secondary={this.state.user.email}/> {
             auth.isAuthenticated().user && auth.isAuthenticated().user._id === this.state.user._id? 
              (<ListItemSecondaryAction>
                <Link to={"/user/edit/" + this.state.user._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit/>
                  </IconButton>
                </Link>
                <DeleteUser userId={this.state.user._id}/>
              </ListItemSecondaryAction>):(
                 <ProfileButtons 
                 following={this.state.following} onButtonClick={this.clickFollowButton}
                 />
              )
            }
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText 
            primary={this.state.user.about}
            secondary={"Joined: " + (
              new Date(this.state.user.createdAt)).toDateString()}/>
          </ListItem>
        </List>
        {/* <ProfileTabs  user={this.state.user}/> */}
             </React.Fragment>
        )}
      </Paper>
    )
  }
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)
