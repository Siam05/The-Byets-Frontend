<template>
    <b-card title="Newsletters">
        <!-- search input -->
        <div class="custom-search">
            <div class="filter-section">
                <b-form-group>
                    <div style="display: flex; flex-direction: column; align-items: start;">
                        <!-- <label class="mr-1">Search</label> -->
                        <b-form-input
                            v-model="searchTerm"
                            placeholder="Search"
                            type="text"
                            class="dropdown-size"
                        />
                    </div>
                </b-form-group>
                <b-form-group> 
                    <div style="display: flex; flex-direction: column; align-items: start;">
                        <!-- <label class="mr-1">Filter by Status</label> -->
                        <v-select
                            class="dropdown-size"
                            placeholder="Select a Status"
                            v-model="profile_status"
                            :options="profile_statuses"
                            :reduce="name=>name.value"
                            label="name"
                            @input="getFilterByStatus()"
                        />
                    </div>
                </b-form-group>
                <b-form-group> 
                    <div style="display: flex; flex-direction: column; align-items: start;">
                        <!-- <label class="mr-1">Filter by Status</label> -->
                        <b-form-datepicker id="example-datepicker-start" placeholder="Select start date" v-model="start_date" class="dropdown-size" @input="getFilterByDate()"></b-form-datepicker>
                    </div>
                </b-form-group>
                <b-form-group> 
                    <div style="display: flex; flex-direction: column; align-items: start;">
                        <!-- <label class="mr-1">Filter by Status</label> -->
                        <b-form-datepicker id="example-datepicker-end" placeholder="Select end date" v-model="end_date" class="dropdown-size" @input="getFilterByDate()"></b-form-datepicker>
                    </div>
                </b-form-group>
                <b-form-group>
                    <router-link to="/layouts">
                        <div class="d-flex align-items-center">
                            <b-button
                                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                variant="outline-primary"
                            >
                                <feather-icon
                                    icon="PlusIcon"
                                    class="mr-50"
                                />
                                <span class="align-middle">Add New</span>
                            </b-button>
                        </div>
                    </router-link>
                </b-form-group>
            </div>
        </div>
    
        <!-- table -->
        <div v-if="!contentLoading && !contentError">
            <vue-good-table
                v-if="rows"
                :columns="columns"
                :rows="rows"
                :rtl="direction"
                :search-options="{
                    enabled: true,
                    externalQuery: searchTerm 
                }"
                :pagination-options="{
                    enabled: true,
                    perPage:pageLength
                }"
                styleClass="vgt-table striped condensed no-outline"
            >
        
                <template
                    slot="table-row"
                    slot-scope="props"
                >

                    <!-- Column: Index -->
                    <span v-if="props.column.field === 'index'">
                        <span>{{props.row.originalIndex+1}}</span>
                    </span>

                    <!-- Column: Index -->
                    <span v-else-if="props.column.field === 'subject'">
                        <div style="min-width: 250px;">
                            <span>{{ props.row.subject }}</span>
                        </div>
                    </span>
        
                    <!-- Column: Date -->
                    <span
                        v-else-if="props.column.field === 'created_at'"
                    >
                        <div v-if="props.row.created_at" style="display: flex; flex-direction: column; gap: 4px; min-width: 150px;">
                            <span>{{ getDatePart(props.row.created_at) }}</span>
                            <small><b-badge pill variant="light-primary"><span>{{ getTimePart(props.row.created_at) }}</span></b-badge></small>
                        </div>
                    </span>

                    <!-- Column: Date -->
                    <span
                        v-else-if="props.column.field === 'published_at'"
                    >
                        <div v-if="props.row.published_at" style="display: flex; flex-direction: column; gap: 4px; min-width: 150px;">
                            <span>{{ getDatePart(props.row.published_at) }}</span>
                            <small><b-badge pill variant="light-primary"><span>{{ getTimePart(props.row.published_at) }}</span></b-badge></small>
                        </div>
                    </span>

                    <!-- published -->
                    <span v-else-if="props.column.field === 'published'">
                        <span v-if="props.row.published === true" @click="updatePublishedStatus(props.row.id)" style="cursor: pointer"><b-badge pill variant="light-success">Published</b-badge></span>
                        <span v-else @click="updatePublishedStatus(props.row.id)" style="cursor: pointer"><b-badge pill variant="light-danger">Not Published</b-badge></span>
                    </span>

                    <!-- Column: Action -->
                    <span v-else-if="props.column.field === 'action'">
                        <div style="min-width: 140px;">
                            <span>
                                <b-button @click="sendEmail(props.row)"
                                    v-b-modal.send-email
                                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                    variant="primary" class="btn-icon rounded-circle mr-1"
                                    v-if="showEdit"
                                >
                                    <feather-icon
                                        icon="SendIcon"
                                    />
                                </b-button>
                                <router-link :to="{ path: '/newsletter/' + props.row.id }">
                                    <b-button 
                                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                        variant="success" class="btn-icon rounded-circle mr-1"
                                        v-if="showEdit"
                                    >
                                        <feather-icon
                                            icon="Edit2Icon" 
                                        />
                                    </b-button>
                                </router-link>
                                <b-button @click="deleteType(props.row)"
                                    id="delete-btn"
                                    v-b-modal.modal-delete
                                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                    variant="danger" class="btn-icon rounded-circle"
                                    v-if="showDelete"
                                >
                                    <feather-icon
                                        icon="TrashIcon"
                                    />
                                </b-button>
                            </span>
                        </div>
                    </span>
            
                    <!-- Column: Common -->
                    <span v-else>
                        {{ props.formattedRow[props.column.field] }}
                    </span>
                </template>
        
                <!-- pagination -->
                <template
                    slot="pagination-bottom"
                    slot-scope="props"
                >
                    <div class="d-flex justify-content-between flex-wrap">
                        <div class="d-flex align-items-center mb-0 mt-1">
                            <span class="text-nowrap ">
                                Showing 1 to
                            </span>
                            <b-form-select
                                v-model="pageLength"
                                :options="['3','5','10','50','100']"
                                class="mx-1"
                                @input="(value)=>props.perPageChanged({currentPerPage:value})"
                            />
                            <span class="text-nowrap"> of {{ props.total }} entries </span>
                        </div>
                        <div>
                            <b-pagination
                                :value="1"
                                :total-rows="props.total"
                                :per-page="pageLength"
                                first-number
                                last-number
                                align="right"
                                prev-class="prev-item"
                                next-class="next-item"
                                class="mt-1 mb-0"
                                @input="(value)=>props.pageChanged({currentPage:value})"
                            >
                                <template #prev-text>
                                    <feather-icon
                                        icon="ChevronLeftIcon"
                                        size="18"
                                    />
                                </template>
                                <template #next-text>
                                    <feather-icon
                                        icon="ChevronRightIcon"
                                        size="18"
                                    />
                                </template>
                            </b-pagination>
                        </div>
                    </div>
                </template>
            </vue-good-table>
        </div>

        <div v-else class="loading-user">
            <img src="../../../../assets/images/logo/logo.png" alt="">
            <div class="load-6">
                <div class="letter-holder">
                    <div class="l-1 letter">P</div>
                    <div class="l-2 letter">l</div>
                    <div class="l-3 letter">e</div>
                    <div class="l-4 letter">a</div>
                    <div class="l-5 letter">s</div>
                    <div class="l-6 letter mr-1">e</div>
                    <div class="l-7 letter">W</div>
                    <div class="l-8 letter">a</div>
                    <div class="l-9 letter">i</div>
                    <div class="l-10 letter">t</div>
                    <div class="l-11 letter">.</div>
                    <div class="l-12 letter">.</div>
                    <div class="l-13 letter">.</div>
                </div>
            </div>
        </div>
    
        <b-modal
            id="modal-prevent-closing"
            ref="my-modal"
            size="lg"
            :title="getModalTitle()"
            centered 
            ok-title="Submit"
            cancel-variant="outline-secondary"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <form
                ref="form"
                @submit.stop.prevent="handleSubmit"
            >
                <b-form-group
                    :state="nameState"
                    label="Question"
                    label-for="name-input"
                >
                    <b-form-input
                        id="name-input"
                        v-model="modify.question"
                        :state="nameState"
                    />
                </b-form-group>
                <b-form-group
                    :state="nameState"
                    label="Answer"
                    label-for="name-input"
                >
                    <b-form-textarea
                        id="name-input"
                        v-model="modify.answer"
                        :state="nameState"
                        rows="5"
                        resize
                    />
                </b-form-group>
            </form>
        </b-modal>

        <b-modal
            id="send-email"
            ref="send-email"
            centered
            modal-class="modal-danger"
            title="Are you sure?"
        >
            <b-card-text class="border-2">
                <span>If you send this email, you won't be able to revert this action!!</span>
            </b-card-text>
    
            <template #modal-footer>
                <div class="w-100">
                    <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="primary"
                        class="float-right"
                        @click="confirmSendEmail"
                    >
                        Send
                    </b-button>
                    <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="danger"
                        class="float-right mr-1"
                        @click="$refs['send-email'].toggle('#send-btn')"
                    >
                        Cancel
                    </b-button>
                </div>
            </template>
        </b-modal>

        <b-modal
            id="modal-delete"
            ref="modal-delete"
            centered
            modal-class="modal-danger"
            title="Are you sure?"
        >
            <b-card-text class="border-2">
                <span>If you delete, you won't be able to revert this action!!</span>
            </b-card-text>
    
            <template #modal-footer>
                <div class="w-100">
                    <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="primary"
                        class="float-right"
                        @click="confirmDelete()"
                    >
                        Accept
                    </b-button>
                    <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="danger"
                        class="float-right mr-1"
                        @click="$refs['modal-delete'].toggle('#delete-btn')"
                    >
                        Cancel
                    </b-button>
                </div>
            </template>
        </b-modal>
    </b-card>
