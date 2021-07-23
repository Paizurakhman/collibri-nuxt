<template>
  <div class="cart p_page">
    <div class="container">
      <div class="back_link">
        <a href="#" class="silver_text" @click.prevent="$router.push('/')"
          ><img src="@/assets/images/BACK.svg" alt="" /> {{locale[lang].buttons.backtoShopping}}</a
        >
      </div>
      <div class="cart_wrapper">
        <div class="title_small">
          <h1>{{locale[lang].cart}}</h1>
        </div>
        <div class="cart_content" v-if="cartData">
          <card-cart-product
            v-for="(card, index) in cartData"
            :key="card.id"
            :productCard="card"
            @deleteProduct="deleteProduct(index, card.id)"
          />
          <div class="total_cart_price">
            <p>
              {{locale[lang].orderingPage.total}}: <span class="price">{{ totalPrice }} KZT</span>
            </p>
            <button class="btn_black" @click="placementOfOrder(totalPrice)">
              {{locale[lang].buttons.ordering}}
            </button>
          </div>
        </div>
        <div class="cartIsEmpty mt-5 text-center" v-else>
          <h2>{{locale[lang].cartisEmpty}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {locale} from "~/lang/localeLang";

export default {

  data: () => ({
    cartData: null,
    count: 1,
    locale: locale,
    lang: 'ru'
  }),
  head () {
    return {
      title: this.lang === "en"? 'Cart | Collibri': 'Корзина | Collibri',
      // meta: [
      //   {
      //     content: this.meta_description
      //   }
      // ]
    }
  },

  methods: {
    placementOfOrder(totalPrice) {
      this.$router.push("/ordering-page");
      let products = [];
      for (let item of this.cartData) {
        let productData = {
          id: item.id,
          count: item.count,
        };
        products.push(productData);
      }
      localStorage.setItem("productsData", JSON.stringify(products));
    },

    deleteProduct(index, id) {
      this.cartData = this.cartData.filter((t) => t.id !== id);

      if (this.cartData.length === 0) {
        this.cartData = null;
      }

      this.$store.commit("DELETE_PRODUCT", id);
    },
  },

  computed: {
    totalPrice() {
      let result = [];

      for (let item of this.cartData) {
        result.push(item.price * item.count);
      }

      result = result.reduce(function (sum, el) {
        return sum + el;
      });

      return result;
    },
  },

  mounted() {
    this.lang = localStorage.getItem("lang") !== null? localStorage.getItem("lang"): "ru"
    let localstorageProductsId = JSON.parse(localStorage.getItem("cart_products"));
    let productsId = [];

    localstorageProductsId.forEach(product => {
      productsId.push(product.id)
    });

    if (localstorageProductsId !== null && localstorageProductsId.length) {
      this.$axios
        .get(`card-product`, {
          params: {
            product_id: productsId,
            lang: this.lang,
          },
        })
        .then((response) => (this.cartData = response.data));
    }
  },
};
</script>

<style>
</style>
