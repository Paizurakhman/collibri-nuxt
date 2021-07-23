<template>
  <div class="p_page">
    <div class="container">
      <div class="title_small">
        <h1>{{ locale[lang].navLang.favorites }}</h1>
      </div>
      <div class="row mt-5">
        <div class="col-xl-3 col-md-6 col-lg-4" v-for="item in favorites" :key="item.id">
          <productCard :productCard="item"></productCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productCard from "./../components/productCard";
import {locale} from "~/lang/localeLang";

export default {
  components: { productCard },
  data: () => ({
    favorites: null,
    locale: locale,
    lang: 'ru',
  }),
  head () {
    return {
      title: this.lang === "en"? 'Favorites | Collibri': 'Избранное | Collibri',
      // meta: [
      //   {
      //     content: this.meta_description
      //   }
      // ]
    }
  },

  mounted() {
    this.lang = localStorage.getItem("lang") !== null? localStorage.getItem("lang"): "ru"
    this.favorites = JSON.parse(localStorage.getItem("favorite"));
  },
};
</script>

<style></style>
