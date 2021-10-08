<template>
  <div class="card_cart">
    <div class="ordering_cart_info">
      <div class="card_cart_img">
        <img
          v-if="productCard.images"
          :src="'https://cdn.collibri.kz/' + productCard.images.image"
          alt=""
        />
        <img v-else src="../assets/images/image-not.svg" alt="" />
      </div>
      <div class="card_descr">
        <p class="silver_text">
          {{ productCard.brand_name }}
        </p>
        <div class="info_product_order">
          <p class="bold_text">
            {{ productCard.title }}
          </p>
          <div class="price m_none" v-if="promo" style="flex-wrap: wrap">
            <p class="bold_text" v-if="productCard.count > 1">
              {{ productCard.count }} <span>*</span>
            </p>
            <p class="bold_text">
              {{
                productCard.old_price -
                (productCard.old_price * promo.sale) / 100
              }}
              kzt
            </p>
            <p class="percent_price" style="flex: 1 100%">
              {{ productCard.old_price }} kzt
            </p>
          </div>
          <div class="price m_none" v-else>
            <p class="bold_text" v-if="productCard.count > 1">
              {{ productCard.count }} <span>*</span>
            </p>
            <p class="bold_text">{{ productCard.price }} kzt</p>
          </div>
        </div>
      </div>
    </div>
    <div class="price d_none text-right">
      <p class="bold_text">{{ productCard.price }} kzt</p>
    </div>
    <div class="delete_product" @click="$emit('deleteProduct')">
      <img src="@/assets/images/delete_prod.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["productCard", "promo"],

  methods: {},
};
</script>

<style>
</style>
