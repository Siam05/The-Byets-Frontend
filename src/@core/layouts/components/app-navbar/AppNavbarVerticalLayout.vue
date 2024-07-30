<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

<!--    &lt;!&ndash; Left Col &ndash;&gt;-->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
          <span class="text-white">{{getTime()}}</span>
      <!-- Bookmarks Container -->
<!--      <bookmarks />-->
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
<!--      <locale />-->
<!--      <dark-Toggler class="d-none d-lg-block" />-->
<!--      <search-bar />-->
<!--      <cart-dropdown />-->
<!--      <notification-dropdown />-->
      <user-dropdown />
      <span
          class="text-white"
          link-class="d-flex align-items-center"
          style="cursor: pointer"
          @click="logout"
      >
        <feather-icon
            size="20"
            icon="LogOutIcon"
            class="ml-50 mr-50"
        />
<!--        <span>Logout</span>-->
      </span>

    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav,
} from 'bootstrap-vue'
import Bookmarks from './components/Bookmarks.vue'
import Locale from './components/Locale.vue'
import SearchBar from './components/SearchBar.vue'
import DarkToggler from './components/DarkToggler.vue'
import CartDropdown from './components/CartDropdown.vue'
import NotificationDropdown from './components/NotificationDropdown.vue'
import UserDropdown from './components/UserDropdown.vue'
import moment from 'moment'
import useJwt from "@/auth/jwt/useJwt";
import {initialAbility} from "@/libs/acl/config";
export default {
  components: {
    BLink,

    // Navbar Components
    BNavbarNav,
    Bookmarks,
    Locale,
    SearchBar,
    DarkToggler,
    CartDropdown,
    NotificationDropdown,
    UserDropdown,
    moment
  },
  methods:{
    getTime(){
      return moment().format("dddd, MMMM Do YYYY");
    },
    logout() {
      // Remove userData from localStorage
      // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

      // Remove userData from localStorage
      localStorage.removeItem('userData')

      // Reset ability
      this.$ability.update(initialAbility)

      // Redirect to login page
      this.$store.dispatch('auth/logout')
    },
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
