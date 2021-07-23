<template>
  <div class="pagination_content">
    <div>
      <paginate
        v-model="currentPage"
        :page-count="paginationData.last_page"
        :page-range="3"
        :margin-pages="2"
        :click-handler="togglePage"
        :prev-text="'<span><</span>'"
        :next-text="'<span>></span>'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        class="pagination m-0"
      >
      </paginate>
    </div>
  </div>
</template>

<script>
export default {
  props: ["paginationData"],
  name: "Pagination",

  data: () => ({
    currentPage: 2,
  }),

  methods: {
    togglePage(num) {
      this.$emit("currentPage", num);
      this.currentPage = num;
    },

  },

  mounted() {
    this.currentPage = Number(this.$route.query.page);
  },
};
</script>

<style lang="scss" scoped>
</style>
