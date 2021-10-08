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
      <div class="ordering_form">
        <div class="go_page">
          <form @submit.prevent="goPage">
            <div class="row justify-content-center">
              <div class="col-xl-4 col-7">
                <input
                  type="text"
                  v-model="page"
                  placeholder="Введите номер страницу"
                />
              </div>
              <div class="col-xl-2 col-5">
                <button class="btn btn_black btn_go">Перейти</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>{{ locale[lang].noProducts }}</h2>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { locale } from "~/lang/localeLang";

export default {
  props: ["products", "type"],
  data: () => ({
    showMorebtn: false,
    more: null,
    locale: locale,
    lang: "ru",
    page: "",
  }),

  methods: {
    ...mapActions([
      "MORE_BRAND_PRODUCTS",
      "MORE_PRODUCTS",
      "SORTED_PRODUCTS",
      "FILTER_SEARCH_PRODUCTS",
      "GET_PRODUCTS",
    ]),

    goPage() {
      let productUrl = this.$route.params.id;
      if (this.page) {
        this.$router.push({ query: { page: this.page } });
        this.MORE_PRODUCTS({
          productId: productUrl,
          page: this.page,
          sort: this.$route.query.sort,
        });
      }
    },

    currentPage(num) {
      let productUrl = this.$route.params.id;
      if (this.type === "catalogProducts") {
        this.$router.push({
          query: { page: num, sort: this.$route.query.sort },
        });
        this.MORE_PRODUCTS({
          productId: productUrl,
          page: num,
          sort: this.$route.query.sort,
        });
      } else if (this.type === "brandProducts") {
        this.$router.push({ query: { page: num } });
        this.MORE_BRAND_PRODUCTS({ productId: productUrl, page: num });
      } else if (this.type === "searchProducts") {
        let searchData = localStorage.getItem("searchData");
        this.$router.push({
          query: { page: num, sort: this.$route.query.sort },
        });
        this.FILTER_SEARCH_PRODUCTS({
          text: searchData,
          page: num,
          sort: this.$route.query.sort,
        });
      }
    },
  },
  mounted() {
    this.lang =
      localStorage.getItem("lang") !== null
        ? localStorage.getItem("lang")
        : "ru";
  },
};
</script>

<style scoped>
.go_page .btn_go {
  padding: 12px 20px;
  margin-top: 0;
  width: 100%;
}
</style>
