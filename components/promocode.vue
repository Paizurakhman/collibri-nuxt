<template>
  <div class="promocode">
    <form @submit.prevent="checkPromocode" class="ordering_form">
      <div class="row">
        <div class="col-xl-8">
          <div class="m_input">
            <input
              type="text"
              v-model="promocode"
              placeholder="Введите промокод"
            />
            <span class="error" v-if="error">Введен неверный промокод</span>
            <span class="success" v-if="success"
              >Промокод успешно активирован</span
            >
          </div>
        </div>
        <div class="col-xl-4">
          <button class="btn btn_black btn_promocode">Применить</button>
        </div>
      </div>
    </form>
    <div v-if="(error || !success) && (!error || success)">
      <p class="promo-text">Для получения промокода свяжитесь с нами</p>
      <a href="#">
        <img src="~/assets/images/whatsapp-black.svg" alt="" />
      </a>
      <a href="#">
        <img src="~/assets/images/phone.svg" alt="" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      promocode: "",
      error: false,
      success: false,
      codeData: null,
    };
  },
  methods: {
    checkPromocode() {
      this.error = false;
      this.success = false;
      this.$emit("code", null);
      if (this.promocode) {
        this.$axios
          .$post(`ckech-code?code=${this.promocode}`)
          .then((response) => {
            this.success = true;
            this.$emit("code", response);
          })
          .catch(({ response }) => {
            this.error = true;
            this.$emit("code", null);
          });
      }
    },
  },
};
</script>

<style scoped>
.promocode {
  margin: 10px 0;
}
.btn_promocode {
  padding: 12px 20px;
  width: 100%;
}
.promo-text {
  font-size: 14px;
  margin-bottom: 0;
  line-height: 19.5px;
}
.success {
  color: #2aab46;
}
</style>
