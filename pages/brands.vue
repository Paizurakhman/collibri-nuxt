<template>
  <div class="brands_wrapper p_page">
    <div class="loader_wrapper" v-if="loader">
      <div id="cube-loader">
        <div class="caption">
          <div class="cube-loader">
            <div class="cube loader-1"></div>
            <div class="cube loader-2"></div>
            <div class="cube loader-4"></div>
            <div class="cube loader-3"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="title_small">
        <h1>{{ locale[lang].brandsPageTitle }}</h1>
      </div>
      <div class="popular_brands">
        <span
          v-for="brand in allBrands.popular"
          :key="brand.id"
          :id="brand.id"
          @click="categoryUrl(brand.id)"
        >
          <nuxt-link
            :to="{
              name: 'brand-products-slug-id',
              params: { id: brand.id, slug: brand.slug, page: 1 }
            }"
            ><img :src="imgUrl + brand.image" alt=""
          /></nuxt-link>
        </span>
      </div>
      <div class="brands_block">
        <div class="brands_list">
          <a
            :href="`#${name}`"
            v-for="(item, name) in allBrands.all"
            :key="name"
            >{{ name }}</a
          >
          <a href="#">#</a>
        </div>
        <div class="brands_wrapper">
          <div v-for="(item, name) in allBrands.all" :key="name">
            <div class="brands_column" v-if="item.length > 0" :id="name">
              <span>{{ name }}</span>
              <ul>
                <li
                  @click="categoryUrl(brand.id)"
                  v-for="brand in item"
                  :key="brand.id"
                >
                  <nuxt-link
                    :to="{
                      name: 'brand-products-slug-id',
                      params: { id: brand.id, slug: brand.slug },
                      query: {
                        page: 1
                      },
                    }"
                    >{{ brand.title }}</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="brands_column">
            <span>#</span>
            <ul>
              <li
                v-for="(item, index) in allBrands.other"
                :key="index"
                v-if="item.length"
              >
                <nuxt-link
                  v-for="brand in item"
                  :key="brand.id"
                  :to="{
                    name: 'brand-products-slug-id',
                    params: { id: brand.id, slug: brand.slug, page: 1 },
                  }"
                  >{{ brand.title }}</nuxt-link
                >
              </li>
            </ul>
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
  //     title: this.$store.state.metaTitle + ' | ' + 'Collibri',
  //   };
  // },
  data: () => ({
    allBrands: null,
    imgUrl: null,
    loader: true,
    locale: locale,
    lang: 'ru',
    meta_title: '',
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
    ...mapActions(["GET_BRAND_PRODUCTS"]),
    categoryUrl(id) {
      localStorage.removeItem("filter_id");
      this.GET_BRAND_PRODUCTS(id);
    },
  },

  mounted() {
    this.lang = localStorage.getItem("lang")
    this.imgUrl = this.$store.state.imgUrl;
    this.$axios
      .get(
        `get-brands?lang=${this.lang}`
      )

      .then((response) => {
        this.allBrands = response.data;
        this.loader = false;
        this.meta_title = (response.data.page_meta.meta_title !==null? response.data.page_meta.meta_title + " | Collibri": (this.lang === "en"? 'Brands | Collibri': 'Бренды | Collibri'))
        this.meta_description = response.data.page_meta.meta_description !== null? response.data.page_meta.meta_description: (this.lang === "en"? 'Online Shop - Collibri':'Интернет магазин - Collibri')

        // this.$store.state.metaTitle = response.data.page_meta.meta_title !== null ? response.data.page_meta.meta_title : 'Бренды';
      });
  },
};
</script>

<style></style>
