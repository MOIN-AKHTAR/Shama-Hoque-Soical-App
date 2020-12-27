

const createProduct=(params,credentials,product)=>{
    return fetch("http://localhost:3001/api/v1/products/"+params.shopId,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Authorization":"Bearer "+credentials.t
        },
        body:product
    }).then(res=>res.json()).catch(err=>err.response.data());
}


const removeProduct=(params,credentials)=>{
  return fetch(`http://localhost:3001/api/v1/products/${params.shopId}/${params.productId}`,{
      method:"DELETE",
      headers:{
        "Accept":"application/json",
        "Authorization":"Bearer "+credentials.t
      }
  }).then(res=>res.json()).catch(err=>err.response.data());
}

const getLatestProducts=()=>{
    return fetch("http://localhost:3001/api/v1/products/latest/",{
        method:"GET",
        headers:{
            "Accept":"application/json"
        }
    }).then(res=>res.json()).catch(err=>err.response.data())
}


const getProduct=(params)=>{
    return fetch("http://localhost:3001/api/v1/products/"+params.productId,{
        method:"GET",
        headers:{
            "Accept":"application/json"
        }
    }).then(res=>res.json()).catch(err=>err.response.data())
}


const updateProduct=(params,credentials,product)=>{
    return fetch(`http://localhost:3001/api/v1/products/${params.shopId}/${params.productId}`,{
        method:"PUT",
        headers:{
            "Accept":"application/json",
            "Authorization":"Bearer "+credentials.t
        },
        body:product
    }).then(res=>res.json()).catch(err=>err.response.data());
}


const getCategories=()=>{
    return fetch("http://localhost:3001/api/v1/products/categories",{
        method:"GET",
        headers:{
            "Accept":"application/json"
        }
    }).then(res=>res.json()).catch(err=>err.response.data());
}


const searchProductList=(params)=>{
    return fetch(`http://localhost:3001/api/v1/products/search?search=${params.search}&category=${params.category}`,{
        method:"GET",
        headers:{
            "Accept":"application/json"
        }
    }).then(res=>res.json()).catch(err=>err.response.data());
}


const list=(params)=>{
    return fetch(`http://localhost:3001/api/v1/products/list?category=${params.category}`).then(res=>res.json()).catch(err=>err.response.data())
}


module.exports={
    createProduct,
    removeProduct,
    getProduct,
    getLatestProducts,
    updateProduct,
    getCategories,
    searchProductList,
    list
}