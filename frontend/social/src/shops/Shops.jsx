import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper'
import {getAllShops} from './shop-api';
import  Typography  from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NoLogoImage from '../assets/images/nologo.jpg';
import Loader from '../utils/Loader'

const styles=(theme)=>({
    root:{
        width:"600px",
        margin:"30px auto",
        padding: theme.spacing(3),
        maxWidth:"80%"
    },
    scroll:{
        maxWidth:"700px",
        margin:"30px auto",
        maxHeight:"700px",
        overflowY:"scroll",
        "&::-webkit-scrollbar":{
          display: "none"
      }},
    title: {
        margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.protectedTitle,
        textAlign: 'center',
        fontSize: '1.2em'
      },
      avatar:{
        width: 100,
        height: 100
      },
      details: {
        padding: '24px'
      },
      link:{
          textDecoration:"none",
          color:"inherit"
      }
})

 class Shops extends Component {

    state={
        shops:[],
        loading:true
    }

    componentDidMount(){
        getAllShops().then(data=>{
            this.setState({
                shops:data,
                loading:false
            })
        })
    }


    render() {
        const {classes}=this.props;
        return (
            <div >
                <Paper className={[classes.root,classes.scroll].join(" ")} elevation={4}>
                  <Typography type="title" className={classes.title} >{this.state.shops.length} shops found</Typography>
                  {this.state.loading?<Loader/>:null}
                 <List>
                    {
                    this.state.shops.map(shop=>(
                        <Link to={`/shops/${shop._id}`} key={shop._id} className={classes.link} >
                        <Divider/>
                            <ListItem>
                              <ListItemAvatar>
                                  <Avatar src={shop.logo?`http://localhost:3001/api/v1/shops/logo/${shop._id}`:NoLogoImage} className={classes.avatar} />
                              </ListItemAvatar>
                            <div className={classes.details}>
                                <Typography type="headline" component="h2" color="primary" className={classes.shopTitle}>
                                    {shop.name}
                                </Typography>
                                <Typography type="subheading" component="h4" className={classes.subheading}>
                                    {shop.description}
                                </Typography>
                            </div>
                            </ListItem>
                        <Divider/>
                        </Link>
                    ))
                    }
                </List>
                </Paper>
                
            </div>
        )
    }
}


export default withStyles(styles)(Shops);