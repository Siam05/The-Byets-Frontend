<template>
  <b-card class="text-center">
    <div v-if="loading">
      <b-spinner
          style="width: 3rem; height: 3rem;"
          class="mr-1"
          label="Large Spinner"
          :variant="`${color}`"/>
    </div>
    <div v-else>
      <b-avatar
          class="mb-1"
          :variant="`light-${color}`"
          size="45"
      >
      <feather-icon
            size="21"
            :icon="icon"
        />
      </b-avatar>
      <div class="truncate">
        <h2 class="mb-25 font-weight-bolder">
          {{ statistic }}
        </h2>
        <h5 v-if="statisticAmount">৳ {{ statisticAmount }}</h5>
        <span>{{ statisticTitle }}</span>
      </div>
    </div>

  </b-card>
</template>

<script>
import { BCard, BAvatar ,BSpinner} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BAvatar,
    BSpinner
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    statistic: {
      type: [Number, String],
      required: true,
    },
    loading: {
      type: Boolean,
      default:'false',
      required: true,
    },
    statisticAmount: {
      type: [Number, String],
      required: true,
    },
    statisticTitle: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
}
</script>
