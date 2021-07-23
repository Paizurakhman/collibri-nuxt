<template>
  <div class="auth_card">
    <div class="auth_card_content">
      <div class="contacts_form">
        <div class="title text-center m-0">
          <h3>{{ locale[lang].regist.registTitle }}</h3>
          <p class="error">{{ registrationError }}</p>
        </div>
        <form>
          <div class="register_type">
            <p>{{ locale[lang].regist.contactData }}</p>
          </div>
          <input
            type="text"
            :placeholder="locale[lang].placeholders.name"
            v-model.trim="name"
            autocomplete="off"
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
            autocomplete="off"
            :class="{
              invalid:
                ($v.phone.$dirty && !$v.phone.required) ||
                ($v.phone.$dirty && !$v.phone.minLength),
            }"
          />
          <span v-if="$v.phone.$error" class="error"
            >{{ locale[lang].errors.PhoneNumber }} {{ phone.length }}</span
          >
          <input
            type="text"
            :placeholder="locale[lang].placeholders.email"
            v-model.trim="email"
            autocomplete="off"
            :class="{
              invalid:
                ($v.email.$dirty && !$v.email.required) ||
                ($v.email.$dirty && !$v.email.email),
            }"
          />
          <span v-if="$v.email.$dirty && $v.email.$error" class="error">{{
            locale[lang].errors.email
          }}</span>

          <div class="register_type">
            <p>{{ locale[lang].errors.password }}</p>
          </div>

          <input
            type="password"
            :placeholder="locale[lang].placeholders.password"
            v-model.trim="password"
            autocomplete="off"
            :class="{
              invalid: $v.password.$dirty && !$v.password.required,
            }"
          />
          <span
            class="error"
            v-if="$v.password.$dirty && !$v.password.required"
            >{{ locale[lang].errors.enterPassword }}</span
          >
          <span class="error" v-if="!$v.password.minLength">
            {{ locale[lang].errors.passwordMust }}
            {{ $v.password.$params.minLength.min }}.
          </span>
          <input
            type="password"
            :placeholder="locale[lang].placeholders.passwordConfirm"
            v-model.trim="repeatPassword"
            autocomplete="off"
            :class="{
              invalid: $v.password.$dirty && !$v.password.required,
            }"
          />
          <span
            class="error"
            v-if="$v.password.$dirty && !$v.repeatPassword.sameAsPassword"
            >{{ locale[lang].errors.passwordMismatch }}</span
          >
          <recaptcha @success="markRecaptchaAsVerified" class="mt-3 mb-4"/>
          <span class="error mb-4 d-block">{{
            loginForm.pleaseTickRecaptchaMessage
          }}</span>
          <button
            class="btn btn_black mt-4 success_btn"
            @click.prevent="submit"
            :class="{ disabled: loader !== null }"
          >
            {{ locale[lang].buttons.confirm }}
            <div class="" v-if="loader !== null"></div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, sameAs, minLength, email } from "vuelidate/lib/validators";
import {locale} from "~/lang/localeLang";

export default {
  name: "Register",
  data: () => ({
    loader: null,
    registrationError: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
    locale: locale,
    lang: "ru",
    errors: "",
    loginForm: {
      recaptchaVerified: false,
      pleaseTickRecaptchaMessage: "",
    },
  }),

  head() {
    return {
      title: this.lang === 'en'? 'Register | collibri': 'Регистрация | collibri'
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
    password: {
      required,
      minLength: minLength(6),
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
  },

  methods: {
    markRecaptchaAsVerified(response) {
      this.loginForm.pleaseTickRecaptchaMessage = "";
      this.loginForm.recaptchaVerified = true;
    },

    submit() {
      this.$v.$touch();
      this.loader = true;

      if (this.$v.$invalid) {
        setTimeout(() => {
          this.loader = null;
        }, 500);
        return false;
      } else if (!this.loginForm.recaptchaVerified) {
        this.loginForm.pleaseTickRecaptchaMessage =
          "Подтвердите что вы не робот!";
        setTimeout(() => {
          this.loader = null;
        }, 500);
      } else {
        this.loginForm.pleaseTickRecaptchaMessage = "";
        this.submitStatus = "PENDING";
        this.$axios
          .post(`register`, {
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password,
            password_confirmation: this.repeatPassword,
          })
          .then((response) => {
            this.$recaptcha.reset()
            this.loginForm.recaptchaVerified = false;
            this.$router.push({ name: 'auth-login' });
          })
          .catch((error) => {
            this.registrationError = "Пользователь уже существует";
            setTimeout(() => {
              this.loader = null;
            }, 500);
          });
      }
    },
  },
  mounted() {
    this.lang = localStorage.getItem("lang") !== null? localStorage.getItem("lang"): "ru"
  }
};
</script>

<style scoped>
</style>
