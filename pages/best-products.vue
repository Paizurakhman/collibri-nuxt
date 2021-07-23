<template>
  <div class="catalog_wrapper p_page" v-if="bestProductData">
    <div class="container">
      <div class="title_page">
        <h1>Бестселлеры</h1>
      </div>
      <div class="nav_page">
        <div class="breadcrumbs">
          <nuxt-link to="/">{{ locale[lang].navLang.main }}</nuxt-link>
          <nuxt-link to="/best-products">Бестселлеры</nuxt-link>
        </div>
      </div>

      <div class="catalog_content">
        <div class="catalog_products" v-if="bestProductData.products.length">
          <div class="row">
            <div
              class="col-xl-3 col-md-6 col-lg-3"
              v-for="card in bestProductData.products"
              :key="card.id"
            >
              <productCard :productCard="card"></productCard>
            </div>
          </div>
        </div>
        <div v-else>
           <h2>{{locale[lang].noProducts}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {locale} from "~/lang/localeLang";

export default {
  data: () => ({
    bestProductData: null,
    locale: locale,
    lang: "ru"
  }),
  head() {
    return {
      title: this.lang === "en"? 'Bestsellers | Collibri': 'Бестселлеры | Collibri',
      // meta: [
      //   {
      //     content: this.meta_description
      //   }
      // ]
    }
  },
  mounted() {
    this.lang = localStorage.getItem("lang") !== null? localStorage.getItem("lang"): "ru"
    this.$axios
      .get(`best-seller?lang=${this.$store.state.lang}`)
      .then(
        (response) => (
          (this.bestProductData = response.data)
        )
      );
  },
};
</script>
