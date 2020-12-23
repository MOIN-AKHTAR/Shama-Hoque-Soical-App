const signin = (user) => {
    return fetch('http://localhost:3001/api/v1/users/signin', {
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
  
  const signout = () => {
    return fetch('http://localhost:3001/api/v1/users/signout/', {
      method: 'POST',
    }).then(response => {
        return response.json()
    }).catch((err) => err.response.data())
  }
  
  export {
    signin,
    signout
  }
  