import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import CartItems from './Cart-Items'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  }
})

class Cart extends Component {
  state = {
    checkout: false,
    stripe: null
  }


//   componentDidMount = () => {
//     if (window.Stripe) {
//       this.setState({stripe: window.Stripe(config.stripe_test_api_key)})
//     } else {
//       document.querySelector('#stripe-js').addEventListener('load', () => {
//         // Create Stripe instance once Stripe.js loads
//         this.setState({stripe: window.Stripe(config.stripe_test_api_key)})
//       })
//     }
//   }

  setCheckout = val =>{
    this.setState({checkout: val})
  }

  render() {
    const {classes} = this.props
    return (<div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={6} sm={6}>
          <CartItems />
        </Grid>
        {this.state.checkout &&
          <Grid item xs={6} sm={6}>
            <h1>CHECKOUT COMPONENT</h1>
          </Grid>}
        </Grid>
      </div>)
  }
}

export default withStyles(styles)(Cart)
