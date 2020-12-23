import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import PrivateRoute from './auth/privateRoute';
import Signup from './user/Signup';
import Signin from './auth/Signin';
import Users from './user/Users';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile'

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
                <Route path="/user/:userId" component={Profile}/>
          </Switch>
      </React.Fragment>
    )
}
