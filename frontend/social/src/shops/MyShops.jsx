import React, { Component } from 'react';
import auth from '../auth/auth-helper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddBox from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom'
import {getByOwner} from './shop-api';
import NoLogoImage from '../assets/images/nologo.jpg';
import DeleteShop from './DeleteShop'




const styles = theme => ({
    root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      padding: theme.spacing(3),
      marginTop: theme.spacing(5)
    }),
    title: {
      margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px` ,
      color: theme.palette.protectedTitle,
      fontSize: '1.2em'
    },
    addButton:{
      float:'right',
      "& a":{
          textDecoration:"none",
          display: "block",
          backgroundColor: "#607c8b",
          "& button":{
              color:"#fff"
          }
      }
    },
    leftIcon: {
      marginRight: "8px"
    }
  })


 class MyShops extends Component {
    state={
        shops:[]
    }
    componentDidMount(){
        const jwt=auth.isAuthenticated();
        getByOwner({userId:jwt.user?._id},{t:jwt.token}).then(data=>{
            this.setState({
                shops:data
            })
        })
    }

    substring=string=>string.length>=50?string.substring(0,47)+"...":string;

    removeShop = (shop) => {
        const updatedShops = this.state.shops
        const index = updatedShops.indexOf(shop)
        updatedShops.splice(index, 1)
        this.setState({shops: updatedShops})
      }

    render() {
        const {classes}=this.props;
        return (
            <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Your Shops
          <span className={classes.addButton}>
            <Link to="/seller/shops/new">
              <Button color="primary" variant="raised">
                <AddBox className={classes.leftIcon}/>  New Shop
              </Button>
            </Link>
          </span>
        </Typography>
        <List dense>
        {this.state.shops.map((shop, i) => {
            return   <span key={i}>
              <ListItem component={Link} to={`/shops/${shop._id}`} >
                <ListItemAvatar>
                <Avatar src={shop.logo?`http://localhost:3001/api/v1/shops/logo/${shop._id}`:NoLogoImage} className={classes.avatar} />
                </ListItemAvatar>
                <ListItemText primary={shop.name} secondary={this.substring(shop.description)}/>
                { auth.isAuthenticated().user && auth.isAuthenticated().user._id === shop.owner._id &&
                  (<ListItemSecondaryAction>
                    <Link to={"/seller/shop/edit/" + shop._id}>
                      <IconButton aria-label="Edit" color="primary">
                        <EditIcon/>
                      </IconButton>
                    </Link>
                    <DeleteShop
                      shop={shop}
                      onRemove={this.removeShop}
                     />
                  </ListItemSecondaryAction>)
                }
              </ListItem>
              <Divider/>
            </span>})}
        </List>
      </Paper>
    </div>
        )
    }
}


export default withStyles(styles)(MyShops)