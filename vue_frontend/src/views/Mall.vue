<template>
  <div class="mall">
    <h1>商城專區</h1>
    <el-row class="search-field">
      <el-col :span="10">
        <el-input
          v-model="storeText"
          placeholder="查找商店"
          :inline="true"
          class="input"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" class="button" @click="searchStore">查找商店</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="6"
        v-for="item in storelist"
        :key="item.id"
        class="storeItem"
      >
        <el-card>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px;">
            <span>{{ item.name }}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="enterStore(item.id)">進入商品</el-button>
            </div>
          </div>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data: function() {
    return {
      storelist: [],
      storeText: ""
    };
  },
  mounted() {
    this.getStore();
  },
  methods: {
    getStore() {
      this.axios.get("/store/all").then(res => {
        console.log(res);
        this.storelist = res.data.list;
        console.log(this.storelist);
      });
    },
    searchStore(){
      if(this.storeText.trim() == ""){
        this.storeText = 'all'
      }
      this.axios.get(`/store/${this.storeText}`).then(res => {
        console.log(res);
        this.storelist = res.data.list;
        console.log(this.storelist);
        this.storeText = ''
      });
    },
    enterStore(id){
        this.$router.push(`/home/mall/${id}`)
    }
  }
};
</script>
<style scoped>
.search-field {
    margin-bottom: 20px;
}
.search-field .button{
    margin-left: 20px;
}
.mall {
  padding: 30px;
}
h2 {
  font-size: 24px;
  color: gray;
}
h1 {
  margin-bottom: 20px;
}
.select {
  margin-right: 30px;
}
.storeItem {
  margin-right: 30px;
}
</style>
