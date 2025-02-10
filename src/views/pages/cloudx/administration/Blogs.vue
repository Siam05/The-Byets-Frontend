<template>
    <b-card title="Blogs">
        <div class="full-blog">
            <div class="upload-blog border-style">
                <div style="width: 100%; display: flex; flex-direction: column; align-items: start;">
                    <p style="color: red;">** Max size: 3 MB</p>
                    <input type="file" @change="uploadAttachment"> 
                    <b-form-input style="margin-top: 24px;" v-model="image.title" type="text" placeholder="Enter title"></b-form-input>
                    <b-button style="margin-top: 24px;" variant="primary" @click="submitBlog">Upload</b-button>
                </div>
            </div>
            <div class="image-blog border-style">
                <div class="filter-section">
                    <b-form-group> 
                        <div class="box-width" style="display: flex; flex-direction: column; align-items: start;">
                            <b-form-datepicker id="example-datepicker-start" placeholder="Select start date" v-model="start_date" class="dropdown-size" @input="getFilterByDate()"></b-form-datepicker>
                        </div>
                    </b-form-group>
                    <b-form-group> 
                        <div class="box-width" style="display: flex; flex-direction: column; align-items: start;">
                            <b-form-datepicker id="example-datepicker-end" placeholder="Select end date" v-model="end_date" class="dropdown-size" @input="getFilterByDate()"></b-form-datepicker>
                        </div>
                    </b-form-group>
                </div> 
                <div class="blog-grid-view mt-2" v-if="totalRows != 0">
                    <div v-for="image, index in image_blogs" :key="index">
                        <div v-if="image.file !== null">
                            <div style="display: flex; height: 160px;">
                                <div v-if="getFileExtension(image.file) == 'jpg' || getFileExtension(image.file) == 'png' || getFileExtension(image.file) == 'jpeg' || getFileExtension(image.file) == 'svg' || getFileExtension(image.file) == 'gif'">
                                    <img class="blog-size" style="max-height: 160px; object-fit: contain;" :src="host + image.file" alt="">
                                </div>
                                <div v-else>
                                    <img class="blog-size" style="max-height: 160px; object-fit: contain;" :src="fileImage" alt="">
                                </div>
                                <p @click="deleteType(image.id)" id="delete-btn" v-b-modal.modal-delete style="font-size: large; text-align: center; margin-left: -28px; margin-top: 4px; color: black; border: 1px solid black; border-radius: 100%; height: 24px; width: 24px;">x</p>
                            </div>
                            <p style="margin-top: 6px;">{{ image.title }}</p>
                        </div>
                    </div>
                </div>
                <div v-else class="mt-2">
                    <h5>No blogs to show!</h5>
                </div>
                <div class="overflow-auto mt-2">
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                    >
                    </b-pagination>
                </div>
            </div>
        </div>

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
import moment from "moment";
import ToastificationContent from "@core/components/toastification/ToastificationContent";
import fileImage from '../../../../assets/images/templates/file-thumbnail.png';

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
            host: 'https://api-newsletter.byets.org',
            dir: false,
            searchTerm: '',
            image_blogs: [],
            image: {
                file: null,
                title: ''
            },
            modify_id: null,
            fileImage: fileImage,
            start_date: null,
            end_date: null,
            perPage: 8,
            currentPage: 1,
            totalRows: 1
        }
    },

    computed: {
        ...mapState('blogs', ["blogs", "count", "blogError", "blogLoading"]),
    
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
        blogs(newValue, oldValue) {
            this.image_blogs = this.blogs
            this.totalRows = this.count
        },

        currentPage(newCurrentPage) {
            this.$router.replace({
                path: '/blogs',
                query: {
                    page: newCurrentPage,
                    perPage: this.perPage
                }
            })

            this.currentPage = newCurrentPage

            this.$store.dispatch("blogs/fetchBlog", {
                start_date: this.start_date !== null ? this.start_date : null,
                end_date: this.end_date !== null ? this.end_date : null,
                perPage: this.perPage,
                currentPage: newCurrentPage
            }).then(() => {
                this.totalRows = this.count
            })
        },

        perPage(newperPage) {
            this.$router.replace({
                path: '/blogs',
                query: {
                    page: this.currentPage,
                    perPage: newperPage
                }
            })

            this.perPage = newperPage

            this.$store.dispatch("blogs/fetchBlog", {
                start_date: this.start_date !== null ? this.start_date : null,
                end_date: this.end_date !== null ? this.end_date : null,
                perPage: newperPage,
                currentPage: this.currentPage
            }).then(() => {
                this.totalRows = this.count
            })
        }
    },

    mounted() {
        if (!this.$route.query.page || !this.$route.query.perPage) {
            this.$router.replace({
                path: '/blogs',
                query: {
                    page: this.currentPage,
                    perPage: this.perPage
                }
            })

            this.$store.dispatch("blogs/fetchBlog", {
                start_date: this.start_date !== null ? this.start_date : null,
                end_date: this.end_date !== null ? this.end_date : null,
                perPage: this.perPage,
                currentPage: this.currentPage
            }).then(() => {
                this.totalRows = this.count
            })
        } 
        else {
            this.$router.replace({
                path: this.$route.path,
                query: {
                    page: this.$route.query.page,
                    perPage: this.$route.query.perPage
                }
            })

            this.currentPage = this.$route.query.page
            this.perPage = this.$route.query.perPage

            this.$store.dispatch("blogs/fetchBlog", {
                start_date: this.start_date !== null ? this.start_date : null,
                end_date: this.end_date !== null ? this.end_date : null,
                currentPage: this.$route.query.page,
                perPage: this.$route.query.perPage
            }).then(() => {
                this.totalRows = this.count
            })
        }
    },

    methods: {
        getFilterByDate() {
            this.$store.dispatch("blogs/fetchBlog", {
                start_date: this.start_date !== null ? this.start_date : null,
                end_date: this.end_date !== null ? this.end_date : null,
                currentPage: this.$route.query.page,
                perPage: this.$route.query.perPage
            }).then(() => {
                this.totalRows = this.count
            })
        },

        getFileExtension(link) {
            const parts = link.split('.');
            // Get the last part (which is the extension)
            const extension = parts[parts.length - 1];
            return extension;
        },

        uploadAttachment(e) {
            this.image.file = e.target.files[0]
        },

        submitBlog() {
            this.$store.dispatch('blogs/addBlog', this.image).then(result=>{
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

                    this.image.file = null
                    this.image.title = ''
                } else {
                    this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                            title: `Error`,
                            icon: 'ThumbsUpIcon',
                            variant: 'error',
                            text: result.response,
                        }
                    })
                }
            })
        },

        deleteType(data){
            this.modify_id = data
        },

        async confirmDelete(){
            await this.$store.dispatch("blogs/deleteBlog", {id: this.modify_id, currentPage: this.$route.query.page}).then(result=>{
                if(result.code == 200) {
                    this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                            title: `Success`,
                            icon: 'ThumbsUpIcon',
                            variant: 'success',
                            text: result.response
                        }
                    })
                }
            })
            this.$nextTick(() => {
                this.$refs['modal-delete'].toggle('#delete-btn')
            })
        }
    }
}
</script>
  
