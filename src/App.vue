<template>
  <div
    id="app"
    class="h-100"
    :class="[skinClasses]"
  >
    <component :is="layout">
      <router-view />
    </component>

    <scroll-to-top v-if="enableScrollToTop" />
  </div>
</template>

<script>
import ScrollToTop from '@core/components/scroll-to-top/ScrollToTop.vue'

// This will be populated in `beforeCreate` hook
import { $themeColors, $themeBreakpoints, $themeConfig } from '@themeConfig'
import { provideToast } from 'vue-toastification/composition'
import { watch } from '@vue/composition-api'
import useAppConfig from '@core/app-config/useAppConfig'

import { useWindowSize, useCssVar } from '@vueuse/core'

import store from '@/store'

const LayoutVertical = () => import('@/layouts/vertical/LayoutVertical.vue')
const LayoutHorizontal = () => import('@/layouts/horizontal/LayoutHorizontal.vue')
const LayoutFull = () => import('@/layouts/full/LayoutFull.vue')

export default {
  components: {
    // Layouts
    LayoutHorizontal,
    LayoutVertical,
    LayoutFull,
    ScrollToTop
  },

  // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
  // Currently, router.currentRoute is not reactive and doesn't trigger any change
  computed: {
    layout() {
      if (this.$route.meta.layout === 'full') return 'layout-full'
      return `layout-${this.contentLayoutType}`
    },
    contentLayoutType() {
      return this.$store.state.appConfig.layout.type
    }
  },

  beforeCreate() {
    // Set colors in theme
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(`--${colors[i]}`, document.documentElement).value.trim()
    }

    // Set Theme Breakpoints
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(useCssVar(`--breakpoint-${breakpoints[i]}`, document.documentElement).value.slice(0, -2))
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
  },

  setup() {
    const { skin, skinClasses } = useAppConfig()
    const { enableScrollToTop } = $themeConfig.layout

    // If skin is dark when initialized => Add class to body
    if (skin.value === 'dark') document.body.classList.add('dark-layout')

    // Provide toast for Composition API usage
    // This for those apps/components which uses composition API
    // Demos will still use Options API for ease
    provideToast({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 3000,
      transition: 'Vue-Toastification__fade',
    })

    // Set Window Width in store
    store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth)
    const { width: windowWidth } = useWindowSize()
    watch(windowWidth, val => {
      store.commit('app/UPDATE_WINDOW_WIDTH', val)
    })

    return {
      skinClasses,
      enableScrollToTop,
    }
  }
}
</script>

<style>
.loading-user {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center; 
    justify-content: center; 
    padding-top: 60px;
    padding-bottom: 60px;
}

.load-6 .letter {
    animation-name: loadingF;
    animation-duration: 3s;
    animation-iteration-count: 2;
    animation-direction: linear;
}

.letter-holder {
    margin-left: 25px;
}

.letter {
    float: left;
    font-size: 25px;
}

.l-1 {
    animation-delay: 0.15s;
}
.l-2 {
    animation-delay: 0.25s;
}
.l-3 {
    animation-delay: 0.35s;
}
.l-4 {
    animation-delay: 0.45s;
}
.l-5 {
    animation-delay: 0.55s;
}
.l-6 {
    animation-delay: 0.65s;
}
.l-7 {
    animation-delay: 0.75s;
}
.l-8 {
    animation-delay: 0.85s;
}
.l-9 {
    animation-delay: 0.95s;
}
.l-10 {
    animation-delay: 1.05s;
}
.l-11 {
    animation-delay: 1.15s;
}
.l-12 {
    animation-delay: 1.25s;
}
.l-13 {
    animation-delay: 1.35s;
}

@keyframes loadingF {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
