<template>
  <div class="product_card">
    <span class="like" @click.stop="addFavorite(productCard)"
    ><i class="far fa-heart" :class="{ fas: favoriteActive }"></i>
    </span>
    <span class="percent" v-if="productCard.sale">{{ productCard.sale }}%</span>
    <nuxt-link
      :to="{
        name: 'product-id',
        params: { id: productCard.slug || productCard.product_slug },
      }"
    >
      <v-lazy-image
        :src="this.productImage(productCard)"
        class="product_card_img"
      />

      <div class="product_card_body">
        <p>
          {{ productCard.title }}
        </p>
      </div>
    </nuxt-link>
    <div class="product_card_footer">
      <div class="card_price">
        <p>{{ productCard.current_price }} {{ locale[lang].tg }}.</p>
        <p class="percent_price silver_text" v-if="productCard.sale > 0">
          {{ productCard.price }} {{ locale[lang].tg }}.
        </p>
      </div>
      <span
        class="add_cart"
        :class="{ active: activeCart }"
        @click.stop="addToCart(productCard)"
      >
        <img src="@/assets/images/active_card.svg" alt="" v-if="activeCart" class="active_cart" />
        <img src="@/assets/images/bag_bg.svg" alt="" v-else />
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import {locale} from "~/lang/localeLang";
export default {
  props: ["productCard"],
  data: () => ({
    imgUrl: "",
    favoriteActive: false,
    activeCart: false,
    favoriteList: null,
    cartList: null,
    locale: locale,
    lang: 'ru'
  }),
  computed: {
    activeFavorite() {
      if (this.favoriteList) {
        this.favoriteList.filter((i) => {
          if (i.id === this.productCard.id) {
            this.favoriteActive = true;
          }
        });
      }
    },

    inTheCart() {
      if (this.cartList) {
        this.cartList.filter((i) => {
          if (i.id === this.productCard.id) {
            this.activeCart = true;
          }
        });
      }
    },
  },

  methods: {
    ...mapActions(["GET_PRODUCT_PAGE"]),
    ...mapMutations(["ADD_FAVORITES"]),
    ...mapGetters(["GET_FAVOURITE_COUNT"]),

    productImage(product) {
      if (product.images === null) {
        return require("~/assets/images/image-not.svg");
      }
      if (product.product_images) {
        return this.imgUrl + product.product_images[0].image;
      }
      if (product.images.image) {
        return this.imgUrl + product.images.image;
      }
      if (product.images instanceof Array) {
        return this.imgUrl + product.images[0].image;
      }
    },

    addFavorite(product) {
      this.favoriteActive = !this.favoriteActive;
      this.ADD_FAVORITES(product);
    },

    addToCart(product) {
      this.activeCart = !this.activeCart;
      this.$store.commit("ADD_TO_CART", {product, count: 1});
    },
  },

  mounted() {
    this.lang = localStorage.getItem("lang")
    this.inTheCart;
    this.activeFavorite;
    this.imgUrl = this.$store.state.imgUrl;
  },

  created() {
    this.favoriteList = JSON.parse(localStorage.getItem("favorite"));
    this.cartList = JSON.parse(localStorage.getItem("cart_products"));
  },
};
</script>

<style></style>
