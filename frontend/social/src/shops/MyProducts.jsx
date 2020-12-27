import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CardMedia from '@material-ui/core/CardMedia';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Edit from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import {Link} from 'react-router-dom';
import NoLogo from '../assets/images/nologo.jpg'
import DeleteProduct from '../products/DeleteProduct';

const style=(theme)=>({
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle,
        fontSize: '1.2em'
      },
    leftIcon:{
        marginRight:"10px"
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
    image:{
        objectFit:"contain",
        height:100,
        width:100,
        marginRight:10
    }
})

class MyProducts extends Component {

    render() {
        const {classes}=this.props;
        return (
            <Card className={classes.root}>
                <Typography type="title" className={classes.title}>
                    Products  <span className={classes.addButton}>
            <Link to={"/seller/"+this.props.shopId+"/products/new"}>
              <Button color="primary" variant="text">
                <AddIcon className={classes.leftIcon} />New Product
              </Button>
            </Link>
          </span>
                </Typography>
                <List dense>
        {this.props.products?.map((product, i) => {
            return <span key={i}>
              <ListItem>
                <CardMedia
                  className={classes.image}
                  image={product.image?"http://localhost:3001/api/v1/products/image/"+product._id:NoLogo }
                  title={product.name}
                  component="img"
                />
                <div className={classes.details}>
                  <Typography type="headline" component="h2" color="primary" className={classes.productTitle}>
                    {product.name}
                  </Typography>
                  <Typography type="subheading" component="h4" className={classes.subheading}>
                    Quantity: {product.quantity} | Price: ${product.price}
                  </Typography>
                </div>
                <ListItemSecondaryAction>
                  <Link to={`/seller/shop/${this.props.shopId}/product/${product._id}/edit`}
                  >
                    <IconButton aria-label="Edit" color="primary">
                      <Edit/>
                    </IconButton>
                  </Link>
                  <DeleteProduct
                  product={product}
                  shopId={this.props.shopId}
                  onRemove={this.props.onRemove}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider/></span>})}
        </List>
            </Card>
        )
    }
}


export default  withStyles(style)(MyProducts);