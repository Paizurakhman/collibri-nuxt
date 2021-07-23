<template>
  <div class="auth_card">
    <div class="auth_card_content">
      <div class="contacts_form">
        <div class="title text-center m-0">
          <h3>{{ locale[lang].forgotYourPassword.title }}</h3>
        </div>
        <form>
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
          <button
            @click.prevent="submit"
            class="btn btn_black mt-4 success_btn"
          >
            {{ locale[lang].buttons.proceed }}
            <div class="" v-if="loader !== null"></div>
          </button>
          <p v-if="emailSuccess" class="mt-4">
            {{ locale[lang].forgotYourPassword.success }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import {locale} from "~/lang/localeLang";

export default {
  name: "forgot-password",
  data: () => ({
    email: "",
    emailSuccess: false,
    loader: null,
    locale: locale,
    lang: "ru"
  }),

  head() {
    return {
      title: localStorage.getItem("lang") === 'en'? 'Forgot password | collibri': 'Забыли пароль | collibri'
    }
  },

  validations: {
    email: {
      email,
      required,
    },
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
          .get(`password/email`, {
            params: {
              email: this.email,
            },
          })
          .then((response) => {
            this.orderData = response.data;
          })
          .catch((error) => {
            setTimeout(() => {
              this.loader = null;
            }, 500);
          });
      }
    },
  },
  mounted() {
    this.lang = localStorage.getItem("lang")
  }
};
</script>

<style scoped>
</style>
