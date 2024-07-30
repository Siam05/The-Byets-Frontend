import Vue from 'vue';
import VueRouter from 'vue-router';

// Routes
import store from '@/store/index';
import {canNavigate} from '@/libs/acl/routeProtection';
import {isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser} from '@/auth/utils';
import pages from './routes/pages'
import dashboard from './routes/cloudX/dashboard';
import administration from './routes/cloudX/administration';
import layout from './routes/cloudX/layout';
import {can} from "@core/libs/acl/utils";
import settings from "@/router/routes/cloudX/settings";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: [
        {path: '/', redirect: {name: 'dashboard'}},
        ...pages,
        ...dashboard,
        ...layout,
        ...administration,
        ...settings,

        {
            path: '*',
            redirect: 'error-404',
        }
    ]
})

router.beforeEach((to, _, next) => {
    (to.name !== 'auth-login' && to.name!=='forgot-password' && to.name!=='reset-password')? store.dispatch('auth/isLoggedIn') : ''
    const isLoggedIn = store.state.auth.isUserLoggedIn()
    let permissions = JSON.parse(localStorage.getItem('permissions'))
    let canGo = false;

    if (to.meta.codename != undefined) {
        canGo = permissions.includes(to.meta.codename)
    } else {
        canGo = true
    }


    if (to.name === 'auth-login'||to.name === 'forgot-password'||to.name === 'reset-password') {
        if (isLoggedIn) {
            return next({name: 'dashboard'})
        } else {
            next()
        }
    } else {
        if (isLoggedIn) {
            if (canGo) {
                return next()
            } else {
                return next({name: 'misc-not-authorized'})
            }
        } else {
            return next({name: 'auth-login'})
        }
    }
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = 'none'
    }
})

export default router
