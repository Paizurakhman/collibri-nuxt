<template>
  <div class="orders">
    <button
      class="tab_nav"
      v-for="tab in tabs"
      :key="tab.id"
      @click="handleClick(tab.id)"
      :class="{active_tab: currentId === tab.id}"
    >
      {{ tab.title }}
    </button>
    <div v-for="order in orders" :key="order.id">
      <order-item :order="order" v-if="order.tab_sort_id === currentId"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Orders",
  props: ['tabs'],
  data() {
    return {
      currentId: this.tabs[0].id,
    }
  },
  methods: {
    handleClick(id) {
      this.currentId = id
    }
  },

}
</script>

<style lang="scss" scoped>

</style>
