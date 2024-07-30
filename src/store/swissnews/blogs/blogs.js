import axios from "@/store/axios";
import {V1API} from "@/http/APIPath";
import {populateStore, performNetworkCall, buildFormData} from "@/store/asyncHelper";
import dataMagic, {decode, encode} from "@/store/dataMagic";

const keyList = {
    blogUpdate : 'BLOG_UPDATE',
    blogDelete : 'BLOG_DELETE'
};

const mutations = {};
const store = {};

populateStore(store, mutations, keyList, false);

export default {
    namespaced: true,
    state : {
        blogs: [],
        blogs_without_pg: [],
        count: null,
        blogLoading: false,
        blogError: false,
        submitLoading: false,
        submitError: false,
        submitSuccess: false,

        ...store
    },

    mutations : {
        ...mutations,

        SET_BLOGS (state, {results, pg_count}) {
            state.blogs = results;
            state.count = pg_count;
        },

        SET_BLOGS_WITHOUT_PG (state, results) {
            state.blogs_without_pg = results;
        },

        BLOG_LOADING (state, loading) {
            state.blogLoading = loading;
        },

        SUBMIT_LOADING (state, loading) {
            state.submitLoading = loading;
        },

        BLOG_ERROR(state, error) {
            state.blogError = error;
        },

        SUBMIT_ERROR (state, hasError) {
            state.submitError = hasError;
        },

        SUBMIT_SUCCESS (state, success) {
            state.submitSuccess = success;
        }
    },

    actions: {
        async fetchBlog ({ commit }, payload) {
            commit('BLOG_LOADING', true);
            commit('BLOG_ERROR', false);
            try{
                let result = await axios.get(V1API.fetch_blog + '?count=' + payload.perPage + '&page=' + payload.currentPage +'&start_date=' + payload.start_date + '&end_date=' + payload.end_date);
                let {results, pg_count} = decode(result.data)

                commit('SET_BLOGS', {results, pg_count}); 

            }catch(error) {

                commit('BLOG_ERROR', true);

            }
            commit('BLOG_LOADING', false);
        },

        async fetchBlogWithoutPG ({ commit }, payload) {
            commit('BLOG_LOADING', true);
            commit('BLOG_ERROR', false);
            try{
                let result = await axios.get(V1API.fetch_blog_without_pg + '?start_date=' + payload.start_date + '&end_date=' + payload.end_date);
                let results = decode(result.data.data)

                commit('SET_BLOGS_WITHOUT_PG', results); 

            }catch(error) {

                commit('BLOG_ERROR', true);

            }
            commit('BLOG_LOADING', false);
        },
        
        async addBlog({commit, dispatch}, payload) {
            commit('SUBMIT_LOADING', true);
            commit('SUBMIT_ERROR', false);

            let config = {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
                "Content-Type": "multipart/form-data"
            };

            try{
                let data= new FormData()
                let payloadData = buildFormData(data, payload);

                let response = await axios.post(V1API.create_blog, payloadData, config).then(result=>{
                    let data = decode(result.data)
                    return data
                });

                commit('SUBMIT_SUCCESS', true);
                dispatch ('fetchBlog', {perPage: 8, currentPage: 1, start_date: null, end_date: null})
                return response
                
            }catch (e) {
                commit('SUBMIT_ERROR', true);
            }finally {
                commit('SUBMIT_LOADING', false);
            }
        },

        async addBlogFromPG({commit, dispatch}, payload) {
            commit('SUBMIT_LOADING', true);
            commit('SUBMIT_ERROR', false);

            let config = {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
                "Content-Type": "multipart/form-data"
            };

            try{
                let data= new FormData()
                let payloadData = buildFormData(data, payload);

                let response = await axios.post(V1API.create_blog, payloadData, config).then(result=>{
                    let data = decode(result.data)
                    return data
                });

                commit('SUBMIT_SUCCESS', true);
                dispatch ('fetchBlogWithoutPG', {start_date: null, end_date: null})
                return response
                
            }catch (e) {
                commit('SUBMIT_ERROR', true);
            }finally {
                commit('SUBMIT_LOADING', false);
            }
        },

        async deleteBlog({commit, dispatch}, payload) {
            let response='';
            await performNetworkCall(
                commit,
                keyList.countryDelete,
                async () => {

                    response = await axios.delete(V1API.blog_delete + payload.id).then(result=>{
                        let data=decode(result.data)

                        return data

                    });
                    dispatch('fetchBlog', {perPage: 8, currentPage: payload.currentPage, start_date: null, end_date: null});
                }
            )
            return response
        }
    },

    getters: {}
}