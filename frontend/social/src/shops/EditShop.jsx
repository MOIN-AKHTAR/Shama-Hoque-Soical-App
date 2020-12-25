import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import CardActions from '@material-ui/core/CardActions'
import {Redirect} from 'react-router-dom'
import NoLogoImage from '../assets/images/nologo.jpg';
import auth from '../auth/auth-helper'
import {getShop,updateShop} from './shop-api';
import PublishIcon from '@material-ui/icons/Publish'


const styles=(theme)=>({
    root: {
        flexGrow: 1,
        margin: 30,
      },
      hiddenInput:{
        display:"none"
      },
    card: {
        textAlign: 'center',
        paddingBottom: theme.spacing(2)
      },
      title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle,
        fontSize: '1.2em'
      },
      subheading: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
      },
      bigAvatar: {
        width: 60,
        height: 60,
        margin: '10px auto'
      },
      textField:{
          width:"400px"
      },
      submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2),
        marginTop:"-30px"
      }
})

 class Shop extends Component {

    state={
       id:"",
       name:"",
       logo:"",
       description:"",
       redirect:false,
       error:{},
       owner:"",
       changed:false
    }

    componentDidMount(){
        this.shopData=new FormData();
        getShop({shopId:this.props.match.params.shopId}).then(data=>{
            this.logo=data.logo;
            this.setState({
                id:data._id,
                name:data.name,
                logo:data.logo,
                description:data.description,
                owner: data.owner.name
            })
        })
    }



    handleChange=(name)=>event=>{
        const value=name==="logo"?event.target.files[0]:event.target.value;
        this.shopData.set(name,value);
        this.setState({
            [name]:value,
            changed:true
        })
   }

   customValidation=(body)=>{
    let error={};
    for (const key in body) {
        if(body[key].length===0){
           error[key]="Must not be empty"
        }
    }
    return error;
}


clickSubmit=(event)=>{
    event.preventDefault();
    const hasError=this.customValidation({name:this.state.name,description:this.state.description});

     if(Object.keys(hasError).length>0){
                this.setState({error:hasError})
     }else{
        const jwt=auth.isAuthenticated();
        updateShop({shopId:this.props.match.params.shopId},{t:jwt?.token},this.shopData).then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                 this.setState({
                    redirect:true
                 });
            }
        })
     }
   
}

    render() {
            const {classes}=this.props;
            if (this.state.redirect) {
                return (<Redirect to={'/seller/shops'}/>)
              }
    
            return (
<div className={classes.root}>
    <Grid container spacing={4}>
       <Grid itme xs={6}>
          <Card  className={classes.card}>
            <CardContent>
                <Typography
                      type="headline" component="h2" className={classes.title}
                >Edit Shop</Typography>
                <Avatar 
                src={this.logo?"http://localhost:3001/api/v1/shops/logo/"+this.state.id:NoLogoImage}
                className={classes.bigAvatar}
                />
                <input type="file" 
                className={classes.hiddenInput}
                id="shop-logo" accept="image/*"
                onChange={this.handleChange("logo")}
                />
                <label htmlFor="shop-logo">
                <Button variant="contained" color="primary" component="span"
                className={classes.uploadBtn}
                >
                    Upload
                    <PublishIcon/>
                </Button>
                </label>
                <span className={classes.filename}>{this.state.logo?.name&&this.state.logo.name}</span>
                <br/>
                <TextField 
                id="name" 
                label="Shop Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                helperText={this.state.error.name&&this.state.error.name}
                error={this.state.error.name?true:false}
                        /><br/>
                <TextField 
                id="description"
                label="Shop Description"
                multiline rows={2}
                className={classes.textField}
                value={this.state.description}
                onChange={this.handleChange('description')}
                margin="normal"
                helperText={this.state.error.description&&this.state.error.description}   
                error={this.state.error.description?true:false}    
                /><br/>
                <Typography type="subheading" component="h4" className={classes.subheading}>
                Owner: {this.state.owner}
              </Typography><br/>
                </CardContent>
                <CardActions>
                <Button color="primary" variant="text"
                 onClick={this.clickSubmit} 
                 className={classes.submit}
                 disabled={!this.state.changed}
                 >Update</Button>
                </CardActions>
                </Card>
                    </Grid>
                    <Grid item>
                        PRODUCT LIST
                    </Grid>
                       </Grid>
                          </div>
                
            )
        }
    }


export default withStyles(styles)(Shop);