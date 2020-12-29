import React, {Component} from 'react'
import Card from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
// import {read, listRelated} from './api-product.js'
import {Link} from 'react-router-dom'
// import Suggestions from './../product/Suggestions'
// import AddToCart from './../cart/AddToCart';
import {getProduct} from './product-api'
import IconButton from '@material-ui/core/IconButton';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import NoLogo from '../assets/images/nologo.jpg';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddToCart from '../cart/AddToCart'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  flex:{
    display:'flex'
  },
  card: {
    padding:'24px 40px 40px'
  },
  subheading: {
    margin: '24px',
    color: theme.palette.openTitle
  },
  price: {
    padding: '16px',
    margin: '16px 0px',
    display: 'flex',
    backgroundColor: '#93c5ae3d',
    fontSize: '1.3em',
    color: '#375a53',
  },
  media: {
    height: 200,
    display: 'inline-block',
    width: '50%',
    marginLeft: '24px',
    objectFit:"contain"
  },
  icon: {
    verticalAlign: 'sub'
  },
  link:{
    color: '#3e4c54b3',
    fontSize: '0.9em'
  },
  addCart: {
    width: '35px',
    height: '35px',
    padding: '10px 12px',
    borderRadius: '0.25em',
    backgroundColor: '#5f7c8b',
    color:"lightgreen"
  },
  action: {
    margin: '8px 24px',
    display: 'inline-block'
  }
})

class Product extends Component {
  constructor({match}) {
    super()
    this.state = {
    //   product: {shop: {}},
      product:{},
      suggestions: [],
      suggestionTitle: 'Related Products'
    }
    this.match = match
  }
  loadProduct = (productId) => {
      getProduct({productId: productId}).then(data=>{
          if(data.error){
              console.log(data.error);
          }
          else{
              this.setState({
                  product:data
              })
          }
      })
    // read({productId: productId}).then((data) => {
    //   if (data.error) {
    //     this.setState({error: data.error})
    //   } else {
    //     this.setState({product: data})
    //     listRelated({
    //       productId: data._id}).then((data) => {
    //       if (data.error) {
    //         console.log(data.error)
    //       } else {
    //         this.setState({suggestions: data})
    //       }
    //     })
    //  }
    // })
  }
  componentDidMount = () => {
    this.loadProduct(this.match.params.productId)
  }
  
  render() {
    const {classes} = this.props
    return (
        <div className={classes.root}>
          <Grid container spacing={40}>
            <Grid item xs={7} sm={7}>
                <Paper>
              <Card className={classes.card}>
                <CardHeader
                  title={this.state.product.name}
                  subheader={this.state.product.quantity > 0? 'In Stock': 'Out of Stock'}
                  action={<span>
                    <AddToCart 
                    item={this.state.product}
                    cartStyle={classes.addCart}
                     />
                  </span>
                  }
                />
                <div className={classes.flex}>
                  <CardMedia
                    className={classes.media}
                    image={this.state.product.image?"http://localhost:3001/api/v1/products/image/"+this.state.product._id:NoLogo}
                    title={this.state.product?.name}
                    component="img"
                  />
                  <Typography component="p" type="subheading" className={classes.subheading}>
                    {this.state.product.description}<br/>
                    <span className={classes.price}>$ {this.state.product.price}</span>
                    <Link to={'/shops/'+this.state.product.productShop?._id} className={classes.link}>
                      <span>
                          <IconButton>
                              <ShoppingBasket className={classes.icon} />
                          </IconButton>
                      </span>
                    </Link>
                    <span>{this.state.product.productShop?.name}</span>
                  </Typography>
                </div>
              </Card>
              </Paper>
            </Grid>
          </Grid>
        </div>)
  }
}

export default withStyles(styles)(Product)
