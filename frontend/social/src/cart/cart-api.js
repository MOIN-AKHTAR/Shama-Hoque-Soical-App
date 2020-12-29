

const addItem=(item, cb)=> {
    let cart = []
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.push({
        product: item,
        quantity: 1,
        shop: item.productShop._id
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      cb()
    }
  }


 const itemTotal=()=>{
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        return JSON.parse(localStorage.getItem('cart')).length
      }
    }
    return 0
  }

 const getCart=()=> {
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        return JSON.parse(localStorage.getItem('cart'))
      }
    }
    return []
  }

  const updateCart=(itemIndex, quantity)=> {
    let cart = []
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart[itemIndex].quantity = quantity
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }


  const removeItem=(itemIndex)=> {
    let cart = []
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.splice(itemIndex, 1)
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    return cart
  }


  const emptyCart=(cb)=>{
    if (typeof window !== "undefined") {
      localStorage.removeItem('cart')
    }
  }

module.exports={
    addItem,
    itemTotal,
    removeItem,
    getCart,
    updateCart,
    emptyCart
}