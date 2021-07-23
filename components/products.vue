<template>
  <div>
    <div class="catalog_products" v-if="products">
      <div class="row">
        <div
          class="col-xl-4 col-md-6 col-lg-6"
          v-for="card in products.products.data"
          :key="card.id"
        >
          <productCard :productCard="card"></productCard>
        </div>
      </div>
      <pagination
        v-if="products.products.last_page > 1"
        :paginationData="products.products"
        @currentPage="currentPage"
      />
    </div>
    <div v-else>
      <h2>{{ locale[lang].noProducts }}</h2>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {locale} from "~/lang/localeLang";

export default {
  props: ["products", "type"],
  data: () => ({
    showMorebtn: false,
    more: null,
    locale: locale,
    lang: 'ru'
  }),

  methods: {
    ...mapActions(["MORE_BRAND_PRODUCTS", "MORE_PRODUCTS", "SORTED_PRODUCTS", "FILTER_SEARCH_PRODUCTS"]),

    currentPage(num) {
      let productUrl = this.$route.params.id;
      if (this.type === "catalogProducts") {
        this.$router
          .push({ query: { page: num, sort: this.$route.query.sort } })
        this.MORE_PRODUCTS({
          productId: productUrl,
          page: num,
          sort: this.$route.query.sort,
        });
      } else if (this.type === "brandProducts") {
        this.$router.push({ query: { page: num } })
        this.MORE_BRAND_PRODUCTS({ productId: productUrl, page: num });
      } else if (this.type === "searchProducts") {
        let searchData = localStorage.getItem("searchData");
        this.$router.push({ query: { page: num, sort: this.$route.query.sort } })
        this.FILTER_SEARCH_PRODUCTS({
          text: searchData,
          page: num,
          sort: this.$route.query.sort,
        });
      }
    },
  },
  mounted() {
    this.lang = localStorage.getItem("lang")
  }
};
</script>

<style>
</style>
