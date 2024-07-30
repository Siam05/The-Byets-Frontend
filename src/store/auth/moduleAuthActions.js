/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import jwt from '@/http/requests/auth/jwt/index'
import axios from '@/http/axios';
import {V1API} from '@/http/APIPath';
import router from '@/router';
import useJwt from "@/auth/jwt/useJwt";
import {decode, encode} from "@/store/dataMagic";
import {layerGroup} from "leaflet/dist/leaflet-src.esm";

export default {
    async isLoggedIn({commit,dispatch}, override) {
        try{
            let token = localStorage.getItem('access_token');
            let payload={
                'access_token':token
            }
            // console.log('oo', payload)
            // console.log('here')
            let magic=encode(payload)
            let result = await axios.post(V1API.verifyLogin,magic.encodedPayload,magic.config)
            let response=decode(result.data)
            // console.log('here2')
            if(response.status_code===401||response.status_code===400){
                throw response.errors
            }
        }catch (e) {
            // console.log('here3')
            if (useJwt.getRememberMe() && useJwt.getRememberMe()!==null) {
                // console.log('here4')
                try{
                    useJwt.refreshToken().then(result=>
                    {
                        // console.log('here5')
                        // console.log(result)
                    })
                }catch (e){
                    // console.log('here6')
                    dispatch('logout')
                }

            } else {
                // console.log('here7')
                dispatch('logout')
            }
        }
    },
    async checkBusiness({commit}, payload) {
        try{
            let result = await axios.get(V1API.business_get)
            let response=decode(result.data)
            if(response.data.length===0){
                return false
            }else{
                return true
            }

        }catch (e) {
        }
    },

    // JWT
  loginJWT ({ commit }, payload) {

    return new Promise((resolve, reject) => {
      jwt.login(payload.userDetails.email, payload.userDetails.password)
        .then(response => {
          if (response.access) {
                localStorage.setItem('accessToken', response.access);
                localStorage.setItem('refreshToken', response.refresh);
                window.data = {
                    auth: true,
                    // user: response.data.user
                }

            // Set bearer token in axios
                commit('SET_BEARER', response.access);
                // commit('SET_USER_NAME', response.data.user.name);
                // commit('SET_USER_OBJECT', response.data.user);
                commit('SET_LOGIN_STATUS', true);
                  // Navigate User to homepage
                 // if(response.data.user.role[0]==='shop-owner'){
                 //     if(response.data.status!='Active'){
                 //         router.push({name:'payment-summary'})
                 //         resolve(response)
                 //     }else{
                 //         router.push({name:'statBoard'}).catch(e=>console.info(e.message));
                 //         resolve(response)
                 //     }
                 // }else if(response.data.user.role[0]==='contributor'){
                 //     router.push({name:'add-business'}).catch(e=>console.info(e.message));
                 //     resolve(response)
                 // }else if(response.data.user.role[0]==='end-user') {
                 //     router.push('/dashboard/user/order/track').catch(e=>console.info(e.message));
                 //     resolve(response)
                 // }else{
                     router.push({name:'dashboard'}).catch(e=>console.info(e.message));
                     resolve(response)
                 // }

          }else {
                reject({message: 'Wrong Email or Password'})
          }

        }).catch(error => {
            reject(error)
        })
    })
  },

    async registerNewUser({commit, dispatch}, payload) {
        commit('SET_REG_LOADING', true);
        commit('SET_REG_ERROR', false);

        try{
            let response = await http.post(V1API.register, payload);
            // set the token
            commit('SET_BEARER', response.data.token);
            // save the token to local storage
            localStorage.setItem('accessToken', response.data.token);
            // fetch user info
            dispatch('isLoggedIn');
            commit('SET_REG_SUCC', true);
            this._vm.$notifySuccess('Success', 'Your account was successfully registered.');
        }catch (e) {
            console.error(e);
            commit('SET_REG_ERROR', true);
        }finally {
            commit('SET_REG_LOADING', false);
        }
    },
    async forgotPassword({commit, dispatch}, payload) {
        commit('SET_REQ_LOADING', true);
        commit('SET_REQ_ERROR', false);

        try{
            let response = await http.post(V1API.forgotPassword, {
                email:payload
            });

            commit('SET_REQ_SUCCESS', true);
            this._vm.$notifySuccess('Success', 'CatchMart e-mailed you the RESET-KEY.');
        }catch (e) {
            commit('SET_REQ_ERROR', true);
        }finally {
            commit('SET_REQ_LOADING', false);
        }
    },
    async resetPassword({commit, dispatch}, payload) {
        commit('SET_RESET_LOADING', true);
        commit('SET_RESET_ERROR', false);

        try{
            let response = await http.post(V1API.resetPassword, payload);

            commit('SET_RESET_SUCCESS', true);
            this._vm.$notifySuccess('Success', 'Your password updated. Login with your new password.');
        }catch (e) {
            commit('SET_RESET_ERROR', true);
        }finally {
            commit('SET_RESET_LOADING', false);
        }
    },

  registerUserJWT ({ commit }, payload) {

    const { displayName, email, password, confirmPassword } = payload.userDetails

    return new Promise((resolve, reject) => {

      // Check confirm password
      if (password !== confirmPassword) {
        reject({message: 'Password doesn\'t match. Please try again.'})
      }

      jwt.registerUser(displayName, email, password)
        .then(response => {
          // Redirect User
          router.push(router.currentRoute.query.to || '/')

          // Update data in localStorage
          localStorage.setItem('accessToken', response.data.accessToken)
          commit('UPDATE_USER_INFO', response.data.userData, {root: true})

          resolve(response)
        })
        .catch(error => { reject(error) })
    })
  },
  loadBearerTokenFromStorage({commit, dispatch}) {
      let token = localStorage.getItem('accessToken');
      dispatch('isLoggedIn');
      if(token) {
          commit('SET_BEARER', token);
      }
  },

  logout({commit}) {
      // clear saved authentication objects
      localStorage.removeItem('permissions');
      localStorage.removeItem('role');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('access_token');
      window.data = {
          auth: false,
          user: undefined
      }

      commit('SET_USER_NAME', 'user');
      commit('SET_USER_OBJECT', undefined);
      commit('SET_LOGIN_STATUS', false);
      commit('REMOVE_BEARER');

      // If we are already on the login page then do nothing
      if(router.history.current.name !== 'auth-login') {
          // if(router.history.current.name !== RouteNames.landing){
          //     router.push({name: RouteNames.login, query: {to: router.history.current.fullPath}}).catch(e=>console.log(e));
          // }else{
              router.push({name:'auth-login'}).then(result=>{
              }).catch(e=>console.log(e));
          // }
      }
  },
  fetchAccessToken () {
    return new Promise((resolve) => {
      jwt.refreshToken().then(response => { resolve(response) })
    })
  }
}
