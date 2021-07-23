<template>
  <div class="blog p_page" v-if="blogsData">
    <div class="container">
      <div class="title_small text-center">
        <h1>{{ locale[lang].titleBlog }}</h1>
      </div>
      <div class="blog_content">
        <div class="row">
          <div
            class="col-xl-4 col-md-6 col-lg-4"
            v-for="blog in blogsData.blogs.data"
            :key="blog.id"
          >
            <div class="card">
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
                    {{ blog.title.slice(0, 50) + " ..." }}
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
</template>

<script>
import { getDate } from "/modules/date";
import {locale} from "~/lang/localeLang";

export default {
  data: () => ({
    blogsData: null,
    imgUrl: null,
    lang: 'ru',
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
  methods: {
    dateBlog(date) {
      return getDate(date);
    },
  },
  mounted() {
    this.lang = localStorage.getItem("lang") !== null? localStorage.getItem("lang"): "ru"
    this.imgUrl = this.$store.state.imgUrl;
    this.$axios
      .get(
        `get-blogs?lang=${this.lang}`
      )
      .then((response) => {
        this.blogsData = response.data;
        this.title = (response.data.page_meta.meta_title !==null? response.data.page_meta.meta_title + " | Collibri": (this.lang === "en"? 'Blogs | Collibri': 'Блоги | Collibri'))
        this.meta_description = response.data.page_meta.meta_description !== null? response.data.page_meta.meta_description: (this.lang === "en"? 'Online Shop - Collibri':'Интернет магазин - Collibri')
      });
  },
};
</script>

<style></style>
