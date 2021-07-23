<template>
  <div class="auth_card">
    <div class="auth_card_content">
      <div class="contacts_form">
        <div class="title text-center m-0">
          <h3>{{locale[lang].authorization.title}}</h3>
        </div>
        <form>
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
            type="password"
           :placeholder="locale[lang].placeholders.password"
            v-model.trim="password"
            :class="{
              invalid: ($v.password.$dirty && !$v.password.required),
            }"
          />
          <span class="error" v-if="($v.password.$dirty && !$v.password.required)"
            >{{locale[lang].errors.enterPassword}}</span
          >
          <span class="error" v-if="(!$v.password.minLength)">
            {{locale[lang].errors.passwordMismatch}}
          </span>
          <div class="flex_text">
            <nuxt-link :to="{ name: 'auth-forgot-password' }">{{locale[lang].authorization.forgotPassword}}</nuxt-link>
            <nuxt-link class="muddy" :to="{ name: 'auth-register' }">{{locale[lang].regist.registTitle}}</nuxt-link>
          </div>
          <button
            class="btn btn_black success_btn"
            @click.prevent="submit"
            :class="{ disabled: loader !== null }"
          >
            {{locale[lang].buttons.toComeIn}}
            <div class="" v-if="loader !== null"></div>
          </button>
          <span class="error mt-3 d-block">{{ registrationError }}</span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import {locale} from "~/lang/localeLang";

export default {
  name: "Login",
  data (){
    return {
      email: '',
      password: '',
      loader: null,
      locale: locale,
      lang: 'ru',
      registrationError: "",
    }
  },

  head() {
    return {
      title: this.lang === 'en'? 'Authorization | collibri': 'Авторизация | collibri'
    }
  },

  methods: {
    submit() {
      this.$v.$touch();
      this.loader = true;
      if (this.$v.$invalid) {
        this.loader = null;
        return false;
      } else {
        this.$axios
          .post(`login`, {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.$router.push("/my-account");
            const userToken = response.data.token;
            const userId = response.data.user_id;
            this.$cookies.set("userToken", userToken, 18000);
            this.$cookies.set("userId", userId, 18000);
            this.$cookies.set("token_time", new Date(), 18000);
          })
          .catch((e) => {
            this.registrationError = "Неправильный логин или пароль";
            setTimeout(() => {
              this.loader = null;
            }, 500);
          });
      }
    },
  },
  validations: {
    email: {
      email,
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  mounted() {
    this.lang = localStorage.getItem("lang")
  }
};
</script>

<style lang="scss">
</style>
