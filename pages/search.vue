<template>
  <div class="container p_page">
    <div class="title_small text-center" v-if="filteredProducts().products.data.length">
      <h1>Результаты поиска</h1>
    </div>
    <div class="title_small text-center" v-else>
      <h1>К сожалению, мы ничего не нашли по вашему запросу.</h1>
    </div>
    <div class="nav_page justify-content-end mt-5 mb-5">
      <sortedSelect type="searchProducts" />
    </div>
    <div class="catalog_content">
      <div class="row">
        <div class="col-xl-3 col-md-4">
          <category-select :categories="searchProducts" type="searchProducts" />
        </div>
        <div class="col-xl-9 col-md-8">
          <products :products="filteredProducts()" type="searchProducts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {locale} from "~/lang/localeLang";
export default {
  data: () => ({
    searchProducts: null,
    locale: locale,
    lang: "ru",
    meta_title: null,
    meta_description: null
  }),
  head () {
    return {
      title: this.meta_title,
      // meta: [
      //   {
      //     content: this.meta_description
      //   }
      // ]
    }
  },

  computed: {
    ...mapGetters(["BRAND_PRODUCTS", "CATALOG_FILTER"]),
  },

  methods: {
    filteredProducts() {
      if (this.CATALOG_FILTER.products) {
        return this.CATALOG_FILTER;
      } else {
        return this.searchProducts;
      }
    },
  },

  mounted() {
    this.lang = localStorage.getItem("lang") !== null? localStorage.getItem("lang"): "ru"
    let page = this.$route.query.page ? this.$route.query.page : 1;
    let sort = this.$route.query.sort ? this.$route.query.sort : "";
    let localFilterId = JSON.parse(localStorage.getItem("filter_id"));
    let vm = this;
    let searchData = localStorage.getItem("searchData");

    this.meta_title = this.$route.query.text + " | Collibri"

    this.$axios
      .get(
        `search-page?lang=${this.lang}&text=${searchData}&page=${page}&order_by=${sort}&filterId=${localFilterId}`
      )
      .then(function (response) {
        vm.searchProducts = response.data;
      });
  },

  updated() {
    this.meta_title = this.$route.query.text + " | Collibri"
  }

};
</script>

<style>
</style>
