<template>
    <b-card title="Settings">
        <div class="full-content">
            <div class="upload-content border-style">
                <div style="width: 100%; display: flex; flex-direction: column; align-items: start;">
                    <p style="font-weight: 600;">Header Image (1090 X 430)</p>
                    <img v-if="demo_image" style="height: 120px; max-width: 100%; margin-bottom: 24px;" :src="demo_image" alt="">
                    <input type="file" accept="image/*" @change="uploadAttachment">

                    <div style="width: 100%; display: flex; flex-direction: column; gap: 8px;">
                        <h7 class="mt-2" style="font-weight: 600;">Email</h7>
                        <b-form-input v-model="image.email" type="text" placeholder="Enter email address"></b-form-input>
                    </div>

                    <div class="content-width">
                        <div style="width: 100%; display: flex; flex-direction: column; gap: 8px;">
                            <h7 style="font-weight: 600;">Facebook</h7>
                            <b-form-input v-model="image.fb_link" type="text" placeholder="Enter facebook link"></b-form-input>
                        </div>
                        <div style="width: 100%; display: flex; flex-direction: column; gap: 8px;">
                            <h7 style="font-weight: 600;">Twitter</h7>
                            <b-form-input v-model="image.twitter_link" type="text" placeholder="Enter twitter link"></b-form-input>
                        </div>
                    </div>
                    <div class="content-width">
                        <div style="width: 100%; display: flex; flex-direction: column; gap: 8px;">
                            <h7 style="font-weight: 600;">Instagram</h7>
                            <b-form-input v-model="image.instagram_link" type="text" placeholder="Enter instagram link"></b-form-input>
                        </div>
                        <div style="width: 100%; display: flex; flex-direction: column; gap: 8px;">
                            <h7 style="font-weight: 600;">LinkedIn</h7>
                            <b-form-input v-model="image.linkedin_link" type="text" placeholder="Enter linkedIn link"></b-form-input>
                        </div>
                    </div>
                    <div class="content-width">
                        <div style="width: 100%; display: flex; flex-direction: column; gap: 8px;">
                            <h7 style="font-weight: 600;">Phone No.</h7>
                            <b-form-input v-model="image.phone" type="text" placeholder="Enter phone no"></b-form-input>
                        </div>
                        <div style="width: 100%; display: flex; flex-direction: column; gap: 8px;">
                            <h7 style="font-weight: 600;">Website</h7>
                            <b-form-input v-model="image.website" type="text" placeholder="Enter website link"></b-form-input>
                        </div>
                    </div>

                    <div class="content-width">
                        <div style="width: 100%; display: flex; flex-direction: column; gap: 8px;">
                            <h7 style="font-weight: 600;">Country Office Address</h7>
                            <b-form-input v-model="image.country_office" type="text" placeholder="Enter country office address"></b-form-input>
                        </div>
                        <div style="width: 100%; display: flex; flex-direction: column; gap: 8px;">
                            <h7 style="font-weight: 600;">Project Office Address</h7>
                            <b-form-input v-model="image.project_office" type="text" placeholder="Enter project office address"></b-form-input>
                        </div>
                    </div>

                    <b-button style="margin-top: 24px;" variant="primary" @click="submitContent">Upload</b-button>
                </div>
            </div>
        </div>
    </b-card>
</template>
  
