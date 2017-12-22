import axios from "axios";

export default class Data  {
  constructor() {
    axios.defaults.baseURL = process.env.REACT_APP_DATA_URL || 'http://localhost:3002';    
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  getUserByOAuthId(oauthId, cb) {
    if (!oauthId) {
      cb(null);
    }
    else {
      axios.get("/user/oauth/" + oauthId)
      .then((res) => { 
        cb(res.data); 
      })
      .catch((err) => { 
        console.log(err); 
        cb(null); 
      });
    }
  }

  createUserWithOAuthId(user) {
    axios.post("/users", user);
  }
}