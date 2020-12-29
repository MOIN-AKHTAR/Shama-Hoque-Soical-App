import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from '../auth/auth-helper';
import Badge from '@material-ui/core/Badge';
import CartIcon from '@material-ui/icons/ShoppingCart';
import {Link, withRouter} from 'react-router-dom';
import {itemTotal} from '../cart/cart-api';

const isActive = (history, path) => {
  if (history.location.pathname === path)
    return {color: '#ff4081'}
  else
    return {color: '#ffffff'}
}



const Menu = withRouter(({history}) => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit">
          MERN Skeleton
        </Typography>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <HomeIcon/>
          </IconButton>
        </Link>
        {auth.isAuthenticated().user&&<React.Fragment>
          <Link to="/shops/all">
            <Button style={isActive(history, "/shops/all")}>All Shops</Button>
          </Link>
          <Link to="/cart">
            <Button style={isActive(history, "/cart")}>
              Cart
              <Badge color="secondary" badgeContent={itemTotal()} style={{'marginLeft': '7px'}}>
                <CartIcon />
              </Badge>
            </Button>
          </Link>
          </React.Fragment>  }    
        {
          auth.isAuthenticated().user?.seller&&<Link to="/seller/shops">
          <Button  style={isActive(history, "/seller/shops")}>
            My Shops
          </Button>
        </Link>
        }
        <Link to="/users">
          <Button style={isActive(history, "/users")}>Users</Button>
        </Link>
        {
          !auth.isAuthenticated() && (<span>
            <Link to="/signup">
              <Button style={isActive(history, "/signup")}>Sign up
              </Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive(history, "/signin")}>Sign In
              </Button>
            </Link>
          </span>)
        }
        {
          auth.isAuthenticated() && (<span>
            <Link to={"/user/" + auth.isAuthenticated().user._id}>
              <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
            </Link>
            <Button color="inherit" onClick={() => {
                auth.signout(() => history.push('/'))
              }}>Sign out</Button>
          </span>)
        }
      </Toolbar>
    </AppBar>
  )
})

export default Menu