<script>
import {
BAvatar,BButton, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BCard,
BModal,VBModal,BCardText, BFormTextarea
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import vSelect from "vue-select"
import Ripple from "vue-ripple-directive";
import {mapState} from "vuex";
import moment from "moment";
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
        BFormTextarea
    },

    directives: {
        'b-modal': VBModal,
        Ripple,
    },

    data() {
        return {
            dir: false,
            image: {
                image: null,
                email: null,
                fb_link: null,
                twitter_link: null,
                instagram_link: null,
                linkedin_link: null,
                phone: null,
                website: null,
                country_office: null,
                project_office: null
            },
            demo_image: null
        }
    },

    computed: {
        ...mapState('content', ["settings","contentError","contentLoading"]),
    
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
        settings(newValue, oldValue) {
            this.image.email = this.settings.email
            this.image.fb_link = this.settings.fb_link
            this.image.twitter_link = this.settings.twitter_link
            this.image.instagram_link = this.settings.instagram_link
            this.image.linkedin_link = this.settings.linkedin_link
            this.image.phone = this.settings.phone
            this.image.website = this.settings.website
            this.image.country_office = this.settings.country_office
            this.image.project_office = this.settings.project_office
            this.demo_image = this.settings.image
        }
    },

    created() {
        this.$store.dispatch('content/fetchSettings')
        this.image.email = this.settings.email
        this.image.fb_link = this.settings.fb_link
        this.image.twitter_link = this.settings.twitter_link
        this.image.instagram_link = this.settings.instagram_link
        this.image.linkedin_link = this.settings.linkedin_link
        this.image.phone = this.settings.phone
        this.image.website = this.settings.website
        this.image.country_office = this.settings.country_office
        this.image.project_office = this.settings.project_office
        this.demo_image = this.settings.image
    },

    methods: {
        uploadAttachment(e) {
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.image.image = e.target.result;
                this.demo_image = e.target.result;
            };
        },

        submitContent() {
            if(this.image.email == '') {
                this.image.email = null
            }
            if(this.image.fb_link == '') {
                this.image.fb_link = null
            }
            if(this.image.twitter_link == '') {
                this.image.twitter_link = null
            }
            if(this.image.instagram_link == '') {
                this.image.instagram_link = null
            }
            if(this.image.linkedin_link == '') {
                this.image.linkedin_link = null
            }
            if(this.image.phone == '') {
                this.image.phone = null
            }
            if(this.image.website == '') {
                this.image.website = null
            }
            if(this.image.country_office == '') {
                this.image.country_office = null
            }
            if(this.image.project_office == '') {
                this.image.project_office = null
            }
            this.$store.dispatch('content/addSettings', this.image).then(result=>{
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

                    this.image.image = null
                    this.image.email = null
                    this.image.fb_link = null
                    this.image.twitter_link = null
                    this.image.instagram_link = null
                    this.image.linkedin_link = null
                    this.image.phone = null
                    this.image.website = null
                    this.image.country_office = null
                    this.image.project_office = null

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

.full-content {
    width: 100%;
    display: flex;
    gap: 16px;
}

.upload-content {
    width: 60%;
}

.content-width {
    margin-top: 16px; 
    width: 100%; 
    display: flex; 
    gap: 20px;
}

.image-content {
    width: 70%;
}

.border-style {
    border: 1px solid;
    padding: 16px;
    border-radius: 5px;
    border-color: rgb(211, 211, 211);
}

.content-grid-view {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.content-size {
    width: 230px;
}

@media screen and (max-width: 1600px) {
    .upload-content {
        width: 70%;
    }
}

@media screen and (max-width: 1470px) {
    .content-grid-view {
        display: grid; 
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px; 
    }

    .content-size {
        width: 270px;
    }

    .upload-content {
        width: 80%;
    }
}

@media screen and (max-width: 1230px) {
    .content-size {
        width: 230px;
    }
}

@media screen and (max-width: 1199px) {
    .content-grid-view {
        display: grid; 
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 24px; 
    }

    .content-size {
        width: 210px;
    }
}

@media screen and (max-width: 1130px) {
    .content-grid-view {
        display: grid; 
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px; 
    }

    .content-size {
        width: 250px;
    }
}

@media screen and (max-width: 920px) {
    .full-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .upload-content {
        width: 100%;
    }

    .image-content {
        width: 100%;
    }

    .content-grid-view {
        display: grid; 
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 24px; 
    }

    .content-size {
        width: 220px;
    }

    .upload-content {
        width: 100%;
    }
}

@media screen and (max-width: 835px) {
    .content-grid-view {
        display: grid; 
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px; 
    }

    .content-size {
        width: 250px;
    }

    .content-width {
        margin-top: 16px; 
        width: 100%; 
        display: flex; 
        flex-direction: column;
        gap: 16px;
    }
}

@media screen and (max-width: 655px) {
    .content-grid-view {
        gap: 16px; 
    }

    .content-size {
        width: 220px;
    }
}

@media screen and (max-width: 595px) {
    .content-size {
        width: 190px;
    }
}

@media screen and (max-width: 505px) {
    .content-size {
        width: 170px;
    }
}

@media screen and (max-width: 465px) {
    .content-size {
        width: 155px;
    }
}

@media screen and (max-width: 430px) {
    .content-grid-view {
        display: grid; 
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 16px; 
    }

    .content-size {
        width: 100%;
    }
}

@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-good-table.scss';

</style>