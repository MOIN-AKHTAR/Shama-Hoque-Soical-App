import React from 'react';
import Button from '@material-ui/core/Button';
import {follow,unfollow} from './user-api';
import auth from '../auth/auth-helper'

export default function ProfileButtons(props) {
    const followClick = () => {
        props.onButtonClick(follow)
      }
    const unfollowClick = () => {
        props.onButtonClick(unfollow)
      }

    return (<React.Fragment>
          { auth.isAuthenticated()?(props.following
            ? (<Button variant="text" color="secondary" onClick={unfollowClick}>Unfollow</Button>)
            : (<Button variant="text" color="primary" onClick={followClick}>Follow</Button>)):null
          }
        </React.Fragment>)
}
