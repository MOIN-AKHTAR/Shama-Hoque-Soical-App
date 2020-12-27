import React, {Component} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from '../auth/auth-helper'
import {removeProduct} from './product-api'

class DeleteProduct extends Component {
  state = {
    open: false,
    error:""
  }
  clickButton = () => {
    this.setState({open: true})
  }
  deleteProduct = () => {
    const jwt = auth.isAuthenticated()
    removeProduct({
      productId: this.props.product._id,
      shopId:this.props.shopId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error:data.error,open:false})
      } else {
        this.setState({open: false}, () => {
          this.props.onRemove(this.props.product)
        })
      }
    })
  }
  handleRequestClose = () => {
    this.setState({open: false,error:""})
  }
  render() {
    return (<span>
      <IconButton aria-label="Delete" onClick={this.clickButton} color="secondary">
        <DeleteIcon/>
      </IconButton>
      <Dialog open={this.state.open} onClose={this.handleRequestClose}>
        <DialogTitle>{"Delete "+this.props.product.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your product {this.props.product.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.deleteProduct} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
      open={this.state.error?true:false}
      onClose={this.handleRequestClose}
      fullWidth={true}
      maxWidth="xs"
      >
      <DialogTitle>{this.state.error}</DialogTitle>
      <DialogActions>
          <Button onClick={this.handleRequestClose} color="secondary" autoFocus="autoFocus">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

    </span>)
  }
}

export default DeleteProduct
