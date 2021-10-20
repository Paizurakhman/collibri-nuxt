<template>
  <div class="status_card">
    <div class="status_card_content">
      <div class="email_status">
        <p>На вашу почту придет письмо с потверждением. Пожалуйста перейдите по ссылке для восстановления пароля</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SendEmailStatus",
  data() {
    return {
      lang: "ru"
    }
  },
  head() {
    return {
      title: this.lang === 'en'? 'Send email | collibri': 'Письмо с потверждением | collibri'
    }
  },
  mounted() {
    this.lang = localStorage.getItem("lang") || "ru"
  }
}
</script>

<style scoped>

</style>
