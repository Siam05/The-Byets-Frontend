import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import app from './app';
import appConfig from './cloudX/portfolio/app-config';
import verticalMenu from './vertical-menu';

import moduleAuth from "@/store/auth/moduleAuth";
import moduleContent from '@/store/swissnews/content/content';
import moduleBlogs from '@/store/swissnews/blogs/blogs';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        appConfig,
        verticalMenu,

        'auth': moduleAuth,
        'content':moduleContent,
        'blogs':moduleBlogs
    },

    strict: process.env.DEV
})
