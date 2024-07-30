<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <logo-dark class="w-50 h-50"/>

<!--          <h2 class="brand-text text-primary ml-1">-->
<!--            CloudX-->
<!--          </h2>-->
        </b-link>

        <b-card-title class="mb-1 text-primary">
          Welcome to BYETS Newsletter! 👋
        </b-card-title>
        <b-card-text class="mb-2">
          Please sign-in to your account and start the adventure!
        </b-card-text>

        <!-- form -->
        <validation-observer
            ref="loginForm"
            #default="{invalid}"
        >
          <b-form
              class="auth-login-form mt-2"
              @submit.prevent="login"
          >

            <!-- email -->
            <b-form-group
                label-for="email"
                label="Email"
            >
              <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
              >
                <b-form-input
                    id="email"
                    v-model="userEmail"
                    name="login-email"
                    :state="errors.length > 0 ? false:null"
                    placeholder="john@example.com"
                    autofocus
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="password">Password</label>
                <!-- <b-link :to="{name:'forgot-password'}">
                  <small>Forgot Password?</small>
                </b-link> -->
              </div>
              <validation-provider
                  #default="{ errors }"
                  name="Password"
                  rules="required"
              >
                <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                      id="password"
                      v-model="password"
                      :type="passwordFieldType"
                      class="form-control-merge"
                      :state="errors.length > 0 ? false:null"
                      name="login-password"
                      placeholder="Password"
                  />

                  <b-input-group-append is-text>
                    <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- checkbox -->
            <b-form-group>
              <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
              >
                Remember Me
              </b-form-checkbox>
            </b-form-group>

            <!-- submit button -->
            <b-button
                variant="primary"
                type="submit"
                block
                :disabled="invalid"
            >
              Sign in
            </b-button>
          </b-form>
        </validation-observer>

<!--        <b-card-text class="text-center mt-2">-->
<!--          <span>New on our platform? </span>-->
<!--          <b-link :to="{name:'auth-register-v1'}">-->
<!--            <span>Create an account</span>-->
<!--          </b-link>-->
<!--        </b-card-text>-->

<!--        <div class="divider my-2">-->
<!--          <div class="divider-text">-->
<!--            or-->
<!--          </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; social button &ndash;&gt;-->
<!--        <div class="auth-footer-btn d-flex justify-content-center">-->
<!--          <b-button-->
<!--              href="javascript:void(0)"-->
<!--              variant="facebook"-->
<!--          >-->
<!--            <feather-icon icon="FacebookIcon" />-->
<!--          </b-button>-->
<!--          <b-button-->
<!--              href="javascript:void(0)"-->
<!--              variant="twitter"-->
<!--          >-->
<!--            <feather-icon icon="TwitterIcon" />-->
<!--          </b-button>-->
<!--          <b-button-->
<!--              href="javascript:void(0)"-->
<!--              variant="google"-->
<!--          >-->
<!--            <feather-icon icon="MailIcon" />-->
<!--          </b-button>-->
<!--          <b-button-->
<!--              href="javascript:void(0)"-->
<!--              variant="github"-->
<!--          >-->
<!--            <feather-icon icon="GithubIcon" />-->
<!--          </b-button>-->
<!--        </div>-->
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BForm, BFormInput, BFormGroup, BCard, BLink, BCardTitle, BCardText, BInputGroup, BInputGroupAppend, BFormCheckbox,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import useJwt from "@/auth/jwt/useJwt";
import {getHomeRouteForLoggedInUser} from "@/auth/utils";
import ToastificationContent from "@core/components/toastification/ToastificationContent";
import {decode,encode} from "@/store/dataMagic";
import ShortLogo from "@core/layouts/components/shortLogo";
import LogoDark from "@core/layouts/components/logo-dark";

export default {
  components: {
    LogoDark,
    ShortLogo,
    // BSV
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCard,
    BCardTitle,
    BLink,
    VuexyLogo,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      userEmail: '',
      password: '',
      status: false,
      // validation rules
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          let magic=encode({
            email: this.userEmail,
            password: this.password,
          })
          useJwt.login(magic.encodedPayload,magic.config)
              .then(result => {
                let response=decode(result.data)
                console.log(response.code)
                if(response.code!==200){
                  throw response.errors
                }

                const userData={
                  "id": response.user_object.id,
                  "fullName":response.user_object.first_name+"  "+response.user_object.last_name ,
                  "username": response.user_object.username,
                  "avatar": "/img/13-small.d796bffd.png",
                  "email": response.user_object.email,
                  // "role": response.user_group,
                  // "permissions": response.user_permissions,
                  'ability':[
                    {
                      "action": "manage",
                      "subject": "all"
                    }
                  ]
                }
                console.log(response)
                useJwt.setToken(response.access_token)
                useJwt.setRefreshToken(response.refresh_token)
                localStorage.setItem('userData', JSON.stringify(userData))
                // userData.permissions= userData.permissions.map( i => i.codename);
                // localStorage.setItem('permissions', JSON.stringify(userData.permissions))
                if(this.status){
                  useJwt.setRememberMe(this.status)
                }

                let ability= [
                  {
                    "action": "manage",
                    "subject": "all"
                  }
                ]

                this.$ability.update(ability)
                // ? This is just for demo purpose as well.
                // ? Because we are showing eCommerce app's cart items count in navbar
                // this.$store.commit('app-ecommerce/UPDATE_CART_ITEMS_COUNT', userData.extras.eCommerceCartItemsCount)

                // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
                // this.$router.replace({name:'dashboard'})
                //     .then(() => {
                //       this.$toast({
                //         component: ToastificationContent,
                //         position: 'top-right',
                //         props: {
                //           title: `Welcome ${userData.fullName || userData.username}`,
                //           icon: 'CoffeeIcon',
                //           variant: 'success',
                //           text: `You have successfully logged in as ${userData.role}. Now you can start to explore!`,
                //         },
                //       })
                //     })

                window.location.href='/';
              })
              .catch(error => {
                this.$toast({
                  component: ToastificationContent,
                  position: 'bottom-end',
                  props: {
                    title: 'Login Error',
                    icon: 'AlertOctagonIcon',
                    variant: 'danger',
                    text:error ,
                  },
                })
                this.$refs.loginForm.setErrors(error)
              })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
