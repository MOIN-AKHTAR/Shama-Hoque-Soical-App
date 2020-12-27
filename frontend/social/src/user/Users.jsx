import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import profileImage from '../assets/images/Anonymous.png'
import {Link} from 'react-router-dom'
import {list} from './user-api';
import Loader from '../utils/Loader'

const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5),
  }),
  scroll:{
    maxWidth:"700px",
    margin:"30px auto",
    maxHeight:"700px",
    overflowY:"scroll",
    "&::-webkit-scrollbar":{
      display: "none"
  }
  },
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  }
})

class Users extends Component {
  state = {
      users: [],
      loading:true
  }

  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({users: data,loading:false})
      }
    })
  }

  render() {
    const {classes} = this.props
    return (
      <Paper className={[classes.root,classes.scroll].join(" ")} elevation={4}
      >
        <Typography type="title" className={classes.title}>
          {this.state.users.length} users found
        </Typography>
        {this.state.loading?<Loader />:null}
        <List dense>
         {this.state.users.map((item, i) => {
          return <Link to={"/user/" + item._id} key={i}>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar src={"http://localhost:3001/api/v1/users/photo/"+item._id || profileImage}
                       />
                      </ListItemAvatar>
                      <ListItemText primary={item.name}/>
                      <ListItemSecondaryAction>
                      <IconButton>
                          <ArrowForward/>
                      </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                 </Link>
               })
             }
        </List>
      </Paper>
    )
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Users)
