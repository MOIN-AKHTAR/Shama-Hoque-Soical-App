import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import withStyles from '@material-ui/core/styles/withStyles'
import NoLogoImage from '../assets/images/nologo.jpg';
import {getShop} from './shop-api'


const styles=(theme)=>({
    root:{
        margin:30
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
        marginTop: theme.spacing(1),
        color: theme.palette.openTitle
      },
      bigAvatar: {
        width: 100,
        height: 100,
        margin: 'auto'
      }
})

 class Shop extends Component {

    state={
        shop:{
            name:"My Shoe Shop",
            descriprion:"Gte you favourite shoe here on appropriate price"
        }
    }

    componentDidMount(){
        getShop({shopId:this.props.match.params.shopId}).then(data=>{
            this.setState({shop:data})
        })
    }

    render() {

        const {classes}=this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={2}>
                   <Grid xs={4} item> 
                       <Card className={classes.card}>
                   <CardContent>
                      <Typography type="headline" component="h2" className={classes.title}>
                       {this.state.shop.name}
                    </Typography>
                    <br/>
                   <Avatar src={this.state.shop?._id&&this.state.shop?.logo?"http://localhost:3001/api/v1/shops/logo/"+this.state.shop?._id:NoLogoImage} className={classes.bigAvatar}/><br/>
                <Typography type="subheading" component="h2" className={classes.subheading}>
                  {this.state.shop.description}
                </Typography><br/>
            </CardContent>
          </Card>
            </Grid>
            <Grid item>
            <Typography>PRODUCT LISTS</Typography>
            </Grid>
              </Grid>
            </div>
        )
    }
}


export default withStyles(styles)(Shop);