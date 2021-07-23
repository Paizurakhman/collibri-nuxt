<template>
  <div class="ordering p_page">
    <div class="order_loader" v-if="loader">
      <loader />
      <div class="_order_text">
        <h3>{{ locale[lang].processingRequest }}...</h3>
      </div>
    </div>

    <div class="container">
      <div class="back_link">
        <a href="#" class="silver_text" @click.prevent="$router.go(-1)"
          ><img src="@/assets/images/BACK.svg" alt="" />{{
            locale[lang].buttons.backtoShopping
          }}</a
        >
      </div>
      <div class="ordering_wrapper">
        <div class="title_small">
          <h1>{{ locale[lang].orderingPage.checkout }}</h1>
        </div>
        <div class="row contacts_data">
          <div class="col-xl-6 col-lg-6">
            <div class="title_block">
              <h2>{{ locale[lang].orderingPage.contactDetails }}</h2>
              <form action="" class="ordering_form">
                <div class="row">
                  <div class="col-xl-6">
                    <input
                      type="text"
                      :placeholder="locale[lang].placeholders.name"
                      v-model.trim="name"
                      :class="{ invalid: $v.name.$dirty && !$v.name.required }"
                    />
                    <span v-if="$v.name.$error" class="error">{{
                      locale[lang].placeholders.name
                    }}</span>
                  </div>
                  <div class="col-xl-6">
                    <the-mask
                      :mask="['+7(###) ###-##-##']"
                      v-model.trim="phone"
                      type="text"
                      :masked="true"
                      :placeholder="locale[lang].placeholders.PhoneNumber"
                      :class="{
                        invalid:
                          ($v.phone.$dirty && !$v.phone.required) ||
                          ($v.phone.$dirty && !$v.phone.minLength),
                      }"
                    />
                    <span v-if="$v.phone.$error" class="error"
                      >{{ locale[lang].errors.PhoneNumber }}
                      {{ phone.length }}</span
                    >
                  </div>
                  <div class="col-xl-6">
                    <input
                      type="text"
                      :placeholder="locale[lang].placeholders.email"
                      v-model.trim="email"
                      :class="{
                        invalid:
                          ($v.email.$dirty && !$v.email.required) ||
                          ($v.email.$dirty && !$v.email.email),
                      }"
                    />
                    <span
                      v-if="$v.email.$dirty && $v.email.$error"
                      class="error"
                      >{{ locale[lang].errors.email }}</span
                    >
                  </div>
                  <div class="col-xl-6">
                    <input
                      type="text"
                      :placeholder="locale[lang].placeholders.instagram"
                      v-model.trim="instagram"
                      :class="{
                        invalid:
                          ($v.instagram.$dirty && !$v.instagram.required)}"
                    />
                    <span
                      v-if="$v.instagram.$dirty && $v.instagram.$error"
                      class="error"
                      >{{ locale[lang].errors.instagram }}</span
                    >
                  </div>
                  <div class="col-xl-12 ordering_padding">
                    <div class="ordering_tabs">
                      <p>{{ locale[lang].orderingPage.delivery }}</p>
                    </div>
                  </div>
                  <div class="col-xl-12">
                    <div class="title_block ordering_padding">
                      <p>{{ locale[lang].orderingPage.address }}</p>
                    </div>
                    <div class="row">
                      <div class="col-xl-8 m_input">
                        <input
                          type="text"
                          :placeholder="locale[lang].placeholders.street"
                          v-model.trim="street"
                          :class="{
                            invalid: $v.street.$dirty && !$v.street.required,
                          }"
                        />
                      </div>
                      <div class="col-xl-4 m_input">
                        <input
                          type="text"
                          :placeholder="locale[lang].placeholders.house"
                          v-model="house"
                          :class="{
                            invalid: $v.house.$dirty && !$v.house.required,
                          }"
                        />
                      </div>
                      <div class="col-xl-3 m_input">
                        <input
                          type="text"
                          :placeholder="locale[lang].placeholders.housing"
                          v-model.trim="building"
                        />
                      </div>
                      <div class="col-xl-3 m_input">
                        <input
                          type="text"
                          :placeholder="locale[lang].placeholders.entrance"
                          v-model="entrance"
                        />
                      </div>
                      <div class="col-xl-3 m_input">
                        <input
                          type="text"
                          :placeholder="locale[lang].placeholders.floor"
                          v-model="floor"
                        />
                      </div>
                      <div class="col-xl-3 m_input">
                        <input
                          type="text"
                          :placeholder="locale[lang].placeholders.flat"
                          v-model="apartment"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-12 ordering_padding">
                    <div class="title_block">
                      <p>{{ locale[lang].orderingPage.commentsOrder }}</p>
                    </div>
                    <div class="row">
                      <div class="col-xl-12">
                        <textarea
                          name=""
                          id=""
                          cols="30"
                          rows="10"
                          v-model="comment"
                          :placeholder="
                            locale[lang].orderingPage.commentsOrder
                          "
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn_black mt-5 m-0 m_none"
                  :class="{disabled: cartData === null}"
                  @click="submit"
                >
                  {{ locale[lang].buttons.proceedToCheckout }}
                </button>
              </form>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6">
            <div class="title_block">
              <h2>{{ locale[lang].orderingPage.yourOrder }}</h2>
            </div>
            <div v-if="cartData">
              <div class="your_order">
                <cardOrderProduct
                  v-for="(card, index) in cartData"
                  :key="card.id"
                  :productCard="card"
                  @deleteProduct="deleteProduct(index, card.id)"
                />
              </div>
              <div class="delivery_info">
                <p v-if="totalPrice < 45000" class="red_text">
                  {{ locale[lang].deliveryText.delivery }}: 1000 KZT
                </p>
                <p v-else class="green_text">
                  {{ locale[lang].deliveryText.freeDelivery }}
                </p>
              </div>
              <div class="total">
                <p v-if="totalPrice < 45000">
                  {{ locale[lang].orderingPage.total }}:
                  {{ totalPrice + 1000 }} KZT
                </p>
                <p v-else>
                  {{ locale[lang].orderingPage.total }}: {{ totalPrice }} KZT
                </p>
              </div>
            </div>
            <div v-else>
              <h3>{{ locale[lang].cartisEmpty }}</h3>
            </div>
          </div>
          <div class="text-center d_none w-100 mt-5">
            <button
              type="button"
              class="btn btn_black mt-5 m-auto"
              :class="{disabled: cartData === null}"
              @click="submit"
            >
              {{ locale[lang].buttons.proceedToCheckout }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import {locale} from "~/lang/localeLang";

export default {
  components: {  },
  data: () => ({
    cartData: null,
    name: "",
    phone: "",
    email: "",
    instagram: "",
    street: "",
    house: "",
    building: "",
    entrance: "",
    floor: "",
    apartment: "",
    comment: "",
    loader: false,
    loadingPoints: "",
    locale: locale,
    lang: 'ru'
  }),

  head () {
    return {
      title: this.lang === "en"? 'Checkout | Collibri': 'Оформление заказа | Collibri',
      // meta: [
      //   {
      //     content: this.meta_description
      //   }
      // ]
      script: [
        {src: "https://widget.cloudpayments.ru/bundles/cloudpayments"}
      ]
    }
  },

  validations: {
    name: {
      required,
      minLength: minLength(3),
    },

    phone: {
      required,
      minLength: minLength(11),
    },

    email: {
      email,
      required,
    },
    instagram: {
      required,
    },

    street: {
      required,
    },

    house: {
      required,
    },
  },

  methods: {
    deleteProduct(index, id) {
      this.cartData = this.cartData.filter((t) => t.id !== id);

      if (this.cartData.length === 0) {
        this.cartData = null;
      }

      this.$store.commit("DELETE_PRODUCT", id);
    },

    submit() {
      let address = {
        street: this.street,
        house: this.house,
        building: this.building,
        entrance: this.entrance,
        floor: this.floor,
        apartment: this.apartment,
      };

      let main_info = {
        comment: this.comment,
        name: this.name,
        phone: this.phone,
        email: this.email,
        token: this.$cookies.get("userToken"),
        instagram: this.instagram
      };

      let products = JSON.parse(localStorage.getItem("productsData"));

      this.$v.$touch();

      if (this.$v.$invalid) {
        return false;
      } else if (this.$cookies.isKey("userToken")) {
        this.loader = true;
        this.$axios
          .post(`get-order`, {
            address,
            main_info,
            products,
          })
          .then((response) => {
            let tPrice = this.totalPrice < 45000? this.totalPrice + 1000: this.totalPrice
            let order_id = response.data.order_id;
            let vm = this
            localStorage.setItem("order-id", order_id)
            this.loader = false;
            var widget = new cp.CloudPayments();
            widget.pay('charge', // или 'charge'
              { //options
                publicId: 'pk_c7c0d7ae2c0a26ff75f9395a37c65', //id из личного кабинета
                description: 'Оплата товаров в collibri.kz', //назначение
                amount: tPrice, //сумма
                currency: 'KZT', //валюта
                accountId: this.email, //идентификатор плательщика (необязательно)
                invoiceId: localStorage.getItem("order-id"), //номер заказа  (необязательно)
                skin: "modern", //дизайн виджета (необязательно)

              },
              {
                onSuccess: function (options) { // success
                  //действие при успешной оплате
                  localStorage.removeItem("cart_products");
                  localStorage.removeItem("order-id");
                  vm.$router.push('/')
                  // console.log(options);
                  setTimeout(() => {
                    location.reload()
                  }, 500)
                },
                onFail: function (reason, options) { // fail
                  //действие при неуспешной оплате
                  console.log(reason, options);
                },
                onComplete: function (paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
                  //например вызов вашей аналитики Facebook Pixel
                  console.log(paymentResult, options);
                }
              }
            )
          })
          .catch((error) => {
            this.loader = false;
          });
      } else {
        this.loader = true;
        this.$axios
          .post(`get-order`, {
            address,
            main_info,
            products,
          })
          .then((response) => {
            let tPrice = this.totalPrice < 45000? this.totalPrice + 1000: this.totalPrice
            let order_id = response.data.order_id;
            let vm = this
            localStorage.setItem("order-id", order_id)
            this.loader = false;
            var widget = new cp.CloudPayments();
            widget.pay('charge', // или 'charge'
              { //options
                publicId: 'pk_c7c0d7ae2c0a26ff75f9395a37c65', //id из личного кабинета
                description: 'Оплата товаров в collibri.kz', //назначение
                amount: tPrice, //сумма
                currency: 'KZT', //валюта
                accountId: this.email, //идентификатор плательщика (необязательно)
                invoiceId: localStorage.getItem("order-id"), //номер заказа  (необязательно)
                skin: "modern", //дизайн виджета (необязательно)

              },
              {
                onSuccess: function (options) { // success
                  //действие при успешной оплате
                  localStorage.removeItem("cart_products");
                  localStorage.removeItem("order-id");
                  vm.$router.push('/')
                  // console.log(options);
                  setTimeout(() => {
                    location.reload()
                  }, 500)
                },
                onFail: function (reason, options) { // fail
                  //действие при неуспешной оплате
                  console.log(reason, options);
                },
                onComplete: function (paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
                  //например вызов вашей аналитики Facebook Pixel
                  console.log(paymentResult, options);
                }
              }
            )
          })
          .catch((error) => {
            this.loader = false;
          });
      }
    },
  },

  computed: {
    totalPrice() {
      let result = [];
      this.cartData.filter((item, i) => {
        for (let i of JSON.parse(localStorage.getItem("productsData"))) {
          if (item.id === i.id) {
            this.$set(item, "count", i.count);
            result.push(item.price * i.count);
          }
        }
      });

      result = result.reduce(function (sum, el) {
        return sum + el;
      });

      return result;
    },
  },

  mounted() {
    this.lang = localStorage.getItem("lang") !== null? localStorage.getItem("lang"): "ru"
    let localstorageProductsId = JSON.parse(
      localStorage.getItem("cart_products")
    );
    let productsId = [];

    localstorageProductsId.forEach((product) => {
      productsId.push(product.id);
    });

    if (localstorageProductsId !== null && localstorageProductsId.length) {
      this.$axios
        .get(`card-product`, {
          params: {
            product_id: productsId,
            lang: this.$store.state.lang,
          },
        })
        .then((response) => (this.cartData = response.data));
    }

    const userToken = this.$cookies.get("userToken");
    const userId = this.$cookies.get("userId");
    if (userToken !== null && userId !== null) {
      this.$axios
        .post(`user-profile`, {
          token: userToken,
          user_id: userId,
        })
        .then((response) => {
          let userData = response.data.user;
          this.name = userData?.name;
          this.email = userData?.email;
          this.phone = userData?.phone;
          this.street = userData?.street;
          this.house = userData?.house;
          this.building = userData?.building;
          this.entrance = userData?.entrance;
          this.floor = userData?.floor;
          this.apartment = userData?.apartment;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style></style>
