import axios from "@/store/axios";
import {V1API} from "@/http/APIPath";
import {populateStore, performNetworkCall, buildFormData} from "@/store/asyncHelper";
import dataMagic, {decode, encode} from "@/store/dataMagic"
import ToastificationContent from "@core/components/toastification/ToastificationContent";

const keyList = {
    contentUpdate : 'CONTENT_UPDATE',
    contentDelete : 'CONTENT_DELETE'
};

const mutations = {};
const store = {};

populateStore(store, mutations, keyList, false);

export default {
    namespaced: true,
    state : {
        contents: [],
        contents_without_pg: [],
        count: null,
        templates: [],
        settings: [],
        draft: {},
        template_detail: {},
        contentLoading: false,
        contentError: false,
        submitLoading: false,
        submitError: false,
        submitSuccess: false,

        ...store
    },

    mutations : {
        ...mutations,

        SET_CONTENT (state, {results, pg_count}) {
            state.contents = results;
            state.count = pg_count;
        },

        SET_CONTENT_WITHOUT_PG (state, results) {
            state.contents_without_pg = results;
        },

        SET_SETTINGS (state, setting) {
            state.settings = setting;
        },

        SET_LAYOUT (state, template) {
            state.templates = template;
        },

        SET_DRAFT (state, draft) {
            state.draft = draft;
        },

        SET_TEMPLATE_DETAILS (state, detail) {
            state.template_detail = detail;
        },

        CONTENT_LOADING (state, loading) {
            state.contentLoading = loading;
        },

        SUBMIT_LOADING (state, loading) {
            state.submitLoading = loading;
        },

        CONTENT_ERROR(state, error) {
            state.contentError = error;
        },

        SUBMIT_ERROR (state, hasError) {
            state.submitError = hasError;
        },

        SUBMIT_SUCCESS (state, success) {
            state.submitSuccess = success;
        }
    },

    actions: {
        async fetchContent ({ commit }, payload) {
            commit('CONTENT_LOADING', true);
            commit('CONTENT_ERROR', false);
            try{
                let result = await axios.get(V1API.fetch_content + '?count=' + payload.perPage + '&page=' + payload.currentPage +'&start_date=' + payload.start_date + '&end_date=' + payload.end_date);
                let {results, pg_count} = decode(result.data)
                commit('SET_CONTENT', {results, pg_count}); 

            }catch(error) {

                commit('CONTENT_ERROR', true);

            }
            commit('CONTENT_LOADING', false);
        },

        async fetchContentWithoutPG ({ commit }, payload) {
            commit('CONTENT_LOADING', true);
            commit('CONTENT_ERROR', false);
            try{
                let result = await axios.get(V1API.fetch_content_without_pg + '?start_date=' + payload.start_date + '&end_date=' + payload.end_date);
                let results = decode(result.data.data)
                commit('SET_CONTENT_WITHOUT_PG', results); 

            }catch(error) {

                commit('CONTENT_ERROR', true);

            }
            commit('CONTENT_LOADING', false);
        },
        
        async addContent({commit, dispatch}, payload) {
            commit('SUBMIT_LOADING', true);
            commit('SUBMIT_ERROR', false);
            try{
                let magic=encode(payload)
                let response = await axios.post(V1API.create_content, magic.encodedPayload, magic.config).then(result=>{
                    let data = decode(result.data)

                    return data

                });

                commit('SUBMIT_SUCCESS', true);
                dispatch ('fetchContent', {perPage: 8, currentPage: 1, start_date: null, end_date: null})
                return response
            }catch (e) {
                commit('SUBMIT_ERROR', true);
            }finally {
                commit('SUBMIT_LOADING', false);
            }
        },

        async addContentFromPG({commit, dispatch}, payload) {
            commit('SUBMIT_LOADING', true);
            commit('SUBMIT_ERROR', false);
            try{
                let magic=encode(payload)
                let response = await axios.post(V1API.create_content, magic.encodedPayload, magic.config).then(result=>{
                    let data = decode(result.data)

                    return data

                });

                commit('SUBMIT_SUCCESS', true);
                dispatch ('fetchContentWithoutPG', {start_date: null, end_date: null})
                return response
            }catch (e) {
                commit('SUBMIT_ERROR', true);
            }finally {
                commit('SUBMIT_LOADING', false);
            }
        },

        async deleteContent({commit, dispatch}, payload) {
            let response='';
            await performNetworkCall(
                commit,
                keyList.countryDelete,
                async () => {

                    response = await axios.delete(V1API.content_delete + payload.id).then(result=>{
                        let data=decode(result.data)

                        return data

                    });
                    dispatch('fetchContent', {perPage: 8, currentPage: payload.currentPage, start_date: null, end_date: null});
                }
            )
            return response
        },

        async fetchSettings ({ commit }) {
            commit('CONTENT_LOADING', true);
            commit('CONTENT_ERROR', false);
            try{
                let result = await axios.get(V1API.fetch_settings);
                let response = decode(result.data.data)
                commit('SET_SETTINGS', response); 

            }catch(error) {

                commit('CONTENT_ERROR', true);

            }
            commit('CONTENT_LOADING', false);
        },
        
        async addSettings({commit, dispatch}, payload) {
            commit('SUBMIT_LOADING', true);
            commit('SUBMIT_ERROR', false);
            try{
                let magic=encode(payload)
                let response = await axios.patch(V1API.create_settings, magic.encodedPayload, magic.config).then(result=>{
                    let data = decode(result.data)

                    return data

                });

                commit('SUBMIT_SUCCESS', true);
                dispatch ('fetchSettings')
                return response
            }catch (e) {
                commit('SUBMIT_ERROR', true);
            }finally {
                commit('SUBMIT_LOADING', false);
            }
        },

        async sendMail({commit, dispatch}, payload) {
            commit('SUBMIT_LOADING', true);
            commit('SUBMIT_ERROR', false);
            try{
                let magic=encode(payload)
                let response = await axios.post(V1API.send_mail, magic.encodedPayload, magic.config).then(result=>{
                    let data = decode(result.data)

                    return data

                });

                commit('SUBMIT_SUCCESS', true);
                // dispatch ('saveTemplate')
                return response
            }catch (e) {
                commit('SUBMIT_ERROR', true);
            }finally {
                commit('SUBMIT_LOADING', false);
            }
        },

        async saveLayout({commit, dispatch}, payload) {
            commit('SUBMIT_LOADING', true);
            commit('SUBMIT_ERROR', false);
            try{
                let magic=encode(payload)
                let response = await axios.post(V1API.create_layout, magic.encodedPayload, magic.config).then(result=>{
                    let data = decode(result.data)

                    return data

                });

                commit('SUBMIT_SUCCESS', true);
                dispatch ('deleteDraft', payload.draft_id)
                return response
            }catch (e) {
                commit('SUBMIT_ERROR', true);
            }finally {
                commit('SUBMIT_LOADING', false);
            }
        },

        async saveLayoutAsDraft({commit, dispatch}, payload) {
            commit('SUBMIT_LOADING', true);
            commit('SUBMIT_ERROR', false);
            try{
                let magic=encode(payload)
                let response = await axios.patch(V1API.create_layout_draft, magic.encodedPayload, magic.config).then(result=>{
                    let data = decode(result.data)

                    return data

                });

                commit('SUBMIT_SUCCESS', true);
                dispatch ('fetchDraft')
                return response
            }catch (e) {
                commit('SUBMIT_ERROR', true);
            }finally {
                commit('SUBMIT_LOADING', false);
            }
        },

        async fetchTemplateList ({ commit }) {
            commit('CONTENT_LOADING', true);
            commit('CONTENT_ERROR', false);
            try{
                let result = await axios.get(V1API.fetch_layout);
                let response = decode(result.data.data)
                commit('SET_LAYOUT', response); 

            }catch(error) {

                commit('CONTENT_ERROR', true);

            }
            commit('CONTENT_LOADING', false);
        },

        async fetchDraft ({ commit }) {
            commit('CONTENT_LOADING', true);
            commit('CONTENT_ERROR', false);
            try{
                let result = await axios.get(V1API.get_layout_draft);
                let response = decode(result.data.data)
                commit('SET_DRAFT', response); 

            }catch(error) {
                commit('CONTENT_ERROR', true);
            }
            commit('CONTENT_LOADING', false);
        },

        async deleteDraft({commit, dispatch}, payload) {
            let response='';
            await performNetworkCall(
                commit,
                keyList.countryDelete,
                async () => {

                    response = await axios.delete(V1API.draft_delete + payload).then(result=>{
                        let data=decode(result.data)

                        return data

                    });
                    dispatch('fetchDraft');
                }
            )
            return response
        },

        async fetchTemplateDetails ({ commit }, payload) {
            commit('CONTENT_LOADING', true);
            commit('CONTENT_ERROR', false);
            try{
                let result = await axios.get(V1API.layout_details + payload);
                let response = decode(result.data.data)
                commit('SET_TEMPLATE_DETAILS', response); 

            }catch(error) {

                commit('CONTENT_ERROR', true);

            }
            commit('CONTENT_LOADING', false);
        },
 
        async updatePublishedStatus({commit}, payload) {
            commit('CONTENT_LOADING', true);
            commit('CONTENT_ERROR', false);
            try{ 
                let response = await axios.get(V1API.toggle_layout + payload).then(result=>{
                    let data = result.data

                    return data

                });

                commit('SUBMIT_SUCCESS', true);
                return response
            }catch (e) {
                commit('CONTENT_ERROR', true);
            }finally {
                commit('CONTENT_LOADING', false);
            }
        },

        async fetchTemplateListByDate ({ commit }, payload) {
            commit('CONTENT_LOADING', true);
            commit('CONTENT_ERROR', false);
            try{
                let result = await axios.get(V1API.fetch_layout + '?start_date=' + payload.start_date + '&end_date=' + payload.end_date);
                let response = decode(result.data.data)
                commit('SET_LAYOUT', response); 

            }catch(error) {

                commit('CONTENT_ERROR', true);

            }
            commit('CONTENT_LOADING', false);
        },

        async fetchContentListByDate ({ commit }, payload) {
            commit('CONTENT_LOADING', true);
            commit('CONTENT_ERROR', false);
            try{
                let result = await axios.get(V1API.fetch_content + '&start_date=' + payload.start_date + '&end_date=' + payload.end_date);
                let response = decode(result.data.results)
                commit('SET_CONTENT', response); 

            }catch(error) {

                commit('CONTENT_ERROR', true);

            }
            commit('CONTENT_LOADING', false);
        },

        async fetchTemplatesByStatus ({ commit },payload) { 
            commit('CONTENT_LOADING', true);
            commit('CONTENT_ERROR', false);

            try{
                let result = await axios.get(V1API.fetch_users_by_status + payload);
                let response=decode(result.data.data)
                commit('SET_LAYOUT', response); 

            }catch(error) {

                commit('CONTENT_ERROR', true);

            }
            commit('CONTENT_LOADING', false);
        },

        async updateLayout({commit, state, dispatch}, payload) {
            let response = '';
            await performNetworkCall(
                commit,
                keyList.contentUpdate,
                async () => {
                    let payloadData={ 
                        subject: payload.subject,
                        value: payload.value,
                        inner_html: payload.inner_html
                    }
                    let magic = encode(payloadData)

                    response = await axios.patch(V1API.layout_edit + payload.id, magic.encodedPayload, magic.config).then(result => {
                        let data = decode(result.data)
                        return data
                    })

                    dispatch('fetchTemplateDetails', payload.id);
                }
            )
            return response
        },

        async deleteTemplate({commit, dispatch}, payload) {
            let response='';
            await performNetworkCall(
                commit,
                keyList.countryDelete,
                async () => {

                    response = await axios.delete(V1API.layout_delete + payload).then(result=>{
                        let data=decode(result.data)

                        return data

                    });
                    dispatch('fetchTemplateList');
                }
            )
            return response
        }
    },



    getters: {}
}