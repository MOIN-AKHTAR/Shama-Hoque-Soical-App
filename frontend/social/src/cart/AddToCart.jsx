import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'
import AddCartIcon from '@material-ui/icons/AddShoppingCart';
import DisabledCartIcon from '@material-ui/icons/RemoveShoppingCart';
import {addItem} from './cart-api'
import { Redirect } from 'react-router-dom'

const styles = theme => ({
  iconButton: {
    width: '28px',
    height: '28px'
  },
  disabledIconButton: {
    color: '#7f7563',
    width: '28px',
    height: '28px'
  }
})

class AddToCart extends Component {
  state = {
    redirect: false
  }
  addToCart = () => {
    addItem(this.props.item, () => {
      this.setState({redirect:true})
    })
  }
  render() {
    if (this.state.redirect) {
      return (<Redirect to={'/cart'}/>)
    }
    const {classes} = this.props

    return (<span>
      {this.props.item.quantity >= 0 ?
        <IconButton color="secondary" dense="dense" onClick={this.addToCart}>
          <AddCartIcon className={this.props.cartStyle || classes.iconButton}/>
        </IconButton> :
        <IconButton disabled={true} color="secondary" dense="dense">
          <DisabledCartIcon className={this.props.cartStyle || classes.disabledIconButton}/>
        </IconButton>}
      </span>)
  }
}



export default withStyles(styles)(AddToCart)