import axios from '../../../axios/index.js'
import store from '@/store/index'
import {V1API} from '../../../APIPath';


// Token Refresh
let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched (access_token) {
  subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber (callback) {
  subscribers.push(callback)
}

export default {
  init () {
    axios.interceptors.request.use((request) => {
        let accessToken = localStorage.getItem('accessToken');
        if(accessToken)
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return request;
    });

    axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      // const { config, response: { status } } = error
      const { config, response } = error;
      const originalRequest = config;

      // If the current request yielded an unauthorized response then redirect user back to login screen
      if(response && response.status === 401)
      {
          store.dispatch('auth/logout');
      }

      // // if (status === 401) {
      // if (response && response.status === 401) {
      //   if (!isAlreadyFetchingAccessToken) {
      //     isAlreadyFetchingAccessToken = true;
      //     store.dispatch('auth/fetchAccessToken')
      //       .then((access_token) => {
      //         isAlreadyFetchingAccessToken = false;
      //         onAccessTokenFetched(access_token)
      //       })
      //   }
      //
      //   return new Promise((resolve) => {
      //       addSubscriber(access_token => {
      //           originalRequest.headers.Authorization = `Bearer ${access_token}`;
      //           resolve(axios(originalRequest))
      //       })
      //   })
      // }
      return Promise.reject(error)
    }
    )
  },
  login (email, pwd) {
    let data = JSON.stringify({
      "username": email,
      "password": pwd
    });

    let config = {
      method: 'post',
      url: V1API.getAccessToken,
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    return axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          return response.data
        })
        .catch(function (error) {
          console.log(error);
        });

    // return axios.post(V1API.getAccessToken, {
    //   username: email,
    //   password: pwd
    // })
  },
  registerUser (name, email, pwd) {
    return axios.post(V1API.register, {
      displayName: name,
      email,
      password: pwd
    })
  },
  refreshToken () {
    return axios.post(V1API.refreshAccessToken, {accessToken: localStorage.getItem('accessToKen')})
  }
}
