import React, {Component} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog  from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import auth from '../auth/auth-helper'
import {removeShop} from './shop-api'

class DeleteShop extends Component {
  state = {
    open: false,
    error:""
  }
  clickButton = () => {
    this.setState({open: true})
  }
  clearError=()=>{
    this.setState({
      error:""
    })
  }
  deleteShop = () => {
    const jwt = auth.isAuthenticated()
    removeShop({
      shopId: this.props.shop._id
    }, {t: jwt.token}).then((data) => {
      if (data&&data.error) {
       this.setState({
         error:data.error,
         open:false
       })
      } else {
        this.setState({open: false}, () => {
          this.props.onRemove(this.props.shop)
        })
      }
    })
  }
  handleRequestClose = () => {
    this.setState({open: false})
  }
  render() {
    return (<span>
      <IconButton aria-label="Delete" onClick={this.clickButton} color="secondary">
        <DeleteIcon/>
      </IconButton>

      <Dialog open={this.state.open} onClose={this.handleRequestClose}>
        <DialogTitle>{"Delete "+this.props.shop.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your shop {this.props.shop.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.deleteShop} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
      open={this.state.error?true:false}
      onClose={this.clearError}
      fullWidth={true}
      maxWidth="xs"
      >
      <DialogTitle>{this.state.error}</DialogTitle>
      <DialogActions>
          <Button onClick={this.clearError} color="secondary" autoFocus="autoFocus">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </span>)
  }
}

export default DeleteShop
