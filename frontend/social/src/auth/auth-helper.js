import {emptyCart} from '../cart/cart-api'

const auth = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (sessionStorage.getItem('jwt'))
      return JSON.parse(sessionStorage.getItem('jwt'))
    else
      return false
  },
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      sessionStorage.setItem('jwt', JSON.stringify(jwt));
    cb()
  },
  signout(cb) {
    if (typeof window !== "undefined"){
      sessionStorage.removeItem('jwt');
      emptyCart()
       cb()
    }
      
  },
  updateUse(user,cb){
    if(typeof window !== "undefined"){
      if(sessionStorage.getItem('jwt')){
        let auth = JSON.parse(sessionStorage.getItem('jwt'))
        auth.user = user
        sessionStorage.setItem('jwt', JSON.stringify(auth))
        cb()
      }
    }
  }
}

export default auth