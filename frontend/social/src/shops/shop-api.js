

const creatShop=(params,credentials,shop)=>{

   return fetch("http://localhost:3001/api/v1/shops/by/"+params.userId,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Authorization":"Bearer "+credentials.t
        },
        body:shop
    }).then(response=>response.json()).catch(err=>err.response)
}


const getAllShops=()=>{
    return fetch("http://localhost:3001/api/v1/shops/",{
        method:"GET"   
    }).then(res=>res.json()).catch(err=>err.response.data());
}

const getByOwner=(params,credentials)=>{
    return fetch("http://localhost:3001/api/v1/shops/by/"+params.userId,{
        method:"GET",
        headers:{
            "Accept":"application/json",
            "Authorization":"Bearer "+credentials.t
        }
    }).then(res=>res.json()).catch(err=>err.response.data())
}

const removeShop=(params,credentials)=>{
    return fetch("http://localhost:3001/api/v1/shops/"+params.shopId,{
        method:"DELETE",
        headers:{
            "Accept":"application/json",
            "Authorization":"Bearer "+credentials.t
        }
    }).then(res=>{}).catch(err=>err.response.data())
}


const getShop=(params)=>{
    return fetch("http://localhost:3001/api/v1/shops/"+params.shopId,{
        method:"GET",
        headers:{
            "Accept":"application/json"
        }
    }).then(res=>res.json()).catch(err=>err.response.data())
}


const updateShop=(params,credentials,shop)=>{
    return fetch("http://localhost:3001/api/v1/shops/"+params.shopId,{
        method:"PUT",
        headers:{
            "Accept":"application/json",
            "Authorization":"Bearer "+credentials.t
        },
        body:shop
    }).then(res=>res.json()).catch(err=>err.response.data())
}


const getProducts=(params)=>{
    return fetch("http://localhost:3001/api/v1/products/by/"+params.shopId,{
        method:"GET",
        headers:{
            "Authorization":"application/json"
        }
    }).then(res=>res.json()).catch(err=>err.response.data());
}


module.exports={
    creatShop,
    getAllShops,
    getByOwner,
    removeShop,
    getShop,
    updateShop,
    getProducts
}