<template>
  <div class="catalog_wrapper p_page">
        <div class="_wrapper" v-if="$store.state.loader">
          <div id="cube-loader">
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
          <div v-if="CATEGORY_PRODUCTS">
            <div class="title_page"></div>
            <div class="nav_page">
              <div class="breadcrumbs">
                <nuxt-link to="/">{{ locale[lang].navLang.main }}</nuxt-link>
                <nuxt-link
                  v-if="CATEGORY_PRODUCTS.category_parent"
                  :to="{
                    name: 'catalog-slug-id',
                    params: {
                      id: CATEGORY_PRODUCTS.category_parent.parent_id,
                      slug: CATEGORY_PRODUCTS.category_parent.slug
                    },
                  }"
                  >{{ CATEGORY_PRODUCTS.category_parent.title }}</nuxt-link
                >
                <nuxt-link
                  class="disabled"
                  aria-disabled="true"
                  v-if="CATEGORY_PRODUCTS.category"
                  to="#"
                  >{{ CATEGORY_PRODUCTS.category.title }}</nuxt-link
                >
              </div>

              <sortedSelect type="catalogProducts"/>
            </div>
            <div class="catalog_content" v-if="GET_PRODUCTS">
              <div class="row">
                <div class="col-xl-3 col-md-4">
                  <category-select
                    :categories="CATEGORY_PRODUCTS"
                    type="filter_id"
                  />
                </div>
                <div class="col-xl-9 col-md-8">
                  <div v-if="filteredProducts().products">
                    <div
                      v-if="Products"
                      class="_wrapper _products"
                    >
                      <div id="cube-loader">
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
                    <div class="catalog_products" v-else>
                      <products
                        :products="filteredProducts()"
                        type="catalogProducts"
                      />
                    </div>
                  </div>
                  <div v-else class="pt-3 pb-3">
                    <h3>{{ locale[lang].noProducts }}</h3>
                  </div>
                </div>
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
  data: () => ({
    lang: "ru",
    paramUrl: null,
    imgUrl: null,
    filter_id: [],
    page: 1,
    loader: null,
    loadingProducts: null,
    categoryCount: 3,
    more: null,
    meta_title: null,
    meta_description: null,
    locale: locale,
  }),
  head() {
    return {
      title: this.meta_title,
      meta: [
        {
          content: this.meta_description
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      "GET_PRODUCTS",
      "GET_PRODUCT_PAGE",
      "FILTER_PRODUCTS",
      "SORTED_PRODUCTS",
      "MORE_PRODUCTS",
    ]),

    catalogDropdown() {
      this.$store.commit("CATALOG_DROPDOWN");
    },

    filteredProducts() {
      if (this.CATALOG_FILTER.products) {
        return this.CATALOG_FILTER;
      }
      else {
        return this.CATEGORY_PRODUCTS;
      }
    },
  },

  computed: {
    ...mapGetters(["CATEGORY_PRODUCTS", "CATALOG_FILTER"]),

    Products() {
      return (this.loadingProducts = this.$store.state.loadingProducts);
    },
  },

  mounted() {
    this.lang = localStorage.getItem("lang")
    this.loader = this.$store.state.loader;
    this.imgUrl = this.$store.state.imgUrl;
    let productUrl = this.$route.params.id;
    let page = this.$route.query.page;
    this.MORE_PRODUCTS({
      productId: productUrl,
      page: page,
      sort: this.$route.query.sort,
    });
    // console.log(this.CATEGORY_PRODUCTS)
    // this.meta_title = (this.CATEGORY_PRODUCTS.page_meta.title.meta_title !==null? this.CATEGORY_PRODUCTS.page_meta.title.meta_title + " | Collibri": (this.lang === "en"? 'Blogs | Collibri': 'Блоги | Collibri'))
    // this.meta_description = response.data.page_meta.meta_description !== null? response.data.page_meta.meta_description: (this.lang === "en"? 'Online Shop - Collibri':'Интернет магазин - Collibri')
  },

  watch: {
    $route(to, from) {
      this.CATALOG_FILTER.products = null;
    },
  },
};
</script>
