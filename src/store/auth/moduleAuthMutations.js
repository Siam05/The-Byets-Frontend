/*=========================================================================================
  File Name: moduleAreaMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from 'axios'

export default {
  SET_BEARER (state, accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  },

  REMOVE_BEARER () {
      axios.defaults.headers.common['Authorization'] = undefined;
  },

    SET_USER_NAME (state, value) {
      state.name = value;
    },

    SET_USER_OBJECT (state, value) {
      state.userObject = value;
    },
  SET_SHOP_STATUS (state, value) {
      state.shopStatus = value;
    },

    SET_LOGIN_STATUS (state, isLoggedIn) {
      state.loginStatus = isLoggedIn
    },

    SET_REG_ERROR (state, error) {
      state.registerError = error;
    },

    SET_REG_SUCC (state, success) {
      state.registerSuccess = success;
    },

    SET_REG_LOADING (state, isLoading) {
      state.registerLoading = isLoading;
    },

    SET_RESET_ERROR (state, error) {
      state.passResetError = error;
    },

    SET_RESET_SUCCESS (state, success) {
      state.passResetSuccess = success;
    },

    SET_RESET_LOADING (state, isLoading) {
      state.passResetLoading = isLoading;
    } ,
    SET_REQ_ERROR (state, error) {
      state.passReqError = error;
    },

    SET_REQ_SUCCESS (state, success) {
      state.passReqSuccess = success;
    },

    SET_REQ_LOADING (state, isLoading) {
      state.passReqLoading = isLoading;
    }
}
