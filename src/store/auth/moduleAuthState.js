/*=========================================================================================
  File Name: moduleAreaState.js
  Description: Auth Module State
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/




import useJwt from "@/auth/jwt/useJwt";
import {isUserLoggedIn} from "@/auth/utils";

export default {
    isUserLoggedIn: () => {
        let accessToken=localStorage.getItem('access_token')
        return ((accessToken ===undefined ||   accessToken===null))?false:true;
    },


    name: 'User',
    userObject: undefined,
    loginStatus: false,
    shopStatus: false,


    passResetLoading:false,
    passResetSuccess:false,
    passResetError:false,

    passReqLoading:false,
    passReqSuccess:false,
    passReqError:false,

    registerLoading: false,
    registerSuccess: false,
    registerError: false,

}
