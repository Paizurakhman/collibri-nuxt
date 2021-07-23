<template>
  <div class="catalog_wrapper p_page">
    <div class="_wrapper" v-if="$store.state.loader">
      <div id="cube-">
        <div class="caption">
          <div class="cube-">
            <div class="cube -1"></div>
            <div class="cube -2"></div>
            <div class="cube -4"></div>
            <div class="cube -3"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="title_page">
        <h1>{{ locale[lang].brandPageTitle }}</h1>
      </div>
      <div class="nav_page" v-if="brandData">
        <div class="breadcrumbs">
          <nuxt-link to="/">{{ locale[lang].navLang.main }}</nuxt-link>
          <nuxt-link to="/brands">{{
              locale[lang].brandPageTitle
            }}</nuxt-link>
          <nuxt-link to="#" class="off_link" v-if="BRAND_PRODUCTS.brand.title">{{
              BRAND_PRODUCTS.brand.title
            }}</nuxt-link>
        </div>
      </div>

      <div class="catalog_content">
        <div class="row">
          <div class="col-xl-3 col-md-4">
            <category-select :categories="BRAND_PRODUCTS" type="brand_id" />
          </div>
          <div class="col-xl-9 col-md-8">
            <products :products="filteredProducts()" type="brandProducts" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {locale} from "~/lang/localeLang";

export default {
  // metaInfo() {
  //   return {
  //     title: "Брэнды" + " | " + "Collibri",
  //   };
  // },
  data: () => ({
    brandData: null,
    filter_id: [],
    productCategory: null,
    locale: locale,
    lang: "ru"
  }),

  methods: {
    ...mapActions([
      "GET_BRAND_PRODUCTS",
      "FILTER_BRAND_PRODUCTS",
      "MORE_BRAND_PRODUCTS",
    ]),

    filteredProducts() {
      if (this.CATALOG_FILTER.products) {
        return this.CATALOG_FILTER;
      } else {
        return this.BRAND_PRODUCTS;
      }
    },

    toggleFilter() {
      this.productCategory = !this.productCategory;
    },
  },

  computed: {
    ...mapGetters(["BRAND_PRODUCTS", "CATALOG_FILTER"]),
  },

  mounted() {
    this.lang = localStorage.getItem("lang")
    this.CATALOG_FILTER.products = null;
    let productUrl = this.$route.params.id;
    let page = this.$route.query.page;
    this.GET_BRAND_PRODUCTS({ id: productUrl, page: page });
    this.brandData = this.BRAND_PRODUCTS;
  },
};
</script>
