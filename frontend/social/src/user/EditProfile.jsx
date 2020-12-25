import React, {Component} from 'react'
import {Card,CardActions, CardContent} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import auth from '../auth/auth-helper'
import {read,update} from './user-api'
import {Redirect} from 'react-router-dom';
import PublishIcon from '@material-ui/icons/Publish';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch'
import profileImage from '../assets/images/Anonymous.png'


const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  isSeller:{
    display:"block",
    margin:"10px auto"
  },
  subheading: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  label:{
    marginRight:"20px",
    fontWeight:"bold"
  }
})

class EditProfile extends Component {
  constructor({match}) {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      about:'',
      redirectToProfile: false,
      seller:false,
      error: ''
    }
    this.match = match
  }

  componentDidMount = () => {
    const jwt = auth.isAuthenticated();
    this.userData=new FormData();
    read({
      userId: this.match.params.userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
         this.photoUrl = data._id
    ? `http://localhost:3001/api/v1/users/photo/${data._id}?${new Date().getTime()}`
    : profileImage;
        this.setState({id: data._id,name: data.name, email: data.email,about:data.about,seller:data.seller})
      }
    })
  }
  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    update({
      userId: this.match.params.userId
    }, {
      t: jwt.token
    }, this.userData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        auth.updateUse(data,()=>{
          this.setState({'userId': data._id, 'redirectToProfile': true})
        })
        
      }
    })
  }
  handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    this.userData.set(name, value)
    this.setState({ [name]: value });
  }

  handleCheck = (event, checked) => {
    this.userData.set("seller",checked);
    this.setState({seller: checked})
  }

  render() {
    const {classes} = this.props
    if (this.state.redirectToProfile) {
      return (<Redirect to={'/user/' + this.state.userId}/>);
    }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Edit Profile
          </Typography>
          <Avatar src={this.photoUrl} className={classes.bigAvatar}/><br/>
          <input accept="image/*" onChange={this.handleChange('photo')} className={classes.input} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <Button variant="raised" color="default" component="span">
              Upload
              <PublishIcon/>
            </Button>
            </label>
            <span className={classes.filename}>{this.state.photo ? this.state.photo.name : ''}</span>
            <br/>
          <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/><br/>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal"/><br/>
          <TextField
            id="multiline-flexible"
            label="About"
            multiline
            rows="2"
            value={this.state.about}
            onChange={this.handleChange('about')}
            className={classes.textField}
            margin="normal"
          /><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
          <Typography type="subheading" component="h4" className={classes.subheading}>
            Seller Account
          </Typography>
          <FormControlLabel
            control={
                <Switch
              checked={this.state.seller}
              onChange={this.handleCheck}
              />
            }
            label={this.state.seller? 'Active' : 'Inactive'}
            className={classes.isSeller}
          />
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditProfile)
