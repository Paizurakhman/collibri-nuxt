<template>
  <div class="about p_page">
    <div class="container">
      <div class="title_small text-center">
        <h1>{{ locale[lang].aboutCompanyPageTitle }}</h1>
      </div>
    </div>
    <div
      class="about_content"
      v-for="(item, idx) in aboutData"
      :key="item.title"
      :class="{ bgSilver: idx % 2 }"
    >
      <div class="container">
        <div class="row" v-if="idx % 2">
          <div class="col-xl-6 col-lg-6">
            <img :src="imgUrl + item.image" alt="" />
          </div>
          <div class="col-xl-6 col-lg-6">
            <p v-html="item.title"></p>
          </div>
        </div>
        <div class="row" v-else>
          <div class="col-xl-6 col-lg-6">
            <p v-html="item.title"></p>
          </div>
          <div class="col-xl-6 col-lg-6">
            <img :src="imgUrl + item.image" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {locale} from "~/lang/localeLang";

export default {
  // },
  data: () => ({
    aboutData: null,
    imgUrl: 'https://cdn.collibri.kz/',
    locale: locale,
    lang: 'ru'
  }),
  head() {
    return {
      title: this.lang === "en"? 'About us | Collibri': 'О нас | Collibri',
      // meta: [
      //   {
      //     content: this.meta_description
      //   }
      // ]
    }
  },
  mounted() {
    this.lang = localStorage.getItem("lang") !== null? localStorage.getItem("lang"): "ru"
    this.imgUrl = this.$store.state.imgUrl;
    this.$axios
      .get(`about?lang=${this.lang}`)
      .then((response) => (this.aboutData = response.data));
  },
};
</script>

<style>
</style>
