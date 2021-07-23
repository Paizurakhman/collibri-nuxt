import Vue from "vue";

Vue.filter('truncate', (value) => {
  value = value.toString()
  if (value.length > 600) {
    return value.slice(0, 600) + "..."
  }
  return value
})
