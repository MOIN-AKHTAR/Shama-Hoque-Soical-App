import React, {Component} from 'react'
import Card  from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import FileUpload from '@material-ui/icons/Publish'
import auth from '../auth/auth-helper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import {createProduct} from './product-api'
import {Link, Redirect} from 'react-router-dom'
const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: '1.2em'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  },
  link:{
      textDecoration:"none"
  }
})

class NewProduct extends Component {
  constructor({match}) {
    super()
    this.state = {
      name: '',
      description: '',
      image: '',
      category: '',
      quantity: '',
      price: '',
      redirect: false,
      errors: ""
    }
    this.match = match
  }
  componentDidMount = () => {
    this.productData = new FormData()
  }
  handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    this.productData.set(name, value)
    this.setState({ [name]: value })
  }

  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    createProduct({
      shopId: this.match.params.shopId
    }, {
      t: jwt.token
    }, this.productData).then((data) => {
        console.log(data)
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({error: '', redirect: true})
      }
    })
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={'/seller/shop/edit/'+this.match.params.shopId}/>)
    }
    const {classes} = this.props
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            New Product
          </Typography><br/>
          <Typography type="headline" component="h4" color="error">
            {this.state.errors.error?this.state.errors.error:null}
          </Typography><br/>
          <input accept="image/*" onChange={this.handleChange('image')} className={classes.input} id="icon-button-file" type="file"/>
          <label htmlFor="icon-button-file">
            <Button variant="text" color="secondary" component="span">
              Upload Photo
              <FileUpload/>
            </Button>
          </label> <span className={classes.filename}>{this.state.image ? this.state.image.name : ''}</span><br/>
          <TextField 
          id="name" 
          label="Name" 
          className={classes.textField}
          value={this.state.name} 
          onChange={this.handleChange('name')}
          margin="normal"
          helperText={this.state.errors.name&&this.state.errors.name}
          error={this.state.errors.name?true:false}
            /><br/>
          <TextField
            id="multiline-flexible"
            label="Description"
            multiline
            rows="2"
            value={this.state.description}
            onChange={this.handleChange('description')}
            className={classes.textField}
            margin="normal"
            helperText={this.state.errors.description&&this.state.errors.description}
            error={this.state.errors.description?true:false}
          /><br/>
          <TextField 
          id="category" 
          label="Category" 
          className={classes.textField} 
          value={this.state.category} 
          onChange={this.handleChange('category')} 
          margin="normal"
          helperText={this.state.errors.category&&this.state.errors.category}
          error={this.state.errors.category?true:false}
          /><br/>
          <TextField 
          id="quantity" 
          label="Quantity" 
          className={classes.textField} 
          value={this.state.quantity} 
          onChange={this.handleChange('quantity')} 
          type="number" 
          margin="normal"
          helperText={this.state.errors.quantity&&this.state.errors.quantity}
          error={this.state.errors.quantity?true:false}
          /><br/>
          <TextField 
          id="price" 
          label="Price" 
          className={classes.textField} 
          value={this.state.price} 
          onChange={this.handleChange('price')} 
          type="number" 
          margin="normal"
          helperText={this.state.errors.price&&this.state.errors.price}
          error={this.state.errors.price?true:false}
          /><br/>
        </CardContent>
        <CardActions>
          <Button color="primary" variant="text" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
          <Link to={'/seller/shop/edit/'+this.match.params.shopId} className={[classes.submit,classes.link].join(" ")}><Button variant="text">Cancel</Button></Link>
        </CardActions>
      </Card>
    </div>)
  }
}

export default withStyles(styles)(NewProduct)
