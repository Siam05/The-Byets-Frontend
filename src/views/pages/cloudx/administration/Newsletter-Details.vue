<template>
    <b-card title="Newsletter Edit">
        <div style="width: 100%;">
            <div class="main-div-layout">
                <div class="main-template-layout" v-if="test">
                    <div class="big-screen-width">
                        <b-form-input v-model="subject" type="text" placeholder="Enter email subject"></b-form-input>
                    </div>

                    <div v-for="(fo, index) in layouts" :key="index">
                        <div>
                            <div style="display: flex; gap: 4px; margin-bottom: 12px;">
                                <div class="big-screen-width">
                                    <div>
                                        <b-form-select v-model="fo.template">
                                            <b-form-select-option v-for="option in options" :value="option.value">{{ option.title }}</b-form-select-option>
                                        </b-form-select>
                                    </div>
                                </div>
                    
                                <div style="width: 20%; display: flex; align-items: center;">
                                    <!-- Add Svg Icon -->
                                    <svg @click="addField(input, layouts)" width="24" height="24"
                                        class="cursor-pointer" style="cursor: pointer; margin-right: 2px;">
                                        <path fill="none" d="M0 0h24v24H0z"/>
                                        <path fill="#00477a"
                                            d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
                                    </svg>
                    
                                    <!-- Remove Svg Icon -->
                                    <svg v-show="layouts.length > 1" @click="removeField(index, layouts)"
                                        width="24" height="24" style="cursor: pointer; margin-left: 2px;">
                                        <path fill="none" d="M0 0h24v24H0z"/>
                                        <path fill="#b91c1c"
                                            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"/>
                                    </svg>
                                </div>
                            </div>

                            <div style="display: flex; flex-direction: column; gap: 12px;" class="section-screen" v-if="fo.template == 1">
                                <div class="w-fullbg-white rounded-sm">
                                    <b-form-input v-model="fo.title" type="text" placeholder="Enter title"></b-form-input>
                                </div>
                                <div class="w-fullbg-white rounded-sm">
                                    <b-form-textarea v-model="fo.details" id="textarea-default" placeholder="Enter details"></b-form-textarea>
                                </div>
                                <div class="w-fullbg-white rounded-sm"> 
                                    <div style="display: flex; gap: 16px; align-items: center;">
                                        <b-form-input v-model="fo.link" type="text" placeholder="Enter button link"></b-form-input>
                                        <b-button style="height: 38px;" v-b-modal.bv-modal-blog-xl @click="getBlog(fo)">Select</b-button>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; gap: 12px;" class="section-screen" v-if="fo.template == 2">
                                <div class="w-fullbg-white rounded-sm">
                                    <div style="display: flex; gap: 16px; align-items: center;">
                                        <img v-if="fo.image" style="height: 160px; max-width: 75%;" :src="fo.image" alt="">
                                        <b-button style="height: 40px;" v-b-modal.bv-modal-example-xl @click="getImage(fo)">Select Image</b-button>
                                    </div>
                                </div> 
                                <div class="w-fullbg-white rounded-sm">
                                    <b-form-input v-model="fo.caption" type="text" placeholder="Enter image caption"></b-form-input>
                                </div>
                                <div class="w-fullbg-white rounded-sm">
                                    <b-form-input v-model="fo.title" type="text" placeholder="Enter title"></b-form-input>
                                </div>
                                <div class="w-fullbg-white rounded-sm">
                                    <b-form-textarea v-model="fo.details" id="textarea-default" placeholder="Enter details"></b-form-textarea>
                                </div>
                                <div class="w-fullbg-white rounded-sm">
                                    <div style="display: flex; gap: 16px; align-items: center;">
                                        <b-form-input v-model="fo.link" type="text" placeholder="Enter button link"></b-form-input>
                                        <b-button style="height: 38px;" v-b-modal.bv-modal-blog-xl @click="getBlog(fo)">Select</b-button>
                                    </div>
                                </div>
                            </div>

                            <div style="display: flex; flex-direction: column; gap: 12px;" class="section-screen" v-if="fo.template == 3">
                                <div class="w-fullbg-white rounded-sm">
                                    <div style="display: flex; gap: 16px; align-items: center;">
                                        <img v-if="fo.image" style="height: 160px; max-width: 75%;" :src="fo.image" alt="">
                                        <b-button style="height: 40px;" v-b-modal.bv-modal-example-xl @click="getImage(fo)">Select Image</b-button>
                                    </div>
                                </div>
                                <div class="w-fullbg-white rounded-sm">
                                    <b-form-input v-model="fo.caption" type="text" placeholder="Enter image caption"></b-form-input>
                                </div>
                                <div class="w-fullbg-white rounded-sm">
                                    <b-form-input v-model="fo.title" type="text" placeholder="Enter title"></b-form-input>
                                </div>
                                <div class="w-fullbg-white rounded-sm">
                                    <b-form-textarea v-model="fo.details" id="textarea-default" placeholder="Enter details"></b-form-textarea>
                                </div>
                                <div class="w-fullbg-white rounded-sm">
                                    <div style="display: flex; gap: 16px; align-items: center;">
                                        <b-form-input v-model="fo.link" type="text" placeholder="Enter button link"></b-form-input>
                                        <b-button style="height: 38px;" v-b-modal.bv-modal-blog-xl @click="getBlog(fo)">Select</b-button>
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 12px;" class="section-screen" v-if="fo.template == 4">
                                <div class="w-fullbg-white rounded-sm">
                                    <div style="display: flex; gap: 16px; align-items: center;">
                                        <img v-if="fo.image" style="height: 160px; max-width: 75%;" :src="fo.image" alt="">
                                        <b-button style="height: 40px;" v-b-modal.bv-modal-example-xl @click="getImage(fo)">Select Image</b-button>
                                    </div>
                                </div>
                                <div class="w-fullbg-white rounded-sm">
                                    <b-form-input v-model="fo.caption" type="text" placeholder="Enter image caption"></b-form-input>
                                </div>
                                <div class="w-fullbg-white rounded-sm">
                                    <b-form-input v-model="fo.title" type="text" placeholder="Enter title"></b-form-input>
                                </div>
                                <div class="w-fullbg-white rounded-sm">
                                    <b-form-textarea v-model="fo.details" id="textarea-default" placeholder="Enter details"></b-form-textarea>
                                </div>
                                <div class="w-fullbg-white rounded-sm">
                                    <div style="display: flex; gap: 16px; align-items: center;">
                                        <b-form-input v-model="fo.link" type="text" placeholder="Enter button link"></b-form-input>
                                        <b-button style="height: 38px;" v-b-modal.bv-modal-blog-xl @click="getBlog(fo)">Select</b-button>
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 12px;" class="section-screen" v-if="fo.template == 5">
                                <div class="w-fullbg-white rounded-sm">
                                    <div style="display: flex; gap: 16px; align-items: center;">
                                        <img v-if="fo.image" style="height: 160px; max-width: 75%;" :src="fo.image" alt="">
                                        <b-button style="height: 40px;" v-b-modal.bv-modal-example-xl @click="getImage(fo)">Select Image</b-button>
                                    </div>
                                </div>
                                <div class="w-fullbg-white rounded-sm">
                                    <b-form-input v-model="fo.caption" type="text" placeholder="Enter image caption"></b-form-input>
                                </div>
                                <div class="w-fullbg-white rounded-sm">
                                    <b-form-input v-model="fo.title" type="text" placeholder="Enter title"></b-form-input>
                                </div>
                                <div class="w-fullbg-white rounded-sm">
                                    <b-form-textarea v-model="fo.details" id="textarea-default" placeholder="Enter details"></b-form-textarea>
                                </div>
                                <div class="w-fullbg-white rounded-sm">
                                    <div style="display: flex; gap: 16px; align-items: center;">
                                        <b-form-input v-model="fo.link" type="text" placeholder="Enter button link"></b-form-input>
                                        <b-button style="height: 38px;" v-b-modal.bv-modal-blog-xl @click="getBlog(fo)">Select</b-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 16px;">
                        <h6 style="padding-top: 5px;">Footer Background Color Visibility:</h6>
                        <div v-if="footerColor" @click="footerColor = false" style="background-color: #82868B; color: #ffffff; padding: 4px; height: 27px; cursor: pointer; border-radius: 4px;">Hide</div>
                        <div v-else @click="footerColor = true" style="background-color: #00477a; color: #ffffff; padding: 4px; height: 27px; cursor: pointer; border-radius: 4px;">Visible</div>
                    </div>

                    <div style="display: flex; gap: 16px;">
                        <b-button style="height: 40px;" @click="submitTemplate" variant="primary">Save Newsletter</b-button>
                    </div>
                </div>

                <div class="main-demo-layout">
                    <div style="width: 100%; display: flex; justify-content: end; margin-bottom: 20px;">
                        <div style="display: flex; gap: 12px;">
                            <b-button variant="primary" @click="sendEmail">Send Email</b-button>
                        </div>
                    </div>
                    
                    <div style="display: flex; width: 100%; justify-content: center;">
                        <div style="width: 100%;">
                            <div>
                                <html>
                                    <head></head>
                                    <div id="emailtemplate">
                                        <body>
                                            <table style="width: 100%; background-color: #E4E4E4;" align="center" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td> </td>
                                                        <td class="full-body" width="600" style="width: 600px; background-color: #ffffff;">
                                                            <div>
                                                                <!-- HEADER -->
                                                                <div style="width: 100%;">
                                                                    <img style="width: 100%;" :src="settings.image" alt="">
                                                                </div> 

                                                                <!-- BODY -->
                                                                <div style="width: 100%;" v-for="(fo, index) in layouts" :key="index">
                                                                    <div v-if="fo.template == 1">
                                                                        <div>
                                                                            <div style="padding: 20px;">
                                                                                <div style="width: 100%; display: flex; align-items: center;">
                                                                                    <p style="width: 100%; font-size: x-large; font-weight: 600; text-align: center; color: #000000; line-height: 2rem;">
                                                                                        {{ fo.title }}
                                                                                    </p>
                                                                                </div>
                                                                                <div style="text-align: justify; color: #1E1E1E;">
                                                                                    <span>{{ fo.details }}</span>
                                                                                </div>
                                                                                <br />
                                                                                <div style="text-align: left;">
                                                                                    <div v-if="fo.link" style="text-align: left;">
                                                                                        <a :href="fo.link" target="_blank"><img style="height: 25px;" src="https://api-swissnews.smicee.com/media/read_more.png" alt=""></a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else-if="fo.template == 2">
                                                                        <div>
                                                                            <div style="padding: 20px;">
                                                                                <div style="width: 100%; display: flex; align-items: center;">
                                                                                    <p style="width: 100%; font-size: x-large; font-weight: 600; text-align: center; color: #000000; line-height: 2rem;">{{ fo.title }}</p>
                                                                                </div>
                                                                                <div style="overflow: hidden;">
                                                                                    <div style="float: right; margin-left: 16px;">
                                                                                        <div>
                                                                                            <img style="width: 200px; margin-top: 16px;" :src="fo.image" alt="">
                                                                                            <div style="max-width: 200px; word-wrap: break-word; color: #1E1E1E;">
                                                                                                <i style="font-size: smaller; margin-top: 2px;">{{ fo.caption }}</i>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div style="text-align: justify; color: #1E1E1E;">
                                                                                        <span>{{ fo.details }}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <br />
                                                                                <div v-if="fo.link" style="text-align: left;">
                                                                                    <a :href="fo.link" target="_blank"><img style="height: 25px;" src="https://api-swissnews.smicee.com/media/read_more.png" alt=""></a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else-if="fo.template == 3">
                                                                        <div>
                                                                            <div style="padding: 20px;">
                                                                                <div style="width: 100%; display: flex; align-items: center;">
                                                                                    <p style="width: 100%; font-size: x-large; font-weight: 600; text-align: center; color: #000000; line-height: 2rem;">{{ fo.title }}</p>
                                                                                </div>
                                                                                <div style="overflow: hidden;">
                                                                                    <div style="float: left; margin-right: 16px;">
                                                                                        <div>
                                                                                            <img style="width: 200px; margin-top: 16px;" :src="fo.image" alt="">
                                                                                            <div style="max-width: 200px; word-wrap: break-word; color: #1E1E1E;">
                                                                                                <i style="font-size: smaller; margin-top: 2px;">{{ fo.caption }}</i>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div style="text-align: justify; color: #1E1E1E;">
                                                                                        <span>{{ fo.details }}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <br />
                                                                                <div v-if="fo.link" style="text-align: left;">
                                                                                    <a :href="fo.link" target="_blank"><img style="height: 25px;" src="https://api-swissnews.smicee.com/media/read_more.png" alt=""></a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div> 
                                                                    <div v-else-if="fo.template == 4">
                                                                        <div>
                                                                            <div style="padding: 20px;">
                                                                                <div style="width: 100%;">
                                                                                    <div style="width: 100%;">
                                                                                        <div style="width: 100%;">
                                                                                            <p v-if="fo.title" style="width: 100%; font-size: x-large; font-weight: 600; text-align: center; color: #000000; line-height: 2rem;">{{ fo.title }}</p>
                                                                                            <div>
                                                                                                <img style="width: 100%;" :src="fo.image" alt="">
                                                                                                <div style="max-width: 90%; word-wrap: break-word; color: #1E1E1E;"> 
                                                                                                    <i style="font-size: smaller; margin-top: 2px;">{{ fo.caption }}</i>
                                                                                                </div>
                                                                                            </div>
                                                                                            <br />
                                                                                            <div v-if="fo.details" style="text-align: justify; color: #1E1E1E;">
                                                                                                <span>{{ fo.details }}</span>
                                                                                            </div>
                                                                                            <br />
                                                                                            <div v-if="fo.link" style="text-align: left;">
                                                                                                <a :href="fo.link" target="_blank"><img style="height: 25px;" src="https://api-swissnews.smicee.com/media/read_more.png" alt=""></a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else-if="fo.template == 5">
                                                                        <div>
                                                                            <div style="padding: 20px;">
                                                                                <div style="width: 100%;">
                                                                                    <div style="width: 100%;">
                                                                                        <div style="width: 100%;">
                                                                                            <p v-if="fo.title" style="width: 100%; font-size: x-large; font-weight: 600; text-align: center; color: #000000; line-height: 2rem;">{{ fo.title }}</p>
                                                                                            <div v-if="fo.details" style="text-align: justify; color: #1E1E1E;">
                                                                                                <span>{{ fo.details }}</span>
                                                                                            </div>
                                                                                            <div v-if="fo.link" style="text-align: left;">
                                                                                                <br />
                                                                                                <a :href="fo.link" target="_blank"><img style="height: 25px;" src="https://api-swissnews.smicee.com/media/read_more.png" alt=""></a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div>
                                                                                        <br />
                                                                                        <img style="width: 100%;" :src="fo.image" alt="">
                                                                                        <div style="max-width: 90%; word-wrap: break-word; color: #1E1E1E;"> 
                                                                                            <i style="font-size: smaller; margin-top: 2px;">{{ fo.caption }}</i>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else>
                                                                        <div>
                                                                            <div style="padding: 20px;">
                                                                                <p style="font-weight: 500; font-size: large; text-align: center; padding-top: 20px;">No Preview to Show!</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <!-- FOOTER -->
                                                                <div>
                                                                    <div style="background-color: #00477a; color: #ffffff;" v-if="footerColor">
                                                                        <div style="padding: 20px;">
                                                                            <table style="width: 100%;">
                                                                                <tbody style="width: 100%;">
                                                                                    <tr style="width: 100%;">
                                                                                        <td style="width: 2%;"> </td>
                                                                                        <td align="center">
                                                                                            <div>
                                                                                                <div v-if="settings.country_office">
                                                                                                    <img style="height: 16px;" src="https://api-swissnews.smicee.com/media/white-location.png" alt=""><span style="padding-left: 8px;">{{ settings.country_office }}</span>
                                                                                                </div>

                                                                                                <div v-if="settings.project_office" style="margin-top: 8px;">
                                                                                                    <img style="height: 16px;" src="https://api-swissnews.smicee.com/media/white-location.png" alt=""><span style="padding-left: 8px;">{{ settings.project_office }}</span>
                                                                                                </div>

                                                                                                <div v-if="settings.phone" style="margin-top: 8px;"><img style="height: 16px;" src="https://api-swissnews.smicee.com/media/white-phone.png" alt=""><span style="padding-left: 8px;">+00 123 456 789</span></div>

                                                                                                <p v-if="settings.website" style="margin-top: 8px;"><img style="height: 17px;" src="https://api-swissnews.smicee.com/media/white-link.png" alt=""><span style="padding-left: 8px;">www.website.com</span></p>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td style="width: 2%;"> </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>

                                                                            <table style="width: 100%;">
                                                                                <tbody style="width: 100%;">
                                                                                    <tr style="width: 100%; border-top-style: solid; border-bottom-style: solid; border-width: 1.5px; border-color: #7f7f7f;">
                                                                                        <td style="width: 10%;"></td>
                                                                                        
                                                                                        <td style="width: 20%;" align="center">
                                                                                            <div v-if="settings.fb_link" style="margin: 0px 4px; padding-top: 16px; padding-bottom: 16px;">
                                                                                                <a :href="settings.fb_link" target="_blank">
                                                                                                    <div style="padding-top: 4px; padding-bottom: 4px;">
                                                                                                        <img style="height: 18px;" src="https://api-swissnews.smicee.com/media/white-fb.png" alt="">
                                                                                                    </div>
                                                                                                </a>
                                                                                            </div>
                                                                                        </td>

                                                                                        <td style="width: 20%;" align="center">
                                                                                            <div v-if="settings.twitter_link" style="margin: 0px 4px; padding-top: 16px; padding-bottom: 16px;">
                                                                                                <a :href="settings.twitter_link" target="_blank">
                                                                                                    <div style="padding-top: 4px; padding-bottom: 4px;">
                                                                                                        <img style="height: 16px;" src="https://api-swissnews.smicee.com/media/white-x.png" alt="">
                                                                                                    </div>
                                                                                                </a>
                                                                                            </div>
                                                                                        </td>

                                                                                        <td style="width: 20%;" align="center">
                                                                                            <div v-if="settings.instagram_link" style="margin: 0px 4px; padding-top: 16px; padding-bottom: 16px;">
                                                                                                <a :href="settings.instagram_link" target="_blank">
                                                                                                    <div style="padding-top: 4px; padding-bottom: 4px;">
                                                                                                        <img style="height: 16px;" src="https://api-swissnews.smicee.com/media/white-insta.png" alt="">
                                                                                                    </div>
                                                                                                </a>
                                                                                            </div>
                                                                                        </td>

                                                                                        <td style="width: 20%;" align="center">
                                                                                            <div v-if="settings.linkedin_link" style="margin: 0px 4px; padding-top: 16px; padding-bottom: 16px;">
                                                                                                <a :href="settings.linkedin_link" target="_blank">
                                                                                                    <div style="padding-top: 4px; padding-bottom: 4px;">
                                                                                                        <img style="height: 16px;" src="https://api-swissnews.smicee.com/media/white-in.png" alt="">
                                                                                                    </div>
                                                                                                </a>
                                                                                            </div> 
                                                                                        </td>
                                                                                        <td style="width: 10%;"></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>

                                                                            <table style="width: 100%;">
                                                                                <tbody style="width: 100%;">
                                                                                    <tr style="width: 100%;">
                                                                                        <td style="max-width: 2%;"> </td>
                                                                                        <td style="font-size: small; padding: 12px 8px 0px;" align="center">
                                                                                            <h7>© 2024, All Rights Reserved.</h7>
                                                                                        </td>
                                                                                        <td style="max-width: 2%;"> </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else>
                                                                        <div style="padding: 20px;">
                                                                            <table style="width: 100%;">
                                                                                <tbody style="width: 100%;">
                                                                                    <tr style="width: 100%;">
                                                                                        <td style="width: 2%;"> </td>
                                                                                        <td align="center">
                                                                                            <div>
                                                                                                <div v-if="settings.country_office">
                                                                                                    <img width="19" height="19" src="https://api-swissnews.smicee.com/media/location.jpg" alt=""><span style="padding-left: 8px;">{{ settings.country_office }}</span>
                                                                                                </div>

                                                                                                <div v-if="settings.project_office" style="margin-top: 8px;">
                                                                                                    <img width="19" height="19" src="https://api-swissnews.smicee.com/media/location.jpg" alt=""><span style="padding-left: 8px;">{{ settings.project_office }}</span>
                                                                                                </div>

                                                                                                <div v-if="settings.phone" style="margin-top: 8px;"><img width="19" height="19" src="https://api-swissnews.smicee.com/media/phone.jpg" alt=""><span style="padding-left: 8px;">+00 123 456 789</span></div>

                                                                                                <p v-if="settings.website" style="margin-top: 8px;"><img width="19" height="19" src="https://api-swissnews.smicee.com/media/link.jpg" alt=""><span style="padding-left: 8px;">www.website.com</span></p>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td style="width: 2%;"> </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>

                                                                            <table style="width: 100%;">
                                                                                <tbody style="width: 100%;">
                                                                                    <tr style="width: 100%; border-top-style: solid; border-bottom-style: solid; border-width: 1.5px; border-color: #7f7f7f;">
                                                                                        <td style="width: 10%;"></td>
                                                                                        
                                                                                        <td style="width: 20%;" align="center">
                                                                                            <div v-if="settings.fb_link" style="margin: 0px 4px; padding-top: 16px; padding-bottom: 16px;">
                                                                                                <a :href="settings.fb_link" target="_blank">
                                                                                                    <div style="padding-top: 4px; padding-bottom: 4px;">
                                                                                                        <img src="https://api-swissnews.smicee.com/media/fb.jpg" alt="">
                                                                                                    </div>
                                                                                                </a>
                                                                                            </div>
                                                                                        </td>

                                                                                        <td style="width: 20%;" align="center">
                                                                                            <div v-if="settings.twitter_link" style="margin: 0px 4px; padding-top: 16px; padding-bottom: 16px;">
                                                                                                <a :href="settings.twitter_link" target="_blank">
                                                                                                    <div style="padding-top: 4px; padding-bottom: 4px;">
                                                                                                        <img src="https://api-swissnews.smicee.com/media/x.jpg" alt="">
                                                                                                    </div>
                                                                                                </a>
                                                                                            </div>
                                                                                        </td>

                                                                                        <td style="width: 20%;" align="center">
                                                                                            <div v-if="settings.instagram_link" style="margin: 0px 4px; padding-top: 16px; padding-bottom: 16px;">
                                                                                                <a :href="settings.instagram_link" target="_blank">
                                                                                                    <div style="padding-top: 4px; padding-bottom: 4px;">
                                                                                                        <img src="https://api-swissnews.smicee.com/media/insta.jpg" alt="">
                                                                                                    </div>
                                                                                                </a>
                                                                                            </div>
                                                                                        </td>

                                                                                        <td style="width: 20%;" align="center">
                                                                                            <div v-if="settings.linkedin_link" style="margin: 0px 4px; padding-top: 16px; padding-bottom: 16px;">
                                                                                                <a :href="settings.linkedin_link" target="_blank">
                                                                                                    <div style="padding-top: 4px; padding-bottom: 4px;">
                                                                                                        <img src="https://api-swissnews.smicee.com/media/in.jpg" alt="">
                                                                                                    </div>
                                                                                                </a>
                                                                                            </div> 
                                                                                        </td>
                                                                                        <td style="width: 10%;"></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>

                                                                            <table style="width: 100%;">
                                                                                <tbody style="width: 100%;">
                                                                                    <tr style="width: 100%;">
                                                                                        <td style="max-width: 2%;"> </td>
                                                                                        <td style="font-size: small; padding: 12px 8px 0px;" align="center">
                                                                                            <h7>© 2024, All Rights Reserved.</h7>
                                                                                        </td>
                                                                                        <td style="max-width: 2%;"> </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td> </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </body>
                                    </div>
                                </html>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODAL -->
        <b-modal id="bv-modal-example-xl" size="xl" hide-footer>
            <template #modal-title>
               Select
            </template> 
            <div>
                <div class="d-block text-center"> 
                    <div class="full-content">
                        <div class="upload-content border-style">
                            <div style="width: 100%; display: flex; flex-direction: column; align-items: start;">
                                <img v-if="demo_image" style="height: 120px; max-width: 100%; margin-bottom: 24px;" :src="demo_image" alt="">
                                <input type="file" accept="image/*" @change="uploadAttachment">
                                <b-form-input style="margin-top: 24px;" v-model="image.title" type="text" placeholder="Enter title"></b-form-input>
                                <b-button style="margin-top: 24px;" variant="primary" @click="submitContent">Upload</b-button>
                            </div>
                        </div>
                        <div style="width: 100%;">
                            <div class="task-board-task-scroll">
                                <div class="image-content border-style" style="height: 100%; width: 100%; overflow-y: auto;">
                                    <div class="content-grid-view">
                                        <div v-for="image, index in image_contents" :key="index">
                                            <div @click="selectImage(image)" style="height: 160px;">
                                                <img class="content-size" style="max-height: 160px; object-fit: contain;" :src="image.image" alt="">
                                            </div>
                                            <p @click="selectImage(image)" style="margin-top: 6px;">{{ image.title }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>

        <!-- MODAL -->
        <b-modal id="bv-modal-blog-xl" size="xl" hide-footer>
            <template #modal-title>
               Select
            </template>
            <div>
                <div class="d-block text-center"> 
                    <div class="full-content">
                        <div class="upload-content border-style">
                            <div style="width: 100%; display: flex; flex-direction: column; align-items: start;">
                                <input type="file" @change="uploadBlogAttachment"> 
                                <b-form-input style="margin-top: 24px;" v-model="blog.title" type="text" placeholder="Enter title"></b-form-input>
                                <b-button style="margin-top: 24px;" variant="primary" @click="submitBlog">Upload</b-button>
                            </div>
                        </div>
                        <div style="width: 100%;">
                            <div class="task-board-task-scroll">
                                <div class="image-content border-style" style="height: 100%; width: 100%; overflow-y: auto;">
                                    <div class="content-grid-view">
                                        <div v-for="blog, index in blog_contents" :key="index">
                                            <div v-if="blog.file !== null">
                                                <div style="display: flex; height: 160px;" @click="selectBlog(blog)">
                                                    <div v-if="getFileExtension(blog.file) == 'jpg' || getFileExtension(blog.file) == 'png' || getFileExtension(blog.file) == 'jpeg' || getFileExtension(blog.file) == 'svg' || getFileExtension(blog.file) == 'gif'">
                                                        <img class="blog-size" style="max-height: 160px; object-fit: contain;" :src="host + blog.file" alt="">
                                                    </div>
                                                    <div v-else>
                                                        <img class="blog-size" style="max-height: 160px; object-fit: contain;" :src="fileImage" alt="">
                                                    </div>
                                                </div>
                                                <p @click="selectBlog(blog)" style="margin-top: 6px; text-align: left;">{{ blog.title }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
    </b-card>
</template>
  
<script>
import { BAvatar,BButton, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BFormSelectOption, BDropdown, BDropdownItem, BCard,
BModal,VBModal,BCardText, BFormTextarea, BCalendar, BFormDatepicker } from 'bootstrap-vue';
import store from '@/store/index';
import Ripple from "vue-ripple-directive";
import { mapState } from "vuex";
import ToastificationContent from "@core/components/toastification/ToastificationContent";
import fileImage from '../../../../assets/images/templates/file-thumbnail.png';

export default {
    components: {
        BAvatar,
        BCard,
        BBadge,
        BButton,
        BPagination,
        BFormGroup,
        BFormInput,
        BFormSelect,
        BFormSelectOption,
        BDropdown,
        BDropdownItem,
        BModal,
        BCardText,
        BFormTextarea,
        BCalendar,
        BFormDatepicker
    },

    directives: {
        'b-modal': VBModal,
        Ripple,
    },

    computed: {
        ...mapState('content', ["contents_without_pg", "settings", "template_detail", "contentError", "contentLoading"]),
        ...mapState('blogs', ["blogs_without_pg","blogError","blogLoading"]),

        direction() {
            if (store.state.appConfig.isRTL) {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.dir = true
                return this.dir
            }
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.dir = false
            return this.dir
        }
    },

    watch: {
        contents_without_pg(newValue, oldValue) {
            this.image_contents = this.contents_without_pg
        },

        blogs_without_pg(newValue, oldValue) {
            this.blog_contents = this.blogs_without_pg
        },

        template_detail(newValue, oldValue) {
            this.layouts = this.template_detail.value
            this.subject = this.template_detail.subject
            this.footerColor = this.template_detail.footerColor
        }
    },

    created() {
        this.$store.dispatch('content/fetchSettings')
        this.image_contents = this.contents
        this.$store.dispatch('content/fetchTemplateDetails', this.$route.params.id)
        this.layouts = this.template_detail.value
        this.subject = this.template_detail.subject
        this.footerColor = this.template_detail.footerColor
        this.$store.dispatch('content/fetchContentWithoutPG', {
            start_date: this.content_start_date !== null ? this.content_start_date : null,
            end_date: this.content_end_date !== null ? this.content_end_date : null
        })
        this.image_contents = this.contents_without_pg
        this.$store.dispatch('blogs/fetchBlogWithoutPG', {
            start_date: this.blog_start_date !== null ? this.blog_start_date : null,
            end_date: this.blog_end_date !== null ? this.blog_end_date : null
        })
        this.blog_contents = this.blogs_without_pg
    },

    data() {
        return {
            test: true,
            host: 'https://api-swissnews.smicee.com',
            selected_image: null,
            nameState: null,
            dir: false,
            rows: [],
            searchTerm: '',
            footerColor: true,
            viewPreview: false,
            hideTemplate: false,
            header: null,
            subject: null,
            layouts: [
                {
                    template: null,
                    caption: '',
                    title: '',
                    details: '',
                    link: '',
                    image: null
                }
            ],
            options: [
                {
                    title: 'Select a template',
                    value: 'null',
                    disabled: true
                },
                {
                    title: 'Template - 1 (Outlook)',
                    value: '1'
                },
                {
                    title: 'Template - 2',
                    value: '2'
                },
                {
                    title: 'Template - 3',
                    value: '3'
                },
                {
                    title: 'Template - 4 (Outlook)',
                    value: '4'
                },
                {
                    title: 'Template - 5 (Outlook)',
                    value: '5'
                }
            ],
            image: {
                image: null,
                title: ''
            },
            blog: {
                file: null,
                title: ''
            },
            image_contents: [],
            blog_contents: [],
            selectedImage: null,
            selectedBlog: null,
            body: null,
            innerhtml: null,
            demo_image: null,
            fileImage: fileImage,
            content_start_date: null,
            content_end_date: null,
            blog_start_date: null,
            blog_end_date: null
        }
    },

    methods: {
        testToggle(){
            if(this.test) {
                this.test = false
            }else{
                this.test = true
            }
        },

        getFileExtension(link) {
            // Split the link by dots
            const parts = link.split('.');
            // Get the last part (which is the extension)
            const extension = parts[parts.length - 1];
            return extension;
        },

        getImage(fo) {
            fo.image = null
            this.selectedImage = fo
        },

        selectImage(img) {
            this.testToggle()
            this.selectedImage.image = img.image
            this.$nextTick(() => {
                this.$bvModal.hide('bv-modal-example-xl')
            })
            this.testToggle()
        },

        getBlog(fo) {
            fo.link = ''
            this.selectedBlog = fo
        },

        selectBlog(blog) {
            this.testToggle()
            this.selectedBlog.link = this.host + blog.file
            this.$nextTick(() => {
                this.$bvModal.hide('bv-modal-blog-xl')
            })
            this.testToggle()
        },

        uploadBlogAttachment(e) {
            this.blog.file = e.target.files[0]
        },

        submitBlog() {
            this.$store.dispatch('blogs/addBlogFromPG', this.blog).then(result=>{
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

                    this.blog.file = null
                    this.blog.title = ''
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

        addField(value, fieldType) {
            fieldType.push({value: ""});
        },
    
        removeField(index, fieldType) {
            fieldType.splice(index, 1);
        },

        uploadAttachment(e) {
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.image.image = e.target.result;
            };
        },

        submitTemplate() {
            this.innerhtml = document.getElementById('emailtemplate').innerHTML;

            this.$store.dispatch('content/updateLayout', {subject: this.subject, footerColor: this.footerColor, value: this.layouts, inner_html: this.innerhtml, id: this.$route.params.id}).then(result=>{
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

                    setTimeout(() => {
                        this.$router.push('/newsletters')
                    }, 3000)
                }
            })
        },

        sendEmail() {
            this.body = `<html><head></head>` + document.getElementById('emailtemplate').innerHTML + `</html>`;

            this.$store.dispatch('content/sendMail', {subject: this.subject, body: this.body}).then(result=>{
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
            })
        },

        submitContent() {
            this.$store.dispatch('content/addContentFromPG', this.image).then(result=>{
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
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-good-table.scss';

.task-board-task-scroll {
    position: relative;
    height: 87.8vh;
}

.main-div-layout {
    width: 100%;
    display: flex;
    gap: 24px;
}

.big-screen-width {
    width: 70%;
}

.section-screen {
    width: 90%;
}

.main-template-layout {
    width: 60%;
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 40px;
}

.main-demo-layout {
    width: 40%;
}

.content-container {
    overflow: hidden; /* Clearfix for floats */
}

.image-container4 {
    float: left;
    margin-right: 16px;  
}

.content-grid-view {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.content-size {
    width: 230px;
}

.imageStyle {
    background-size: cover;
    object-fit: cover;
    width: 100%;
}

.full-content {
    width: 100%;
    display: flex;
    gap: 16px;
}

.border-style {
    border: 1px solid;
    padding: 16px;
    border-radius: 5px;
    border-color: rgb(211, 211, 211);
}

.upload-content {
    width: 30%;
}

.image-content {
    width: 70%;
}

/* height */
::-webkit-scrollbar {
    height: 6px;
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
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

    .main-div-layout {
        gap: 0px;
    }

    .main-template-layout {
        width: 50%;
    }

    .main-demo-layout {
        width: 50%;
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
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 24px; 
    }

    .content-size {
        width: 210px;
    }

    .upload-content {
        width: 50%;
    }

    .image-content {
        width: 50%;
    }
}

@media screen and (max-width: 991px) {
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
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px; 
    }

    .content-size {
        width: 200px;
    }

    .main-div-layout {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .big-screen-width {
        width: 100%;
    }

    .section-screen {
        width: 100%;
    }

    .main-template-layout {
        width: 100%;
    }

    .main-demo-layout {
        width: 100%;
    }
}

@media screen and (max-width: 835px) {
    .content-grid-view {
        display: grid; 
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 24px; 
    }

    .content-size {
        width: 250px;
    }
}

@media screen and (max-width: 430px) {
    .content-size {
        width: 100%;
    }
}
</style>