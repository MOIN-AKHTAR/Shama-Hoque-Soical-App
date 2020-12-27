import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import seashellImg from '../assets/images/seashell.jpg';
import auth from '../auth/auth-helper';
import FindPeople from '../user/FindPeopls'
import NewFeed from '../posts/newFeed'
import Suggestion from '../products/Suggestion';
import {getLatestProducts} from '../products/product-api'
import Paper from '@material-ui/core/Paper'
import Loader from '../utils/Loader'

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  },
  paper:{
    width: "600px",
    margin: "20px auto",
    padding: "20px 0px !important",
    border: "none",
    padding: "20px 0px",
    boxShadow: "none"
  }
})

class Home extends Component {
  state={
    defaultPage:true,
    products:[],
    loading:true
  }

  init = () => {
  if(auth.isAuthenticated()){
    getLatestProducts().then(data=>{
      if(data.error){
        this.setState({
          error:data.error,
          loading:false
        })
      }else{
        this.setState({
          defaultPage:false,
          products:data,
          loading:false
        })
      }
    })
  }else{
    this.setState({defaultPage: true,loading:false})}
  }
  componentWillReceiveProps = () => {
    this.init()
  }
  componentDidMount = () => {
    this.init();
  }


  render() {
    const {classes} = this.props
    return (
        <React.Fragment>
          {this.state.loading?(<Paper className={classes.paper}><Loader/></Paper>)
       :(
          <React.Fragment>
        {this.state.defaultPage &&
          <Grid container >
            <Grid item xs={12}>
            <Card className={classes.card}>
          <Typography type="headline" component="h2" className={classes.title}>
            Home Page
          </Typography>
          <CardMedia className={classes.media} image={seashellImg} title="Unicorn Shells"/>
          <CardContent>
            <Typography type="body1" component="p">
              Welcome to the MERN Skeleton home page.
            </Typography>
          </CardContent>
        </Card>
            </Grid>
          </Grid>
        }
        {!this.state.defaultPage &&
         <div style={{margin:"20px"}}>
         <Grid container spacing={2} justify="center">
            <Grid item xs={12} sm={8} md={6} >
              <NewFeed />
            </Grid>
            <Grid item xs={10} sm={8} md={6}>
              <FindPeople/>
              <Suggestion
              products={this.state.products}
              title="Latest Products"
               />
            </Grid>
            <Grid />
          </Grid>
         </div>
        }
        </React.Fragment>
        )}
        </React.Fragment>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
