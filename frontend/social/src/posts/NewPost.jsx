import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import auth from '../auth/auth-helper';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import profileImage from '../assets/images/Anonymous.png';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {create} from './api-post'

const styles=(theme)=>({
    root: {
        backgroundColor: '#efefef',
        padding: `${theme.spacing(3)}px 0px 1px`
      },
    card: {
        maxWidth:600,
        margin: 'auto',
        marginBottom: theme.spacing(3),
        backgroundColor: 'rgba(65, 150, 136, 0.09)',
        boxShadow: 'none'
      },
      cardHeader: {
        paddingTop: 8,
        paddingBottom: 8
      },
      cardContent: {
        backgroundColor: 'white',
        paddingTop: 0,
        paddingBottom: 0
      },
      textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: '90%'
      },
      photoButton: {
        height: 30,
        marginBottom: 5
      },
      input: {
        display: 'none',
      },
      submit: {
        margin: theme.spacing(2)
      },
      filename:{
        verticalAlign: 'super'
      }
})

class NewPost extends Component {

    state={
        user:{},
        text:"",
        photo:"",
        error:"HI"
    }

    componentDidMount(){
        this.postData = new FormData()
        this.setState({user: auth.isAuthenticated().user})
    }



      clickPost = () => {
        const jwt = auth.isAuthenticated()
        create({
          userId: jwt.user._id
        }, {
          t: jwt.token
        }, this.postData).then((data) => {
          if (data.error) {
            this.setState({error: data.error})
          } else {
            this.setState({text:'', photo: ''});
            console.log(data);
            this.props.addUpdate(data)
          }
        })
      }

      handleChange = name => event => {
        const value = name === 'photo'
          ? event.target.files[0]
          : event.target.value
        this.postData.set(name, value)
        this.setState({ [name]: value })
      }


    render() {
        const {classes}=this.props;
        return (
            <div className={classes.root}>
            <Card className={classes.card}>
            <CardHeader
            avatar={
              <Avatar src={'http://localhost:3001/api/v1/users/photo/'+this.state.user._id || profileImage}/>
            }
            title={this.state.user.name}
            className={classes.cardHeader}
          />
          <CardContent className={classes.cardContent}>
          <TextField
            placeholder="Share your thoughts ..."
            multiline
            rows="3"
            value={this.state.text}
            onChange={this.handleChange('text')}
            className={classes.textField}
            margin="normal"
        />
        <input accept="image/*" onChange={this.handleChange('photo')} className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="secondary" className={classes.photoButton} component="span">
            <PhotoCamera />
          </IconButton>
        </label> <span className={classes.filename}>{this.state.photo ? this.state.photo.name : ''}</span>
          </CardContent>
          <CardActions>
        <Button color="primary" variant="text"  onClick={this.clickPost} className={classes.submit}>POST</Button>
      </CardActions>
            </Card>
        </div>
        )
    }
}


export default withStyles(styles)(NewPost);
