<template>
  <div class="auth_card">
    <div class="auth_card_content">
      <div class="contacts_form">
        <div class="title text-center m-0">
          <h3>{{ locale[lang].recovery }}</h3>
        </div>
        <form>
          <input
            type="password"
            v-model.trim="password"
            :class="{
              invalid: ($v.password.$dirty && !$v.password.required),
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

          <input
            type="password"
            v-model.trim="password_confirmation"
            :class="{
              invalid: ($v.password.$dirty && !$v.password.required),
            }"
          />
          <span
            class="error"
            v-if="
              $v.password.$dirty && !$v.password_confirmation.sameAsPassword
            "
            >{{ locale[lang].errors.passwordMismatch }}</span
          >

          <button class="btn btn_black mt-4" @click="saveNewPassword">
            {{ locale[lang].buttons.proceed }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import {locale} from "~/lang/localeLang";

export default {
  data: () => ({
    password: "",
    password_confirmation: "",
    locale: locale,
    lang: "ru"
  }),

  validations: {
    password: {
      required,
      minLength: minLength(6),
    },

    password_confirmation: {
      sameAsPassword: sameAs("password"),
    },
  },

  methods: {
    saveNewPassword() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        this.$axios
          .post(`password-update`, {
            password: this.password,
            password_confirmation: this.password_confirmation,
            token: this.$cookies.get("userToken"),
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
  },
  mounted() {
    this.lang = localStorage.getItem("lang")
  }
};
</script>
<style scoped>
</style>
