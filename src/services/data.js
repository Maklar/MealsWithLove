import axios from "axios";

export default class Data  {
  constructor() {
    axios.defaults.baseURL = process.env.REACT_APP_DATA_URL || 'http://localhost:3001';    
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    const token = localStorage.getItem("id_token");
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("id_token") || "";
    }
  }

  setAuthToken(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
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

  createNewRequest(request, callback) {
    axios.post("/requests", request).then(callback).catch((err) => { alert(err);});
  }

  getRequest(requestId, callback) {
    axios.get(`/request/${requestId}`)
      .then((res) => {
        if (res.status !== 200) {
          alert("Something went wrong retrieving request");
        }
        else {
          callback(res.data);
        }
      })
      .catch((err) => { alert(err); });
  }

  volunteer(requestId, mealIndex, volunteerId, callback) {
    axios.post("/request/volunteer", { requestId, mealIndex, volunteerId }).then(callback).catch((err) => { alert(err);});
  }

  getRequests(callback) {
    axios.get("/requests")
      .then((res) => {
        if (res.status !== 200) {
          alert("Status did not indicate a success");
        }
        else {      
          callback(res.data);
        }
      })
      .catch((err) => { alert(err); });
  }
}