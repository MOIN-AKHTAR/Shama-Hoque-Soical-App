import React, {Component} from 'react'
import auth from '../auth/auth-helper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import withStyles from '@material-ui/core/styles/withStyles'
import {getCart,updateCart,removeItem} from './cart-api'
import {Link} from 'react-router-dom'
import  IconButton  from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const styles = theme => ({
  card: {
    margin: '24px 0px',
    padding: '16px 40px 60px 40px',
    backgroundColor: '#80808017'
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.openTitle,
    fontSize: '1.2em'
  },
  price: {
    color: theme.palette.text.secondary,
    display: 'inline'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 0,
    width: 50
  },
  productTitle: {
    fontSize: '1.15em',
    marginBottom: '5px'
  },
  subheading: {
    color: 'rgba(88, 114, 128, 0.67)',
    padding: '8px 10px 0',
    cursor: 'pointer',
    display: 'inline-block'
  },
  cart: {
    width: '100%',
    display: 'inline-flex'
  },
  details: {
    display: 'inline-block',
    width: "100%",
    padding: "4px"
  },
  content: {
    flex: '1 0 auto',
    padding: '16px 8px 0px'
  },
  cover: {
    width: 160,
    height: 125,
    margin: '8px'
  },
  itemTotal: {
    float: 'right',
    marginRight: '40px',
    fontSize: '1.5em',
    color: 'rgb(72, 175, 148)'
  },
  checkout: {
    float: 'right',
    margin: '24px'
  },
  total: {
    fontSize: '1.2em',
    color: 'rgb(53, 97, 85)',
    marginRight: '16px',
    fontWeight: '600',
    verticalAlign: 'bottom'
  },
  continueBtn: {
    marginLeft: '10px'
  },
  itemShop: {
    display: 'block',
    fontSize: '0.90em',
    color: '#78948f'
  },
  removeButton: {
    fontSize: '0.8em'
  }
})

class CartItems extends Component {
  state = {
    cartItems: [],
  }

  componentDidMount = () => {
    this.setState({cartItems: getCart()})
  }

  inCrease = index =>  {
    let cartItems = this.state.cartItems
      cartItems[index].quantity = cartItems[index].quantity+1;
    this.setState({cartItems: cartItems})
    updateCart(index, cartItems[index].quantity)
  }

deCrease=(index)=>{
    let cartItems = this.state.cartItems
      cartItems[index].quantity = cartItems[index].quantity-1;
      if(cartItems[index].quantity===0){
          this.remove(index)
      }else{
       updateCart(index, cartItems[index].quantity);
       this.setState({cartItems: cartItems});
      }
    
}

  getTotal(){
    return this.state.cartItems.reduce((a, b) => {
        return a + (b.quantity*b.product.price)
    }, 0)
  }

  remove=(index)=>{
    let cartItems = removeItem(index)
    this.setState({cartItems: cartItems})
  }

  removeItem = index => event =>{
    let cartItems = removeItem(index)
    this.setState({cartItems: cartItems})
  }

//   openCheckout = () => {
//     this.props.setCheckout(true)
//   }

  render() {
    const {classes} = this.props
    return (<Card className={classes.card}>
      <Typography type="title" className={classes.title}>
        Shopping Cart
      </Typography>
      {this.state.cartItems?.length>0 ? (<span>
          {this.state.cartItems.map((item, i) => {
            return <span key={i}><Card className={classes.cart}>
              <CardMedia
                className={classes.cover}
                image={'/api/product/image/'+item.product._id}
                title={item.product.name}
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Link to={'/product/'+item.product._id}><Typography type="title" component="h3" className={classes.productTitle} color="primary">{item.product.name}</Typography></Link>
                  <div>
                    <Typography type="subheading" component="h3" className={classes.price} color="primary">$ {item.product.price}</Typography>
                    <span className={classes.itemTotal}>${item.product.price * item.quantity}</span>
                    <span className={classes.itemShop}>Shop: {item.product.productShop.name}</span>
                  </div>
                </CardContent>
                <div className={classes.subheading}>
                  Quantity: <span>{item.quantity}</span>
                            <IconButton onClick={()=>this.inCrease(i)}>
                                <AddIcon/>
                            </IconButton >
                            <IconButton onClick={()=>this.deCrease(i)}>
                                <RemoveIcon />
                            </IconButton>
                            <Button className={classes.removeButton} color="primary" onClick={this.removeItem(i)}>x Remove</Button>
                </div>
              </div>
            </Card>
            <Divider/>
          </span>})
        }
        <div className={classes.checkout}>
          <span className={classes.total}>Total: ${this.getTotal()}</span>
          <Link to='/' className={classes.continueBtn}>
            <Button variant="raised">Continue Shopping</Button>
          </Link>
        </div>
      </span>) :
      <Typography type="subheading" component="h3" color="primary">No items added to your cart.</Typography>
    }
    </Card>)
  }
}

export default withStyles(styles)(CartItems)
