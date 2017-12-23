import auth0 from "auth0-js";
import history from "../history";

export default class Auth {
    auth0 = new auth0.WebAuth({
      domain: 'faithcountrychapel.auth0.com',
      clientID: 'DFVoAkJAC5A5CEfTHlMoS0GE0gx4BPF_',
      redirectUri: process.env.REACT_APP_CALLBACK || "http://localhost:3000/callback",
      audience: 'https://faithcountrychapel.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    userProfile;

    constructor() {
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.handleAuthentication = this.handleAuthentication.bind(this);
      this.isAuthenticated = this.isAuthenticated.bind(this);
      this.getAccessToken = this.getAccessToken.bind(this);
      this.getProfile = this.getProfile.bind(this);
    }

    isAuthenticated() {
      // Check whether the current time is past the 
      // access token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

    handleAuthentication(callback) {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult, callback);
        } else if (err) {
          history.replace('/home');
          console.log(err);
        }
      });
    }

    setSession(authResult, callback) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);

      this.getProfile(authResult.accessToken, () => {
        callback(authResult.idToken);
        history.replace(localStorage.getItem('return_url') || '/home');
      });      
    }

    getProfile(token, callback) {
      this.auth0.client.userInfo(token, (err, profile) => {
        if (profile) {
          this.userProfile = profile;
          this.userProfile.id = profile.sub.split("|")[1];
          callback(profile);
        }
        else { 
          callback(null);
        }
      }); 
    }

    getAccessToken() {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('No access token found');
      }
      return accessToken;
    }

    login() {
      this.auth0.authorize();
    }

    logout() {
      // Clear access token and ID token from local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      // navigate to the home route
      history.replace('/home');
    }
}