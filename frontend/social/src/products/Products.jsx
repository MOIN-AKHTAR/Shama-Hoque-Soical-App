import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom';
import NoLogo from '../assets/images/nologo.jpg';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    textAlign: 'left',
    padding: '0 8px'
  },
  container: {
    minWidth: '100%',
    paddingBottom: '14px'
  },
  gridList: {
    width: '100%',
    minHeight: 200,
    padding: '16px 0 10px'
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: '100%'
  },
  tile: {
    textAlign: 'center'
  },
  image: {
    height: '100%',
    width:"100%",
    objectFit:"contain"
  },
  tileBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    textAlign: 'left'
  },
  tileTitle: {
    fontSize:'1.1em',
    marginBottom:'5px',
    color:'rgb(189, 222, 219)',
    display:'block'
  }
})
class Products extends Component {
  render() {
    const {classes} = this.props;
    console.log(this.props)
    return (
      <div className={classes.root}>
      {this.props.products?.length > 0 ?
        (<div className={classes.container}>
          <GridList cellHeight={200} className={classes.gridList} cols={3}>
          {this.props.products.map((product, i) => (
            <GridListTile key={i} className={classes.tile}>
              <Link to={"/product/"+product._id}><img className={classes.image} src={product.image?"http://localhost:3001/api/v1/products/image/"+product._id:NoLogo} alt={product.name} /></Link>
              <GridListTileBar className={classes.tileBar}
                title={<Link to={"/product/"+product._id} className={classes.tileTitle}>{product.name}</Link>}
                subtitle={<span>$ {product.price}</span>}
               //Add To Cart Component Will Come Here
              />
            </GridListTile>
          ))}
        </GridList></div>):this.props.searched && (<Typography type="subheading" component="h4" className={classes.title}>No products found! :(</Typography>)
  }
      </div>)
  }
}


export default withStyles(styles)(Products)
