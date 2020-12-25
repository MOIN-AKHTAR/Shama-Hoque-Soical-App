import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import TextField from '@material-ui/core/TextField';
import {Link,Redirect} from 'react-router-dom';
import {creatShop} from './shop-api';
import auth from '../auth/auth-helper';


const styles=(theme)=>({
    card:{
        maxWidth:"600px",
        margin:"30px auto",
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle,
        fontSize: '1.5em'
      },
    hiddenInput:{
        display:"none"
    },
    uploadBtn:{
          margin:"10px auto"
      },
    filename:{
        marginLeft:'10px'
      },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "300px"
      },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2),
        textDecoration:"none"
      }
})

class NewShop extends Component {

    state={
        name:"",
        description:"",
        logo:"",
        error:{},
        redirect:false
    }


    componentDidMount(){
        this.shopData=new FormData();
    }

    handleChange=(name)=>event=>{
         const value=name==="logo"?event.target.files[0]:event.target.value;
         this.shopData.set(name,value);
         this.setState({
             [name]:value
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
            creatShop({userId:jwt.user?._id},{t:jwt?.token},this.shopData).then(data=>{
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
            <Card 
            className={classes.card}
            >
              <CardContent>
                  <Typography
                  type="headline" component="h2" className={classes.title}
                  >New Shop</Typography>
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
            <span className={classes.filename}>{this.state.logo ? this.state.logo.name : ''}</span>
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
            multiline rows={3}
            className={classes.textField}
            value={this.state.description}
            onChange={this.handleChange('description')}
            margin="normal"
            helperText={this.state.error.description&&this.state.error.description}   
            error={this.state.error.description?true:false}    
                   /><br/>
              </CardContent>
              <CardActions>
          <Button color="primary" variant="text" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
          <Link to='/seller/shops' className={classes.submit}><Button variant="text" color="default">Cancel</Button></Link>
        </CardActions>
            </Card>
        )
    }
}

export default withStyles(styles)(NewShop);
