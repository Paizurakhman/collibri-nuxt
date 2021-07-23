<template>
  <div class="nav m_none">
    <div class="container">
      <ul>
        <li>
          <nuxt-link to="/" class="logo">{{
            locale[lang].navLang.main
          }}</nuxt-link>
        </li>
        <li class="dropdown_link">
          <span @click="catalogDropdown"
            >{{ locale[lang].navLang.Catalog }}
            <transition name="slide-fade">
              <span
                class="arrow_dropdown"
                v-if="this.$store.state.catalogDropdown"
              ></span>
            </transition>
          </span>

          <transition name="slide-fade">
            <div class="nav_dropdown" v-if="this.$store.state.catalogDropdown">
              <div class="container">
                <div class="row">
                  <div
                    class="col-xl-3 col-lg-4 col-md-6 dropdown_links"
                    v-for="category in categories"
                    :key="category.id"
                  >
                    <div @click="closeDropdown(category.slug)">
                      <nuxt-link
                        class="category_title"
                        :to="{
                          name: 'catalog-slug-id',
                          params: {
                            id: category.id,
                            slug: category.slug,
                          },
                          query: {
                            page: 1,
                          },
                        }"
                        >{{ category.title }}</nuxt-link
                      >
                    </div>
                    <div
                      v-for="subCategory in category.subcategories"
                      :key="subCategory.id"
                      @click="closeDropdown(subCategory.slug)"
                    >
                      <nuxt-link
                        :to="{
                          name: 'catalog-slug-id',
                          params: {
                            id: subCategory.id,
                            slug: subCategory.slug,
                          },
                          query: {
                            page: 1,
                          },
                        }"
                        >{{ subCategory.title }}</nuxt-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </li>
        <li>
          <nuxt-link to="/brands" data-hover="Бренды">{{
            locale[lang].navLang.Brands
          }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about" data-hover="О компании">{{
            locale[lang].navLang.aboutCompany
          }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/blogs" data-hover="Блог">{{
            locale[lang].navLang.blog
          }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/contacts" data-hover="Контакты">{{
            locale[lang].navLang.contacts
          }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {locale} from "~/lang/localeLang";

export default {
  props: ["categories"],
  data: () => ({
    navDropdown: false,
    locale: locale,
    lang: 'ru'
  }),

  methods: {
    catalogDropdown() {
      this.$store.commit("CATALOG_DROPDOWN");
    },
    closeDropdown(slug) {
      localStorage.removeItem("filter_id");
      let routeSlug = this.$route.params.slug;
      if (routeSlug === slug) {
        this.$store.state.catalogDropdown = false;
      }
    },
  },

  watch: {
    $route(to, from) {
      this.$store.state.catalogDropdown = false;
    },
  },
  mounted() {
    this.lang = localStorage.getItem("lang")
  }
};
</script>

<style>
</style>