</template>
  
<script>
import {
BAvatar,BButton, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BCard,
BModal,VBModal,BCardText, BFormTextarea, BFormDatepicker
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import vSelect from "vue-select"
import Ripple from "vue-ripple-directive";
import {mapState} from "vuex";
import ToastificationContent from "@core/components/toastification/ToastificationContent";

export default {
    components: {
        VueGoodTable,
        BAvatar,
        BCard,
        BBadge,
        BButton,
        BPagination,
        BFormGroup,
        BFormInput,
        BFormSelect,
        BDropdown,
        BDropdownItem,
        BModal,
        vSelect,
        BCardText,
        BFormTextarea,
        BFormDatepicker
    },

    directives: {
        'b-modal': VBModal,
        Ripple,
    },

    data() {
        return {
            nameState: null,
            addNewMode:true,
            updateStatusMode: false,
            popupActive:true,
            email: {
                subject: null,
                inner_html: null
            },
            status: {
                id: "",
                status: ""
            },
            modify:{
                id: null,
                slug: null,
                question: null,
                answer: null
            },
            profile_status: null,
            profile_statuses: [
                {
                    name: 'Published',
                    value: 'True'
                },
                {
                    name: 'Not Published',
                    value: 'False'
                }
            ],
            modify_id: null,
            country_id: null,
            pageLength: 5,
            dir: false,
            columns: [
                {
                    label: '#',
                    field: 'index',
                    type:'number',
                    tdClass: 'text-center ',
                    thClass:'text-center'
                },
                {
                    label: 'Subject',
                    field: 'subject',
                    tdClass: 'text-center',
                    thClass:'text-center'
                },
                {
                    label: 'Created Date',
                    field: 'created_at',
                    tdClass: 'text-center',
                    thClass:'text-center'
                },
                {
                    label: 'Status',
                    field: 'published',
                    tdClass: 'text-center',
                    thClass:'text-center'
                },
                {
                    label: 'Last Published',
                    field: 'published_at',
                    tdClass: 'text-center',
                    thClass:'text-center'
                }
            ],
            showAdd:true,
            showEdit:true,
            showDelete:true,
            rows: [],
            searchTerm: '',
            start_date: null,
            end_date: null
        }
    },

    computed: {
        ...mapState('content', ["templates","contentError","contentLoading"]),
    
        direction() {
            if (store.state.appConfig.isRTL) {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.dir = true
                return this.dir
            }
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.dir = false
            return this.dir
        },
    },

    watch: {
        templates(newValue, oldValue) {
            this.rows = this.templates
        },

        contentError(newValue, oldValue) {},

        contentLoading(newValue, oldValue) {}
    },

    created() {
        this.$store.dispatch('content/fetchTemplateList')
        this.rows = this.templates
        let permissions = JSON.parse(localStorage.getItem('permissions'))
        //   this.showAdd=permissions.includes("add_area")
        //   this.showEdit=permissions.includes("change_area")
        //   this.showDelete=permissions.includes("delete_area")
        if(this.showEdit || this.showDelete){
            this.columns.push({
                label: 'Action',
                field: 'action',
                tdClass: 'text-center',
                thClass:'text-center',
                sortable: false,
            })
        }
    },

    methods:{
        getDatePart(timestamp) {
            return timestamp.split('T')[0];
        },

        getTimePart(timestamp) {
            return timestamp.split('T')[1].split('.')[0];
        },

        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nameState = valid
            return valid
        },

        resetModal() {
            this.nameState = null
        },

        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.handleSubmit()
        },

        async handleSubmit() {
            if (!this.checkFormValidity()) {
                return
            }
            if(this.addNewMode){
                await this.$store.dispatch('faq/addFaq',{
                    'question':this.modify.question,
                    'answer':this.modify.answer
                }).then(result=>{
                    if(result.code == 200) {
                        this.$toast({
                            component: ToastificationContent,
                            position: 'top-right',
                            props: {
                                title: `Success`,
                                icon: 'ThumbsUpIcon',
                                variant: 'success',
                                text: result.response,
                            },
                        })
                    } else {
                        this.$toast({
                            component: ToastificationContent,
                            position: 'top-right',
                            props: {
                                title: `Error`,
                                icon: 'ThumbsUpIcon',
                                variant: 'error',
                                text: result.response,
                            },
                        })
                    }
                })
            }else{
                await this.$store.dispatch('faq/updateFaq',this.modify).then(result=> {
                    if(result.code == 200) {
                        this.$toast({
                            component: ToastificationContent,
                            position: 'top-right',
                            props: {
                                title: `Success`,
                                icon: 'ThumbsUpIcon',
                                variant: 'success',
                                text: result.response,
                            },
                        })
                    } else {
                        this.$toast({
                            component: ToastificationContent,
                            position: 'top-right',
                            props: {
                                title: `Error`,
                                icon: 'ThumbsUpIcon',
                                variant: 'error',
                                text: result.response,
                            },
                        })
                    }
                })
            }
            this.$nextTick(() => {
                this.$refs['my-modal'].toggle('#toggle-btn')
            })
        },

        initValues(){
            this.modify={
                id: null,
                slug: null,
                question: null,
                answer: null,
            }
        },

        sendEmail(template) {
            this.email.subject = template.subject
            this.email.inner_html = `<html><head></head>` + template.inner_html + `</html>`;
        },

        confirmSendEmail() {
            this.$store.dispatch('content/sendMail', {subject: this.email.subject, body: this.email.inner_html}).then(result=>{
                if(result.code == 200) {
                    this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                            title: `Success`,
                            icon: 'ThumbsUpIcon',
                            variant: 'success',
                            text: result.response,
                        }
                    })
                }

                this.$nextTick(() => {
                    this.$refs['send-email'].toggle('#send-btn')
                })
            })
        },

        updatePublishedStatus(id) { 
            this.$store.dispatch('content/updatePublishedStatus', id).then(result=>{
                if(result.code==200) {
                    this.$store.dispatch('content/fetchTemplateList')
                    this.rows = this.templates
                }
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: { 
                        title: result.code!=200?`Error`:`Success`,
                        icon: result.code!=200?`ThumbsDownIcon`:'ThumbsUpIcon',
                        variant: result.code!=200?`danger`:'success',
                        text: result.code!=200?`Couldn't update Status`:'Status Updated',
                    },
                })
            })
        },

        getFilterByStatus() {
            if(this.profile_status !== null) {
                this.$store.dispatch('content/fetchTemplatesByStatus', this.profile_status)
                this.rows = this.templates
            } else {
                this.$store.dispatch('content/fetchTemplateList')
                this.rows = this.templates
            }
        },

        getFilterByDate() {
            if(this.start_date !== null || this.end_date !== null) {
                this.$store.dispatch('content/fetchTemplateListByDate', {start_date: this.start_date, end_date: this.end_date})
                this.rows = this.templates
            } else {
                this.$store.dispatch('content/fetchTemplateList')
                this.rows = this.templates
            }
        },

        deleteType(data){
            this.modify_id = data.id
        },

        async confirmDelete(){
            await this.$store.dispatch("content/deleteTemplate", this.modify_id).then(result=>{
                if(result.code == 200) {
                    this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                            title: `Success`,
                            icon: 'ThumbsUpIcon',
                            variant: 'success',
                            text: result.response,
                        },
                    })
                } else {
                    this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                            title: `Error`,
                            icon: 'ThumbsUpIcon',
                            variant: 'error',
                            text: result.response,
                        },
                    })
                }
            })
            this.$nextTick(() => {
                this.$refs['modal-delete'].toggle('#delete-btn')
            })
        },

        getModalTitle(){
            return (this.addNewMode? 'Add New ' : 'Update ') +'Faq'
        }
    }
}
</script>
  
<style lang="scss" >
.no-outline{
    border:none !important;
}

.f20{
    font-size: 8px !important;
}

.vs__dropdown-menu {
    height: 200px;
}

.dropdown-size { 
    width: 100%;
}

.custom-search {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
}

.filter-section {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 20px;
}

@media screen and (max-width: 1330px) {
    .filter-section {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
    }
}

@media screen and (max-width: 792px) {
    .filter-section {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
    }
}

@media screen and (max-width: 470px) {
    .filter-section {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 0px;
    }
}

@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-good-table.scss';

</style>