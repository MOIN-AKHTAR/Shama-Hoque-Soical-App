import React, { Component } from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import auth from '../auth/auth-helper';
import {comment,uncomment} from './api-post'
import profileImage from '../assets/images/Anonymous.png';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';


const style=(theme)=>({
    cardHeader: {
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit
      },
    smallAvatar:{
        width:25,
        height:25
    },
    commentField: {
        width: '96%'
      },
    commentText: {
        backgroundColor: 'white',
        padding: theme.spacing.unit,
        margin: `2px ${theme.spacing.unit*2}px 2px 2px`
      },
      comment:{
        display:"block"
      },
    commentDate: {
        color: 'gray',
        fontSize: '0.8em'
     },
     commentDelete: {
        fontSize: '1.6em',
        cursor: 'pointer',
        verticalAlign:"top",
        marginTop:"-14px",
        color:"red"
      }
})

class comments extends Component {
   
  state = {text: '',expand:false}

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  handleExpand=(e)=>{
      this.setState((prevState)=>({
          expand:!prevState.expand
      }))
  }


  addComment = (event) => {
    if(event.keyCode === 13 && event.target.value){
      event.preventDefault()
      const jwt = auth.isAuthenticated()
      comment({
        userId: jwt.user._id
      }, {
        t: jwt.token
      }, this.props.postId, {text: this.state.text}).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          this.setState({text: ''})
          this.props.updateComments(data.comments)
        }
      })
    }
  }


  deleteComment = comment => event => {
    const jwt = auth.isAuthenticated()
    uncomment({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.props.postId, comment).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.props.updateComments(data.comments)
      }
    })
  }

    render() {
        const {classes}=this.props;
       
        const commentBody = item => {
            return (
              <p className={classes.commentText}>
                <Link to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link><br/>
                <span className={classes.comment}>{item.text}</span>
                <span className={classes.commentDate}>
                  {(new Date(item.created)).toDateString()} |
                </span>
                {auth.isAuthenticated()&&auth.isAuthenticated().user._id === item.postedBy._id &&
              <IconButton onClick={this.deleteComment(item)} className={classes.commentDelete}>
                  <DeleteIcon />
            </IconButton> }
              </p>
            )
          }

        return (
            <div>
                <CardHeader
                  avatar={
                    auth.isAuthenticated()&&<Avatar
                      className={classes.smallAvatar}
                       src={'http://localhost:3001/api/v1/users/photo/'+auth.isAuthenticated().user._id || profileImage}
                      />
                  }
                  title={ auth.isAuthenticated()&&<TextField
                onKeyDown={this.addComment}
                multiline
                value={this.state.text}
                onChange={this.handleChange('text')}
                placeholder="Write something ..."
                className={classes.commentField}
                margin="normal"
                />}
                className={classes.cardHeader}
                />
            { 
        <Accordion expanded={this.state.expand} onChange={this.handleExpand}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
          color="textSecondary"
          variant="h6"
          align="center"
          >
              {this.props.comments.length} Comments
          </Typography>
        </AccordionSummary>
                {this.props.comments.map((item, i) => {
            return <CardHeader
                      avatar={
                        <Avatar className={classes.smallAvatar} src={'http://localhost:3001/api/v1/users/photo/'+item.postedBy._id || profileImage}/>
                      }
                      title={commentBody(item)}
                      className={classes.cardHeader}
                      key={i}/>
              })}  
        </Accordion>}
            </div>
        )
        
    }
}


export default withStyles(style)(comments);