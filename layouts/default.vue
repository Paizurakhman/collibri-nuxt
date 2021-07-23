<template>
  <div>
    <layout-header />
    <div class="loader_wrapper" v-if="loader === false">
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
    <div v-else>
      <Nuxt />
    </div>
    <layout-footer />
  </div>
</template>

<script>
export default {
  name: "default",
  data () {
    return {
      loader: true,
    }
  },
  mounted() {
    // localStorage.setItem("lang", "ru")
    if (
      this.$cookies.isKey("userToken") &&
      document.location.pathname === "/login"
    ) {
      this.$router.push("/my-account");
    }
    if (this.$cookies.get("userToken") == null &&
      document.location.pathname === "/my-account"
    ) {
      this.$router.push({ name: 'auth-login' });
    }

    setTimeout(() => {
      this.loader = true;
    }, 500);
  },


  watch: {
    $route(to, from) {
      if (this.$cookies.get("token_time") !== null) {
        let date = new Date() - new Date(this.$cookies.get("token_time"));
        let minute = date / 60000;
        if (minute > 25 && minute < 30) {
          this.$axios
            .post('refresh', {
              token: this.$cookies.get("userToken"),
            })
            .then((response) => {
              const userToken = response.data.token;

              this.$cookies.set("userToken", userToken, 18000);
              this.$cookies.set("token_time", new Date(), 18000);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        if (minute > 30) {
          this.$cookies.remove("userToken");
          this.$cookies.remove("userId");
          this.$cookies.remove("token_time");
          this.$router.push({ name: 'auth-login' });
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
