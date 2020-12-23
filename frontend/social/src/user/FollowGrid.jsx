import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import profileImage from '../assets/images/Anonymous.png';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit*2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  gridList: {
    width: 500
  },
  tileText: {
    textAlign: 'center',
    marginTop: 10
  },
  link:{
      textDecoration:"none",
      color:"#000",
      "& div":{
          margin:"auto"
      }
  }
})
class FollowGrid extends Component {
  render() {
    const {classes} = this.props
    return (<div className={classes.root}>
      {
        this.props.people?.length===0?(
        <Typography
        color="error"
        variant="h4"
        style={{
          textAlign:"center"
        }}
        >
          {this.props.type==="following"?"No Following":"No Follower"}
        </Typography>
        ):(
          <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {this.props.people?.map((person, i) => {
           return  <GridListTile style={{'height':120}} key={i}>
              <Link to={"/user/" + person._id} 
              className={classes.link}
              >
              <Avatar src={"http://localhost:3001/api/v1/users/photo/"+person._id || profileImage} />
                <Typography className={classes.tileText}>{person.name}</Typography>
              </Link>
            </GridListTile>
        })}
      </GridList>
        )
      }
    </div>)
  }
}

export default withStyles(styles)(FollowGrid)
