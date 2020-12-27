import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton'
import Products from './Products';
import {list} from './product-api'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    width:'100%',
    transform: 'translateZ(0)',
  },
  tileTitle: {
    verticalAlign: 'middle',
    lineHeight: 2.5,
    textAlign: 'center',
    fontSize: '1.5em',
    margin: '0 4px 0 0',
  },
  card: {
    margin: 'auto',
    marginTop: 20
  },
  title: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle,
    backgroundColor: '#80808024',
    fontSize: '1.1em'
  },
  icon: {
    verticalAlign: 'sub',
    color: '#738272',
    fontSize: '0.9em'
  },
  link: {
    color: '#4d6538',
    textShadow: '0px 2px 12px #ffffff',
    cursor:'pointer'
  }
})

class Categories extends Component {
  state = {
    products: [],
    selected: ''
  }
//   componentWillReceiveProps = (props) => {
//     this.setState({selected: props.categories[0]})
//     list({
//       category: props.categories[0]
//     }).then((data) => {
//       if (data.error) {
//         console.log(data.error)
//       } else {
//         this.setState({products: data})
//       }
//     })
//   }

  listbyCategory = category => event => {
    this.setState({selected: category})
    list({
      category: category
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({products: data,searched:true})
      }
    })
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <Card className={classes.card}>
          <Typography type="title" className={classes.title}>
            Explore by category
          </Typography>
          <div className={classes.root}>
            <GridList className={classes.gridList} cols={2}>
              {this.props.categories.map((tile, i) => (
                <GridListTile key={i} className={classes.tileTitle} style={{height: '64px', backgroundColor: this.state.selected == tile? 'rgba(95, 139, 137, 0.56)':'rgba(95, 124, 139, 0.32)'}}>
                  <span className={classes.link} onClick={this.listbyCategory(tile)}>{tile}  <IconButton className={classes.icon}>{this.state.selected == tile && <ArrowDropDown/>}</IconButton></span>
                </GridListTile>
              ))}
            </GridList>
          </div>
          <Divider/>
          <Products products={this.state.products} searched={false}/>
        </Card>
      </div>
    )
  }
}


export default withStyles(styles)(Categories)
