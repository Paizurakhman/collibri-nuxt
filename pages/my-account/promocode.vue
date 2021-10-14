<template>
  <div class="ordering_form mt-0">
    <div class="row">
      <div class="col-xl-6">
        <div class="copy-promocode">
          <input
            type="text"
            v-model="promocode"
            readonly
            @focus="$event.target.select()"
            ref="myinput"
          />
          <i class="far fa-clone" @click="copy"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      promocode: null,
    };
  },
  methods: {
    copy() {
      this.$refs.myinput.focus();
      document.execCommand("copy");
    },
  },
  mounted() {
    this.$axios
      .$post("user-promocode", {
        token: this.$cookies.get("userToken"),
      })
      .then((res) => {
        this.promocode = res.promocode;
      });
  },
};
</script>

<style scoped>
.copy-promocode {
  display: flex;
  align-items: center;
  position: relative;
}
.copy-promocode i {
  cursor: pointer;
  position: absolute;
  right: 20px;
  font-size: 18px;
}
.copy-promocode i:hover {
  color: #00c3ff;
}
</style>
