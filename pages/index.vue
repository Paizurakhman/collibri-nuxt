<template>
  <div>
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
    <div v-else>
      <div class="main_slider">
        <slick-carousel :arrows="true" :dots="true">
          <div
            v-for="(item, index) in mainData.slider"
            :key="index"
            :style="{ 'background-image': `url(${imgUrl + item.image})` }"
            class="slider_item"
          >
            <div class="container h-100 slider_text_wrapper">
              <div class="slider_text col-lg-6">
                <h2 v-if="item.title">{{ item.title }}</h2>
                <p v-if="item.content">{{ item.content }}</p>
                <a :href="item.url" class="btn btn_outline" v-if="item.url">{{
                    locale[lang].buttons.btnMoreDetails
                  }}</a>
              </div>
            </div>
          </div>
        </slick-carousel>
      </div>

      <div class="products_category">
        <div class="container">
          <div class="row">
            <div
              class="col-xl-6 col-md-6 col-lg-6"
              v-for="category of mainData.categories.category_top"
              :key="category.id"
            >
              <div class="card_item">
                <nuxt-link
                  :to="{
                    name: 'catalog-slug-id',
                    params: { id: category.id, slug: category.slug },
                  }"
                >
                  <v-lazy-image
                    :src="`${imgUrl + category.image}`"
                    alt=""
                    :src-placeholder="
                      require('../assets/images/load_image.svg')
                    "
                  />
                  <p>{{ category.title }}</p>
                </nuxt-link>
              </div>
            </div>
            <div
              class="col-xl-4 col-md-6 col-lg-4"
              v-for="category of mainData.categories.category_bottom"
              :key="category.id"
            >
              <div class="card_item">
                <nuxt-link
                  :to="{
                    name: 'catalog-slug-id',
                    params: { id: category.id, slug: category.slug },
                  }"
                >
                  <v-lazy-image
                    :src="`${imgUrl + category.image}`"
                    alt=""
                    :src-placeholder="
                      require('../assets/images/load_image.svg')
                    "
                  />
                  <p>{{ category.title }}</p>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="main_products p_block">
        <div class="container">
          <div class="title">
            <h2>{{ locale[lang].titleNewProducts }}</h2>
          </div>
          <div class="main_products_content">
            <div class="row">
              <div
                class="col-xl-3 col-md-6 col-lg-4"
                v-for="product of mainData.products.new"
                :key="product.id"
              >
                <productCard :productCard="product"></productCard>
              </div>
            </div>
            <nuxt-link to="/new" class="btn btn_black">{{
                locale[lang].buttons.btnSeeAll
              }}</nuxt-link>
          </div>
        </div>
      </div>

      <div class="review_block_wrapper">
        <slick-carousel
          :arrows="true"
          :infinite="false"
          :adaptiveHeight="true"
        >
          <div
            class="review_block p_block"
            v-for="(sale, index) in mainData.block_sales"
            :key="index"
          >
            <div
              class="review_block_bg"
              :style="{
                'background-image': `url(${imgUrl + sale.image})`,
              }"
            ></div>
            <div class="container">
              <div class="review_info row">
                <div class="col-xl-7">
                  <div class="block_title">
                    <h2>{{ sale.title }}</h2>
                  </div>
                  <div class="review_info_text">
                    <p>{{ sale.content }}</p>
                  </div>
                  <a
                    v-if="sale.url.match(/^https:/)"
                    :href="sale.url"
                    target="blank"
                    class="btn btn_outline"
                  >{{ locale[lang].buttons.btnMoreDetails }}</a
                  >
                  <nuxt-link
                    v-else
                    class="btn btn_outline"
                    :to="{
                      name: 'product',
                      params: { id: sale.url },
                    }"
                  >
                    {{ locale[lang].buttons.btnMoreDetails }}</nuxt-link
                  >
                </div>
                <div
                  class="col-xl-5 review_block_bg"
                  :style="{
                    'background-image': `url(${imgUrl + sale.image})`,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </slick-carousel>
      </div>

      <div class="main_products p_block" v-if="mainData.products.best.length">
        <div class="container">
          <div class="title">
            <h2>{{ locale[lang].titleBestSellers }}</h2>
          </div>
          <div class="main_products_content">
            <div class="row">
              <div
                class="col-xl-3 col-md-6 col-lg-4"
                v-for="product of mainData.products.best"
                :key="product.id"
              >
                <productCard :productCard="product"></productCard>
              </div>
            </div>
            <nuxt-link to="/best-products" class="btn btn_black">{{
                locale[lang].buttons.btnSeeAll
              }}</nuxt-link>
          </div>
        </div>
      </div>

      <div class="main_blog p_block">
        <div class="title">
          <h2>{{ locale[lang].titleBlog }}</h2>
        </div>
        <div class="container">
          <div class="main_blog_content">
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6">
                <div class="blog_title">
                  <h2>{{ mainData.block_blog.title }}</h2>
                </div>
                <div class="main_blog_text" >
                  <p>
                    {{ mainData.block_blog.content | truncate }}
                  </p>
                </div>
                <div class="main_blog_img d_none">
                  <v-lazy-image src="@/assets/images/blog_img.png" alt="" />
                </div>
                <nuxt-link
                  class="btn btn_black"
                  :to="{
                    name: 'blogs-id',
                    params: { id: mainData.block_blog.slug },
                  }"
                >{{ locale[lang].buttons.btnMoreDetails }}</nuxt-link
                >
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 m_none">
                <div class="main_blog_img">
                  <v-lazy-image
                    :src="imgUrl + mainData.block_blog.image"
                    :src-placeholder="
                      require('../assets/images/load_image.svg')
                    "
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {locale} from "~/lang/localeLang";

export default {
  data: () => ({
    mainData: null,
    lang: 'ru',
    imgUrl: null,
    count: null,
    loader: true,
    locale: locale,
    title: null,
    meta_description: null
  }),

  head () {
    return {
      title: this.title,
      meta: [
        {
          content: this.meta_description
        }
      ]
    }
  },

  mounted() {
    this.lang = localStorage.getItem("lang")
    this.imgUrl = this.$store.state.imgUrl;
    this.$axios.get(`home-page?lang=` + this.lang)
      .then((response) => {
          this.mainData = response.data
          this.loader = false
          this.title = (response.data.page_meta.meta_title !==null? response.data.page_meta.meta_title + " | Collibri": (this.lang === "en"? 'Main | Collibri': 'Главная | Collibri'))
          this.meta_description = response.data.page_meta.meta_description !== null? response.data.page_meta.meta_description: (this.lang === "en"? 'Online Shop - Collibri':'Интернет магазин - Collibri')
        }
      );
  },
};
</script>

<style></style>
