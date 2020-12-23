const create = (user) => {
    return fetch('http://localhost:3001/api/v1/users/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then((response) => {
        return response.json()
      }).catch((err) => err.response.data())
  }



  const list = () => {
    return fetch('http://localhost:3001/api/v1/users/', {
      method: 'GET',
    }).then(response => {
      return response.json()
    }).catch((err) => console.log(err))
  }


  const read = (params, credentials) => {
    return fetch('http://localhost:3001/api/v1/users/' + params.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
  }

  
  const update = (params, credentials, user) => {
    return fetch('http://localhost:3001/api/v1/users/' + params.userId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: user
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
  }
  
  const remove = (params, credentials) => {
    return fetch('http://localhost:3001/api/v1/users/' + params.userId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
  }
  

const follow = (params, credentials, followId) => {
    return fetch('http://localhost:3001/api/v1/users/follow/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({userId:params.userId, followId: followId})
    }).then((response) => {
      return response.json()
    }).catch((err) => {
      console.log(err)
    }) 
  }

const unfollow = (params, credentials, unfollowId) => {
    return fetch('http://localhost:3001/api/v1/users/unfollow/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({userId:params.userId, unfollowId: unfollowId})
    }).then((response) => {
      return response.json()
    }).catch((err) => {
      console.log(err)
    })
  }



  const findPeople = (params, credentials) => {
    return fetch('http://localhost:3001/api/v1/users/findpeople/' + params.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
  }


  const getPosts = (userId) => {
    return fetch('http://localhost:3001/api/v1/posts/by/'+userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
  }

  export {
      create,
      list,
      read,
      update,
      remove,
      follow,
      unfollow,
      findPeople,
      getPosts
  }