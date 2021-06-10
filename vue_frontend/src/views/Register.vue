<template>
  <div class="register">
    <h2>姓名</h2>
    <el-input v-model="name" placeholder="請輸入姓名" class="input"></el-input>
    <h2>帳號</h2>
    <el-input v-model="email" placeholder="請輸入帳號" class="input"></el-input>
    <h2>密碼</h2>
    <el-input
      type="password"
      v-model="password"
      placeholder="請輸入密碼"
      class="input"
    ></el-input>
    <h2>註冊類型</h2>
    <el-select v-model="type" placeholder="请选择" class="select">
      <el-option
        v-for="item in typeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-button type="primary" @click="register">註冊</el-button>
  </div>
</template>

<script>
export default {
  name: "register",
  components: {},
  data: function() {
    return {
      email: "",
      password: "",
      type: "",
      name:"",
      typeOptions: [
        { label: "顧客", value: 1 },
        { label: "商家", value: 2 },
        { label: "外送員", value: 3 }
      ]
    };
  },
  methods: {
      register() {
          this.axios
        .post("/client/register", {
            "account":this.email,
            "name":this.name,
            "secret":this.password,
            "type":this.type
        }).then(res=>{
            console.log(res);
            if(res.error_code !== 200){
                this.$message.warning('註冊欄位有誤！')
            }else{
                this.$message.success('註冊成功!')
            }

        })
      }
  }
};
</script>
<style scoped>
.register{
    padding: 30px;
}
h2 {
  font-size: 24px;
  color: gray;
}
.input{
    margin-bottom: 10px ;
}
.select {
  margin-right: 30px;
}
</style>
