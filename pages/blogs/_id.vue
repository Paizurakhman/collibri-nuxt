<template>
  <div class="blog_inner" v-if="blogPage">
    <div>
      <div class="blog_banner">
        <img :src="imgUrl + blogPage.blog.image" alt="" />
      </div>
      <div class="container">
        <div class="blog_inner_text">
          <div class="title_page">
            <h1>{{ blogPage.blog.title }}</h1>
          </div>
          <br />
          <p>{{ blogPage.blog.content }}</p>
        </div>
        <div class="share_blog">
          <p>{{ locale[lang].toShare }}:</p>
          <div class="socials_icon">
            <yandex-share
              :services="['facebook', 'telegram', 'whatsapp']"
              counter
            />
          </div>
        </div>
        <div class="other_articles">
          <div class="title_center">
            <h2>{{ locale[lang].otherArticlesPageTitle }}</h2>
          </div>
          <div class="row blog_content">
            <div
              class="col-xl-4 col-lg-4 col-md-6"
              v-for="blog in blogPage.others"
              :key="blog.id"
            >
              <div class="card" @click="otherBlogs">
                <nuxt-link
                  :to="{
                    name: 'blogs-id',
                    params: { id: blog.slug },
                  }"
                >
                  <img
                    :src="imgUrl + blog.image"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title" v-if="blog.title">
                      {{ blog.title }}
                    </h5>
                    <p class="card-text">{{ dateBlog(blog.updated_at) }}</p>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDate } from "/modules/date";
import {locale} from "~/lang/localeLang";

export default {
  data: () => ({
    blogPage: null,
    imgUrl: null,
    locale: locale,
    lang: 'ru',
    title: null,
    meta_description: null
  }),
  head() {
    return {
      title: this.title,
      meta: [
        {
          content: this.meta_description
        }
      ]
    }
  },
  methods: {
    dateBlog(date) {
      return getDate(date);
    },
    otherBlogs() {
      let urlBlog = this.$route.params.id;
      this.$store.state.loader = true;
      this.$axios
        .get(
          `get-blog?lang=${this.lang}&slug=${urlBlog}`
        )
        .then((response) => (this.blogPage = response.data));
      this.$store.state.loader = false;
    },
  },
  mounted() {
    this.lang = localStorage.getItem("lang") !== null? localStorage.getItem("lang"): "ru"
    this.imgUrl = this.$store.state.imgUrl;
    let urlBlog = this.$route.params.id;
    this.$axios
      .get(
        `get-blog?lang=${this.lang}&slug=${urlBlog}`
      )
      .then((response) => {
        this.blogPage = response.data;
        this.title = (response.data.blog.meta_title !==null? response.data.page_meta.title + " | Collibri": (this.lang === "en"? 'Blog | ' + response.data.blog.title: 'Блог | ' + response.data.blog.title))
        this.meta_description = response.data.blog.meta_description !== null? response.data.page_meta.meta_description: (this.lang === "en"? 'Online Shop - Collibri':'Интернет магазин - Collibri')

      });
  },
};
</script>

<style>
</style>
