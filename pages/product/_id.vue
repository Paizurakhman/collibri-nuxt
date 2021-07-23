<template>
  <div class="page_product_wrapper p_page">
    <pre>{{ activeFavorite }}</pre>
    <div class="loader_wrapper" v-if="$store.state.loader">
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
      <div v-if="PRODUCT_ITEM">
        <div class="nav_page">
          <div class="breadcrumbs">
            <nuxt-link to="/">{{ locale[lang].navLang.main }}</nuxt-link>
            <nuxt-link
              :to="{
                name: 'catalog-slug-id',
                params: {
                  id: PRODUCT_ITEM.category_parent.parent_id,
                  slug: PRODUCT_ITEM.category_parent.slug,
                },
              }"
            >{{ PRODUCT_ITEM.category_parent.title }}</nuxt-link
            >
            <nuxt-link
              :to="{
                name: 'catalog-slug-id',
                params: {
                  id: PRODUCT_ITEM.category.category_id,
                  slug: PRODUCT_ITEM.category.slug,
                },
              }"
            >{{ PRODUCT_ITEM.category.title }}</nuxt-link
            >
          </div>
          <div class="like">
            <i
              class="far fa-heart"
              @click="addFavorite(PRODUCT_ITEM.product)"
              :class="{ fas: favoriteActive }"
            ></i>
          </div>
        </div>
        <div class="product_content">
          <div class="like d-none">
            <i
              class="far fa-heart"
              @click="addFavorite(PRODUCT_ITEM.product)"
              :class="{ fas: favoriteActive }"
            ></i>
          </div>
          <div class="row">
            <div class="col-xl-6 col-lg-6">
              <div
                class="slider_product"
                v-if="PRODUCT_ITEM.product.product_images"
              >
                <slick-carousel
                  ref="c1"
                  :asNavFor="$refs.c2"
                  :focusOnSelect="true"
                >
                  <img
                    v-for="(slide, idx) in PRODUCT_ITEM.product.product_images"
                    :key="idx"
                    :src="imgUrl + slide.image"
                    alt=""
                  />
                </slick-carousel>
                <div
                  class="slider-nav"
                  v-if="PRODUCT_ITEM.product.product_images.length > 1"
                >
                  <slick-carousel
                    ref="c2"
                    :asNavFor="$refs.c1"
                    v-bind="settingsSliderNav"
                  >
                    <img
                      v-for="(slide, idx) in PRODUCT_ITEM.product
                        .product_images"
                      :key="idx"
                      :src="imgUrl + slide.image"
                      alt=""
                    />
                  </slick-carousel>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6">
              <div class="product_info">
                <div class="product_info_top">
                  <p class="green_text" v-if="Number(PRODUCT_ITEM.product.stock) === 1">
                    {{ locale[lang].productPage.inStock }}
                  </p>
                  <p class="red_text" v-if="Number(PRODUCT_ITEM.product.stock) === 2">
                    {{ locale[lang].productPage.expectation }}
                  </p>
                  <div class="d-flex">
                    <p>
                      {{ locale[lang].productPage.vendorCode }}:
                      <span class="silver_text">{{
                          PRODUCT_ITEM.product.artikul
                        }}</span>
                    </p>
                  </div>
                </div>
                <div class="product_title">
                  <p>
                    {{ locale[lang].productPage.brand }}:
                    <span class="big_text">{{
                        PRODUCT_ITEM.product.brand_name
                      }}</span>
                  </p>
                  <h2 v-if="PRODUCT_ITEM.title">{{ PRODUCT_ITEM.title }}</h2>
                </div>
                <p
                  class="product_text"
                  v-if="PRODUCT_ITEM.product.country_name"
                >
                  {{ locale[lang].country }}:{{
                    PRODUCT_ITEM.product.country_name
                  }}
                </p>
                <div
                  class="product_text"
                  v-html="PRODUCT_ITEM.product.title"
                ></div>
                <div class="product_price">
                  <p
                    class="small_text silver_text percent_price"
                    v-if="PRODUCT_ITEM.product.sale > 0"
                  >
                    {{ PRODUCT_ITEM.product.price }} тг
                  </p>
                  <p class="bold_text">
                    {{ PRODUCT_ITEM.product.current_price }} тг
                  </p>
                  <button
                    class="
                      t_block
                      d_none
                      m_none
                      btn btn_black btn_border_radius
                    "
                    @click="addToCart(PRODUCT_ITEM.product)"
                    :class="{ active: activeCart }"
                  >
                    {{ cartBtnText }}
                    <div class="spin1" v-if="activeCart"></div>
                  </button>
                </div>
                <div class="buy_content">
                  <div class="product_count">
                    <button class="btn btn_add" @click="minusValue">
                      <span>-</span>
                    </button>
                    <span class="total_count">{{ countValue }}</span>
                    <button class="btn btn_add" @click="plusValue">
                      <span>+</span>
                    </button>
                  </div>
                  <button
                    class="btn btn_black btn_border_radius m_none"
                    @click="modal = !modal"
                  >
                    {{ locale[lang].productPage.requestACall }}
                  </button>
                  <button
                    class="t_none m_none btn btn_black btn_border_radius"
                    @click="addToCart(PRODUCT_ITEM.product, countValue)"
                    :class="{ active: activeCart }"
                  >
                    {{ cartBtnText }}
                  </button>
                </div>
                <button
                  class="btn btn_black btn_border_radius d_none"
                  @click="modal = !modal"
                >
                  {{ locale[lang].productPage.requestACall }}
                </button>
                <button
                  class="btn btn_black btn_border_radius d_none"
                  @click="addToCart(PRODUCT_ITEM.product)"
                  :class="{ active: activeCart }"
                >
                  {{ cartBtnText }}
                </button>
              </div>
              <div class="description_tabs">
                <div class="tabs_switches">
                  <a
                    href="#"
                    class="tab_link"
                    @click.prevent="tab = 'description'"
                    :class="{ active_tab: tab === 'description' }"
                  >{{ locale[lang].productPage.productDescription }}</a
                  >
                </div>
                <div class="tabs_content" v-if="tab === 'description'">
                  <div
                    class="silver_text"
                    v-html="PRODUCT_ITEM.product.description"
                  ></div>
                </div>
              </div>
              <div class="share">
                <p>{{ locale[lang].productPage.share }}:</p>
                <yandex-share
                  :services="['facebook', 'telegram', 'whatsapp']"
                  counter
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="product_slider_wrapper"
          v-if="PRODUCT_ITEM.recomend_products.length"
        >
          <div class="title_block">
            <h2>{{ locale[lang].productPage.recommendedProduct }}</h2>
          </div>
          <div class="product_slider">
            <slick-carousel
              v-bind="settingsRecomendSlider"
              :focusOnSelect="false"
            >
              <productCard
                v-for="(slide, idx) in PRODUCT_ITEM.recomend_products"
                :key="idx"
                :productCard="slide"
              ></productCard>
            </slick-carousel>
          </div>
        </div>
        <transition name="slide-fade">
          <div class="modal" v-if="modal" ref="modal">
            <div class="contacts_form">
              <span @click="modal = false" class="close"
              ><img src="@/assets/images/close.svg" alt=""
              /></span>
              <div class="title text-center m-0">
                <h3>{{ locale[lang].productPage.requestACall }}</h3>
                <p class="typo__p" v-if="submitStatus === 'OK'">
                  {{ locale[lang].productPage.applicationSent }}
                </p>
              </div>

              <form
                ref="form"
                action=""
                @submit.prevent="submit"
                :class="{ 'form-group--error': $v.name.$error }"
              >
                <input
                  type="text"
                  :placeholder="locale[lang].placeholders.name"
                  v-model.trim="name"
                  :class="{ invalid: $v.name.$dirty && !$v.name.required }"
                />
                <span v-if="$v.name.$error" class="error">{{
                    locale[lang].errors.name
                  }}</span>
                <the-mask
                  :mask="['+7(###) ###-####']"
                  :masked="true"
                  v-model.trim="phone"
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
                <span v-if="$v.email.$dirty && $v.email.$error" class="error">{{
                    locale[lang].errors.email
                  }}</span>
                <input
                  type="text"
                  :placeholder="locale[lang].placeholders.nameOfCompany"
                  v-model="company"
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  :placeholder="locale[lang].placeholders.comment"
                ></textarea>
                <recaptcha @success="markRecaptchaAsVerified" class="mt-3 mb-4"/>
                <span class="error mb-4 d-block">{{
                    loginForm.pleaseTickRecaptchaMessage
                  }}</span>
                <button type="btn" class="btn btn_black">
                  {{ locale[lang].buttons.send }}
                </button>
              </form>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { required, email, minLength } from "vuelidate/lib/validators";
