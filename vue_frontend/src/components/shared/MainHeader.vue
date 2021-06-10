<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Footpanda</b-navbar-brand>

      <b-navbar-nav class="navbar-nav mr-auto">
        <router-link to="/home/mall" class="nav-link">商城專區</router-link>
        <router-link to="/delivery" class="nav-link">外送員專區</router-link>
        <router-link to="/store" class="nav-link">店家專區</router-link>
        <router-link to="/home/customer" class="nav-link">顧客專區</router-link>
      </b-navbar-nav>

      <b-navbar-nav>
        <div v-if="isLogin">
          <div class="nav-link" @click="logout">登出</div>
        </div>
        <template v-else>
          <router-link to="/home/login" class="nav-link">登入</router-link>
          <router-link to="/home/register" class="nav-link">註冊</router-link>
        </template>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import cookie from 'js-cookie'
export default {
  name: "main-header",
  components: {
    // HelloWorld
  },
  data: function() {
    return {
      isLogin: false
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      console.log();
      if(cookie.get("user_token")){
          this.isLogin = true;
      }
    },
    logout() {
        cookie.remove("user_token")
    }
  },
  computed: {
    displayYMD() {
      return new Date().getFullYear().toString();
    }
  },
  beforeCreate: function() {},
  created: function() {},
  beforeMount: function() {},

  beforeUpdate: function() {},
  updated: function() {},
  activated: function() {},
  deactivated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
  errorCaptured: function() {}
};
</script>

<style scoped></style>
