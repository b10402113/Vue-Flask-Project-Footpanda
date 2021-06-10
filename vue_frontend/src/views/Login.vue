<template>
  <div class="login">
    <h2>帳號</h2>
    <el-input v-model="email" placeholder="請輸入帳號"></el-input>
    <h2>密碼</h2>
    <el-input
      type="password"
      v-model="password"
      placeholder="請輸入密碼"
    ></el-input>
    <h2>登入類型</h2>
    <el-select v-model="type" placeholder="请选择" class="select">
      <el-option
        v-for="item in typeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-button type="primary" @click="login">登入</el-button>
  </div>
</template>

<script>
import cookie from 'js-cookie'
export default {
  name: "login",
  components: {},
  data: function() {
    return {
      email: "dsajlflsadf@gmail.com",
      password: "1235",
      type: 2,
      typeOptions: [
        { label: "顧客", value: 1 },
        { label: "商家", value: 2 },
        { label: "外送員", value: 3 }
      ]
    };
  },
  methods: {
    login() {
      this.axios
        .post("/token", {
          account: this.email,
          secret: this.password,
          type: this.type
        })
        .then(res => {
          console.log(res);
          console.log(res.error_code);
          if (res.error_code !== 200) {
              this.$message.warning('登入失敗')
              return;
          }
          cookie.set("user_token", res.data.token, 1);
          this.$message.success('登入成功')
        //   this.test()
        });
    },
    test() {
      console.log(cookie.get("user_token"));
      this.axios.get("/store/product").then(res => {
        console.log(res)
      });
    }
  }
};
</script>
<style scoped>
h2 {
  font-size: 24px;
  color: gray;
}
.select {
  margin-right: 30px;
}
</style>
