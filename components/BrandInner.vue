<template>
  <div class="catalog_wrapper p_page">
    <div class="container">
      <div class="title_page">
        <h1>{{ locale[lang].brandPageTitle }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import {locale} from "~/lang/localeLang";
export default {
  data() {
    return {
      locale: locale,
      lang: 'ru'
    }
  },
  mounted() {
    this.lang = localStorage.getItem("lang") !== null? localStorage.getItem("lang"): "ru"
  }
}
</script>

<style>
</style>
