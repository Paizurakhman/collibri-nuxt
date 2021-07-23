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
  head: {
    title: localStorage.getItem("lang") === 'en'? 'Send email | collibri': 'письмо с потверждением | collibri'
  },
}
</script>

<style scoped>

</style>
