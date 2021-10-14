<template>
  <div class="order_item_wrapper">
    <div>
      <div class="title_block">
        <h3>{{ locale[lang].orders.title }}</h3>
      </div>
    </div>
    <!--    < v-if="" />-->
    <div v-if="orderData">
      <div class="order_item" v-for="order in orderData.orders" :key="order.id">
        <div class="first_block">
          <div class="row">
            <div class="col-xl-10 col-lg-10">
              <div class="order_number">
                <p>№ {{ order.id }}</p>
              </div>
              <div class="order_block">
                <div class="row">
                  <div class="col-xl-3 col-lg-4 col-5">
                    <div class="order_titles">
                      <p>{{ locale[lang].orders.status }}</p>
                    </div>
                  </div>
                  <div class="col-xl-9 col-lg-8 col-7">
                    <div class="order_title_status">
                      <p class="green_text">{{ order.type_status }}</p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xl-3 col-lg-4 col-5">
                    <div class="order_titles">
                      <p>{{ locale[lang].orders.deliveryDate }}</p>
                    </div>
                  </div>
                  <div class="col-xl-9 col-lg-8 col-7">
                    <div class="order_title_status">
                      <p>{{ dateOrder(order.created_at) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-lg-2">
              <div class="image_order">
                <img
                  :src="'https://cdn.collibri.kz/' + order.product_image.image"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xl-10 col-lg-10">
            <div class="order_block mt-3">
              <div class="row">
                <div class="col-xl-3 col-lg-4">
                  <div class="order_titles">
                    <p>{{ locale[lang].orders.deliveryAddress }}</p>
                  </div>
                </div>
                <div class="col-xl-9 col-lg-8">
                  <div class="order_title_status">
                    <p v-if="order.address.street">
                      {{ order.address.street }}<span>/</span>
                    </p>
                    <p v-if="order.address.house">
                      {{ locale[lang].orders.house }}-{{ order.address.house
                      }}<span>/</span>
                    </p>
                    <p v-if="order.address.building">
                      {{ locale[lang].orders.building }}-{{
                        order.address.building
                      }}<span>/</span>
                    </p>
                    <p v-if="order.address.entrance">
                      {{ locale[lang].orders.entrance }}-{{
                        order.address.entrance
                      }}<span>/</span>
                    </p>
                    <p v-if="order.address.floor">
                      {{ locale[lang].orders.floor }}-{{ order.address.floor
                      }}<span>/</span>
                    </p>
                    <p v-if="order.address.apartment">
                      {{ locale[lang].orders.apartment }}-{{
                        order.address.apartment
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order_price">
          {{ locale[lang].orders.toPay }} {{ order.amount }} KZT
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { locale } from "~/lang/localeLang";

export default {
  name: "orders",
  data: () => ({
    orderData: null,
    loader: false,
    locale: locale,
    lang: "ru",
  }),

  methods: {
    dateOrder(date) {
      let getyear = new Date().getUTCFullYear(date);
      let getmounth = new Date().getUTCMonth(date);
      if (getmounth < 10) getmounth = "0" + getmounth;
      let getday = new Date().getUTCDate(date);
      if (getday < 10) getday = "0" + getday;

      return getday + "." + getmounth + "." + getyear;
    },
  },

  mounted() {
    this.lang = localStorage.getItem("lang");
    this.loader = true;
    this.$axios
      .post(`user-orders`, {
        token: this.$cookies.get("userToken"),
      })
      .then((response) => {
        setTimeout(() => {
          this.loader = false;
          this.orderData = response.data;
          console.log(this.orderData);
        }, 1000);
      })
      .catch((error) => {});
  },
};
</script>

<style scoped>
</style>