<style lang="scss" scoped>
.no-outline {
    border: none !important;
}

.f20 {
    font-size: 8px !important;
}

.vs__dropdown-menu {
  height: 200px;
}

.full-blog {
    width: 100%;
    display: flex;
    gap: 16px;
}

.upload-blog {
    width: 30%;
}

.image-blog {
    width: 70%;
}

.border-style {
    border: 1px solid;
    padding: 16px;
    border-radius: 5px;
    border-color: rgb(211, 211, 211);
}

.blog-grid-view {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.blog-size {
    width: 230px;
}

.filter-section {
    display: flex;
    gap: 12px;
}

.box-width {
    width: 250px;
}

@media screen and (max-width: 1470px) {
    .blog-grid-view {
        display: grid; 
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px; 
    }

    .blog-size {
        width: 270px;
    }
}

@media screen and (max-width: 1230px) {
    .blog-size {
        width: 230px;
    }
}

@media screen and (max-width: 1199px) {
    .blog-grid-view {
        display: grid; 
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 24px; 
    }

    .blog-size {
        width: 210px;
    }
}

@media screen and (max-width: 1130px) {
    .blog-grid-view {
        display: grid; 
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px; 
    }

    .blog-size {
        width: 250px;
    }
}

@media screen and (max-width: 920px) {
    .full-blog {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .upload-blog {
        width: 100%;
    }

    .image-blog {
        width: 100%;
    }

    .blog-grid-view {
        display: grid; 
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 24px; 
    }

    .blog-size {
        width: 220px;
    }
}

@media screen and (max-width: 835px) {
    .blog-grid-view {
        display: grid; 
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px; 
    }

    .blog-size {
        width: 250px;
    }
}

@media screen and (max-width: 655px) {
    .blog-grid-view {
        gap: 16px; 
    }

    .blog-size {
        width: 220px;
    }
}

@media screen and (max-width: 645px) {
    .box-width {
        width: 100%;
    }
}

@media screen and (max-width: 595px) {
    .blog-size {
        width: 190px;
    }
}

@media screen and (max-width: 505px) {
    .blog-size {
        width: 170px;
    }
}

@media screen and (max-width: 467px) {
    .blog-size {
        width: 155px;
    }

    .filter-section {
        display: flex;
        flex-direction: column;
        gap: 0px;
    }
}

@media screen and (max-width: 430px) {
    .blog-grid-view {
        display: grid; 
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 16px; 
    }

    .blog-size {
        width: 100%;
    }
}

@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-good-table.scss';

</style>