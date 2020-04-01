<template>
  <span :title="timestamp | humanFriendlyDate">{{timestamp | diffForHumans}}</span>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    timestamp: {
      required: true,
      type: String
    }
  },

  filters: {
    humanFriendlyDate(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },

    diffForHumans(date) {
      return moment(date).fromNow();
    }
  }
};
</script>

<style scoped>
</style>
