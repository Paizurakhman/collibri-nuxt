<template>
  <div class="account_content">
    <div class="contacts_form">
      <form autocomplete="stopdoingthat">
        <div class="account_main_content">
          <div class="row">
            <div class="col-xl-6 col-md-6">
              <div class="inputs">
                <input
                  type="text"
                  :placeholder="locale[lang].placeholders.name"
                  v-model="name"
                />
              </div>
            </div>
            <div class="col-xl-6 col-md-6">
              <div class="inputs">
                <input
                  type="text"
                  :placeholder="locale[lang].placeholders.surname"
                  v-model="first_name"
                />
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-xl-6 col-lg-6">
              <div class="font_600">
                <input
                  type="email"
                  :placeholder="locale[lang].placeholders.email"
                  v-model.trim="email"
                  autocomplete="stopdoingthat"
                  :class="{
                            invalid:
                              ($v.email.$dirty && !$v.email.required) ||
                              ($v.email.$dirty && !$v.email.email),
                          }"
                />
              </div>
            </div>
          </div>
          <div class="row my-4">
            <div class="col-xl-2">
              <div class="font_600">
                <p class="mb-0 mt-4">
                  {{ locale[lang].placeholders.password }}
                </p>
              </div>
            </div>
            <div class="col-xl-10 change_password">
              <div class="row" v-if="changePassword">
                <div class="col-xl-4">
                  <label>{{
                      locale[lang].placeholders.oldPassword
                    }}</label>
                  <input
                    type="password"
                    name="password"
                    :placeholder="
                              locale[lang].placeholders.oldPassword
                            "
                    v-model.trim="oldPassword"
                    :class="{
                              invalid:
                                $v.oldPassword.$dirty &&
                                !$v.oldPassword.required,
                            }"
                  />
                  <span
                    class="error"
                    v-if="
                              $v.oldPassword.$dirty && !$v.oldPassword.required
                            "
                  >{{ locale[lang].errors.passwordMust }}</span
                  >
                  <span class="error" v-if="!$v.oldPassword.minLength">
                            {{ locale[lang].errors.passwordMust }}
                            {{ $v.oldPassword.$model.length }}.
                          </span>
                </div>
                <div class="col-xl-4">
                  <label>{{
                      locale[lang].placeholders.newPassword
                    }}</label>
                  <input
                    type="password"
                    v-model.trim="password"
                    :class="{
                              invalid:
                                $v.password.$dirty && !$v.password.required,
                            }"
                  />
                  <span
                    class="error"
                    v-if="$v.password.$dirty && !$v.password.required"
                  >{{ locale[lang].errors.newPassword }}</span
                  >
                  <span class="error" v-if="!$v.password.minLength">
                            {{ locale[lang].errors.passwordMust }}
                            {{ $v.password.$model.length }}.
                          </span>
                </div>
                <div class="col-xl-4">
                  <label>{{
                      locale[lang].placeholders.passwordConfirm
                    }}</label>
                  <input
                    type="password"
                    v-model.trim="password_confirmation"
                    :class="{
                              invalid:
                                $v.password.$dirty && !$v.password.required,
                            }"
                  />
                  <span
                    class="error"
                    v-if="
                              $v.password.$dirty &&
                              !$v.password_confirmation.sameAsPassword
                            "
                  >{{ locale[lang].errors.passwordMismatch }}</span
                  >
                </div>
              </div>
              <div class="row justify-content-between">
                <div class="col-xl-4">
                  <div class="change_password_bottom">
                    <button
                      class="btn btn_outline_dark mt-2"
                      v-if="!changePassword"
                      @click.prevent="changePassword = true"
                    >
                      {{ locale[lang].buttons.edit }}
                    </button>
                    <button
                      class="btn btn_outline_dark mt-2"
                      v-if="changePassword"
                      @click.prevent="saveNewPassword"
                    >
                      {{ locale[lang].buttons.saved }}
                    </button>
                  </div>
                </div>
                <div class="col-xl-5 d-flex align-items-center">
                  <p class="m-0" v-if="password_saved">
                    Пароль сохранен
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="account_bottom_content">
          <div class="margin_input phone">
            <div class="row align-items-center">
              <p class="col-xl-2 col-md-2 mb-0 font_600 m_title">
                {{ locale[lang].placeholders.phone }}
              </p>
              <the-mask
                class="col-xl-6 col-md-6"
                :mask="['+7(###) ###-##-##']"
                :masked="true"
                v-model="phone"
                :placeholder="locale[lang].placeholders.PhoneNumber"
              />
            </div>
          </div>
          <div class="margin_input">
            <div class="address_text">
              <p class="font_600">
                {{ locale[lang].orderingPage.address }}
              </p>
            </div>
            <div class="row my-3">
              <div class="col-xl-6 col-md-6">
                <p class="font_600">
                  {{ locale[lang].accountPage.city }}
                </p>
              </div>
            </div>
            <div class="row my-4">
              <div class="col-xl-9 col-md-9">
                <div class="inputs">
                  <input
                    type="text"
                    :placeholder="locale[lang].placeholders.street"
                    v-model="street"
                  />
                </div>
              </div>
              <div class="col-xl-3 col-md-3">
                <div class="inputs">
                  <input
                    type="text"
                    :placeholder="locale[lang].placeholders.house"
                    v-model="house"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-3 col-md-3 col-6">
                <div class="inputs">
                  <input
                    type="text"
                    :placeholder="locale[lang].placeholders.housing"
                    v-model="building"
                  />
                </div>
              </div>
              <div class="col-xl-3 col-md-3 col-6">
                <div class="inputs">
                  <input
                    type="text"
                    :placeholder="locale[lang].placeholders.entrance"
                    v-model="entrance"
                  />
                </div>
              </div>
              <div class="col-xl-3 col-md-3 col-6">
                <div class="inputs">
                  <input
                    type="text"
                    :placeholder="locale[lang].placeholders.floor"
                    v-model="floor"
                  />
                </div>
              </div>
              <div class="col-xl-3 col-md-3 col-6">
                <div class="inputs">
                  <input
                    type="text"
                    :placeholder="locale[lang].placeholders.flat"
                    v-model="apartment"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="account_bottom_btn">
          <button class="btn btn_gray" @click.prevent="saveUserData">
            {{ locale[lang].buttons.saved }}
          </button>
          <p v-if="savedUserData">
            {{ locale[lang].accountPage.newDataSaved }}
          </p>
          <button class="btn btn_black" @click.prevent="logOut">
            {{ locale[lang].buttons.goOut }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {locale} from "~/lang/localeLang";
import {email, minLength, required, sameAs} from "vuelidate/lib/validators";
export default {
  name: "index",
  data () {
    return {
      options: "Город",
      changePassword: false,
      name: "",
      first_name: "",
      email: "",
      phone: "",
      region: "",
      city: "",
      street: "",
      house: "",
      building: "",
      entrance: "",
      floor: "",
      apartment: "",
      oldPassword: "",
      password: "",
      password_confirmation: "",
      savedUserData: false,
      password_saved: false,
      orderData: false,
      locale: locale,
      lang: 'ru'
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

    oldPassword: {
      required,
      minLength: minLength(6),
    },

    password: {
      required,
      minLength: minLength(6),
    },

    password_confirmation: {
      sameAsPassword: sameAs("password"),
    },
  },
  methods: {
    saveUserData() {
      this.$axios
        .post(`user-update`, {
          name: this.name,
          first_name: this.first_name,
          email: this.email,
          phone: this.phone,
          street: this.street,
          house: this.house,
          building: this.building,
          entrance: this.entrance,
          floor: this.floor,
          apartment: this.apartment,
          token: this.$cookies.get("userToken"),
        })
        .then((response) => {
          let userData = response.data.user;
          this.name = userData?.name;
          this.first_name = userData.first_name;
          this.email = userData?.email;
          this.phone = userData?.phone;
          this.street = userData?.street;
          this.house = userData?.house;
          this.building = userData?.building;
          this.entrance = userData?.entrance;
          this.floor = userData?.floor;
          this.apartment = userData?.apartment;
          this.savedUserData = true;
          setTimeout(() => {
            this.savedUserData = false;
          }, 1000);
        })
        .catch((error) => {
          setTimeout(() => {
            this.loader = null;
          }, 500);
        });
    },

    saveNewPassword() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        this.$axios
          .post(`password-update`, {
            old_password: this.oldPassword,
            password: this.password,
            password_confirmation: this.password_confirmation,
            token: $cookies.get("userToken"),
          })
          .then((response) => {
            this.password_saved = true;
            setTimeout(() => {
              (this.changePassword = false), (this.password_saved = false);
            }, 1000);
          })
          .catch((error) => {});
      }
    },

    logOut() {
      this.$router.push("/");
      this.$axios
        .post(`log-out`, {
          token: this.$cookies.get("userToken"),
        })
        .then((response) => {
          this.$cookies.remove("userToken");
          this.$cookies.remove("userId");
          this.$cookies.remove("token_time");
          localStorage.removeItem("cart_products");
          this.$store.state.cartLength = 0;
          this.$router.push("/");
        })
        .catch((error) => {});
    },
  },
  mounted() {
    this.lang = localStorage.getItem("lang") !== null? localStorage.getItem("lang"): "ru"
    const userToken = this.$cookies.get("userToken");
    const userId = this.$cookies.get("userId");
    this.$axios
      .post(`user-profile`, {
        token: userToken,
        user_id: userId,
      })
      .then((response) => {
        let userData = response.data.user;
        this.name = userData?.name;
        this.first_name = userData.first_name;
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
  },
}
</script>

<style scoped>

</style>
