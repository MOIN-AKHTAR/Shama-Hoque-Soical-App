import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import PrivateRoute from './auth/privateRoute';
import Signup from './user/Signup';
import Signin from './auth/Signin';
import Users from './user/Users';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';
import NewShop from './shops/NewShop';
import Shops from './shops/Shops'
import MyShops from './shops/MyShops';
import Shop from './shops/Shop'
import EditShop from './shops/EditShop';

export default function MainRoute() {
    return (
      <React.Fragment>
           <Menu/>
          <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/users" component={Users}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/signin" component={Signin}/>
                <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
                <PrivateRoute path="/seller/shops" exact  component={MyShops} />
                <PrivateRoute path="/seller/shops/new" exact component={NewShop}/>
                <PrivateRoute path="/seller/shop/edit/:shopId" exact component={EditShop}/>
                <Route path="/shops/all" exact component={Shops}/>
                <Route path="/shops/:shopId" exact component={Shop}/>
                <Route path="/user/:userId" component={Profile}/>
          </Switch>
      </React.Fragment>
    )
}
