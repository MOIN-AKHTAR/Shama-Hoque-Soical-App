import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';


const styles=()=>({
   root: {
       margin:"10px auto",
        textAlign:"center"
      }
})

 class Loader extends Component {
    render() {
        const {classes}=this.props;
        return (
            <div className={classes.root}>
                <CircularProgress disableShrink  />
            </div>
        )
    }
}


export default withStyles(styles)(Loader);