<template>
  <div class="account_page p_page">
    <div class="container">
      <div class="nav_page m_none">
        <div class="breadcrumbs">
          <nuxt-link to="/">{{ locale[lang].navLang.main }}</nuxt-link>
          <nuxt-link to="/my-account">{{
            locale[lang].navLang.account
          }}</nuxt-link>
        </div>
      </div>
      <div class="page_title m_none">
        <p>{{ locale[lang].accountPage.myAccount }}</p>
      </div>
      <div class="page_title d_none">
        <p>{{ locale[lang].accountPage.myDetails }}</p>
      </div>
      <div class="row">
        <div class="col-xl-3 col-lg-3 col-md-12 order_2">
          <div class="action_content">
            <div class="tab_actions">
              <nuxt-link
                to="/my-account"
              >
                {{ locale[lang].accountPage.data }}
              </nuxt-link>
              <nuxt-link to="/my-account/orders">
                {{ locale[lang].accountPage.orders }}
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-12 order_1">
          <NuxtChild />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {locale} from "~/lang/localeLang";

export default {
  name: "my-account",
  data: () => ({
    locale: locale,
    lang: 'ru',
  }),
  head() {
    return {
      title: this.lang === "en"? 'My Account | Collibri': 'Мой аккаунт | Collibri',
      // meta: [
      //   {
      //     content: this.meta_description
      //   }
      // ]
    }
  },
  mounted() {
    this.lang = localStorage.getItem("lang")
  },
};
</script>

<style lang="scss" scoped>
</style>
