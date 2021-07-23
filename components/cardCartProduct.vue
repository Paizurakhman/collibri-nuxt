<template>
  <div class="card_cart">
    <div class="card_cart_info">
      <div class="card_cart_img">
        <img
          v-if="productCard.images"
          :src="$store.state.imgUrl + productCard.images.image"
          alt=""
        />
        <img v-else src="../assets/images/image-not.svg" alt="" />
      </div>
      <div class="card_descr">
        <p class="silver_text">{{ productCard.brand_name }}</p>
        <p class="bold_text">{{ productCard.title }}</p>
      </div>
    </div>
    <div class="card_price_info">
      <span class="like" @click.stop="addFavorite(productCard)"
        ><i class="far fa-heart" :class="{ fas: favoriteActive }"></i>
      </span>
      <div class="product_count">
        <button class="btn btn_add" @click="minusValue(productCard)">
          <span>-</span>
        </button>
        <span class="total_count">{{ productCard.count }}</span>
        <button class="btn btn_add" @click="plusValue(productCard)">
          <span>+</span>
        </button>
      </div>
      <div class="price">
        <p class="bold_text">{{ productCard.price }} KZT</p>
      </div>
    </div>
    <div class="delete_product" @click="$emit('deleteProduct')">
      <img src="@/assets/images/delete.svg" alt="" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["productCard"],
  data: () => ({
    favoriteActive: false,
    favoriteList: null,
    countValue: 1,
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
  },

  methods: {
    ...mapMutations(["ADD_FAVORITES"]),

    addFavorite(product) {
      this.favoriteActive = !this.favoriteActive;
      this.ADD_FAVORITES(product);
    },

    minusValue() {
      if (this.productCard.count > 1) {
        this.productCard.count--;

        this.setLocalStorageCount();
      }
    },

    plusValue() {
      this.productCard.count++;

      this.setLocalStorageCount();
    },

    setLocalStorageCount() {
      let localstorageCartData = JSON.parse(
        localStorage.getItem("cart_products")
      );

      if (localstorageCartData.find((item) => item.id == this.productCard.id)) {
        localstorageCartData.forEach((item, index) => {
          if (item.id == this.productCard.id) {
            localstorageCartData[index].count = this.productCard.count;
          }
        });
      }

      localStorage.setItem(
        "cart_products",
        JSON.stringify(localstorageCartData)
      );
    },
  },

  mounted() {
    this.activeFavorite;
    let localStorageProducts = JSON.parse(
      localStorage.getItem("cart_products")
    );

    localStorageProducts.filter((item) => {
      if (item.id === this.productCard.id && item.count) {
        this.$set(this.productCard, "count", item.count);
      }
    });
  },

  created() {
    this.favoriteList = JSON.parse(localStorage.getItem("favorite"));
  },
};
</script>

<style>
</style>
