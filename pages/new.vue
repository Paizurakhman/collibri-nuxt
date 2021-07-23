<template>
  <div class="catalog_wrapper p_page" v-if="newProductData">
    <div class="container">
      <div class="title_page">
        <h1>Новинки</h1>
      </div>
      <div class="nav_page">
        <div class="breadcrumbs">
          <nuxt-link to="/">{{ locale[lang].navLang.main }}</nuxt-link>
          <nuxt-link to="/new">Новинки</nuxt-link>
        </div>
      </div>

      <div class="catalog_content">
        <div class="catalog_products" v-if="newProductData.products.length">
          <div class="row">
            <div
              class="col-xl-3 col-md-6 col-lg-3"
              v-for="card in newProductData.products"
              :key="card.id"
            >
              <productCard :productCard="card"></productCard>
            </div>
          </div>
        </div>
        <div v-else>
          <h2>{{ locale[lang].noProducts }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {locale} from "~/lang/localeLang";

export default {
  data: () => ({
    newProductData: null,
    locale: locale,
    lang: "ru"
  }),
  head () {
    return {
      title: this.lang === "en"? 'New Products | Collibri': 'Новинки | Collibri',
      // meta: [
      //   {
      //     content: this.meta_description
      //   }
      // ]
    }
  },
  mounted() {
    this.lang = localStorage.getItem("lang")
    this.$axios
      .get(`new?lang=${this.$store.state.lang}`)
      .then((response) => (this.newProductData = response.data));
  },
};
</script>
