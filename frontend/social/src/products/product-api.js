

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

module.exports={
    createProduct,
    removeProduct,
    getProduct,
    getLatestProducts,
    updateProduct
}