import {locale} from "~/lang/localeLang";

export default {
  data: () => ({
    tab: "description",
    productData: null,
    countValue: 1,
    modal: false,
    imgUrl: null,
    name: "",
    phone: "",
    email: "",
    comment: "",
    locale: locale,
    lang: 'ru',
    company: "",
    submitStatus: null,
    rec: false,
    activeCart: false,
    favoriteActive: false,
    favoriteList: null,
    cartProductsList: null,
    settingsRecomendSlider: {
      arrows: true,
      dots: false,
      focusOnSelect: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      touchMove: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    },
    settingsSliderNav: {
      slidesToShow: 4,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    },
    loginForm: {
      recaptchaVerified: false,
      pleaseTickRecaptchaMessage: "",
    },
  }),

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
  },

  computed: {
    ...mapGetters(["PRODUCT_ITEM"]),

    activeFavorite() {
      this.favoriteActive = false;
      if (this.favoriteList && this.PRODUCT_ITEM) {
        this.favoriteList.filter((i) => {
          if (i.id === this.PRODUCT_ITEM.product.id) {
            this.favoriteActive = true;
          }
        });
      }
    },

    cartBtnText() {
      if (this.activeCart) {
        return this.locale[this.lang].productPage.addedToCart;
      } else {
        return this.locale[this.lang].productPage.addToCard;
      }
    },
  },

  methods: {
    ...mapActions(["GET_PRODUCT_PAGE", "GET_PRODUCTS"]),
    ...mapMutations(["ADD_FAVORITES"]),

    catalogDropdown() {
      this.$store.commit("CATALOG_DROPDOWN");
    },

    addFavorite(product) {
      this.ADD_FAVORITES(product);
      this.favoriteList = JSON.parse(localStorage.getItem("favorite"));
    },

    markRecaptchaAsVerified(response) {
      this.loginForm.pleaseTickRecaptchaMessage = "";
      this.loginForm.recaptchaVerified = true;
    },

    minusValue() {
      if (this.countValue > 1) {
        this.countValue--;
      }
    },

    plusValue() {
      this.countValue++;
    },

    productUrl(url) {
      this.GET_PRODUCT_PAGE(url);
    },

    categoryUrl(id) {
      this.navDropdown = false;
      this.GET_PRODUCTS(this.$route.params.id);
    },

    submit() {
      let formData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        comment: this.comment,
        product_id: this.PRODUCT_ITEM.product.id,
        count: this.countValue,
        company: this.company,
      };

      this.$v.$touch();

      if (this.$v.$invalid) {
        return false;
      } else if (!this.loginForm.recaptchaVerified) {
        this.loginForm.pleaseTickRecaptchaMessage =
          "Подтвердите что вы не робот!";
      } else {
        this.loginForm.pleaseTickRecaptchaMessage = "";
        this.submitStatus = "PENDING";
        this.$axios
          .post(`callback`, {
            formData,
          })
          .then((response) => {
            this.submitStatus = "OK";
            setTimeout(() => {
              if ((this.submitStatus = "OK")) {
                this.modal = false;
                this.submitStatus = null;
                this.name = "";
                this.email = "";
                this.phone = "";
                this.comment = "";
                this.countValue = "";
                this.company = "";
                this.$v.$reset();
                this.$recaptcha.reset()
                this.loginForm.recaptchaVerified = false;
              }
            }, 2000);
          });
      }
    },

    addToCart(product, countValue) {
      this.activeCart = true;
      this.cartProductsList = JSON.parse(localStorage.getItem("cart_products"));
      this.$store.commit("ADD_TO_CART_PRODUCT", { product, countValue });
      setTimeout(() => {
        this.activeCart = false;
      }, 2000);
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.productUrl(to.params.id);
    next();
  },

  watch: {
    modal(e) {
      if (e) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "scroll";
      }
    },
  },

  mounted() {
    this.lang = localStorage.getItem("lang")
    this.imgUrl = this.$store.state.imgUrl;
    let vm = this;

    let productUrl = this.$route.params.id;
    this.GET_PRODUCT_PAGE(productUrl);

    this.cartProductsList = JSON.parse(localStorage.getItem("cart_products"))
    this.favoriteList = JSON.parse(localStorage.getItem("favorite"))

    document.addEventListener("click", function (e) {
      if (e.target === vm.$refs["modal"]) {
        vm.modal = false;
      }
    });
  },

};
</script>

<style></style>
