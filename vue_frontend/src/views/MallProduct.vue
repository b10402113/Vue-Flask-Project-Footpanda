<template>
  <div class="mall">
    <h1>商城專區</h1>
    <el-row class="search-field">
      <el-col :span="10">
        <el-input
          v-model="categoryText"
          placeholder="查找類別"
          :inline="true"
          class="input"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" class="button" @click="searchCategory"
          >查找類別</el-button
        >
      </el-col>
    </el-row>
    <div class="productList">
      <el-row>
        <el-col
          :span="8"
          class="product"
          v-for="item in productList"
          :key="item.id"
        >
          <el-image
            style="width: 300px; height: 300px"
            :src="item.imgSrc"
          ></el-image>
          <ul>
            <li>名稱：{{ item.name }}</li>
            <li>價錢：{{ item.price }}</li>
            <li>類別：{{ item.category }}</li>
            <li>
              <el-button
                type="primary"
                style="margin-right:10px;"
                @click="modifyCount(item, 'sub')"
                >-</el-button
              >{{ item.count }}
              <el-button type="primary" @click="modifyCount(item, 'add')"
                >+</el-button
              >
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <el-input v-model="customer_address" placeholder="輸入住址"></el-input>
    <el-button type="primary" @click="submitOrder">提交訂單</el-button>
  </div>
</template>

<script>
export default {
  name: "mallproduct",
  props: ["id"],
  components: {},
  data: function() {
    return {
      storeId: 0,
      productList: [],
      imgSrc: "",
      orderSubmit: [],
      categoryText: "",
      customer_address: ""
    };
  },
  mounted() {
    this.getStoreProduct();
  },
  methods: {
    getStoreProduct() {
      this.storeId = this.$route.params.id;
      this.axios.get(`/store/product/${this.storeId}`).then(res => {
        res.data.list.forEach(item => {
          item.count = 0;
          item.imgSrc = `http://192.168.1.102:5000/v1/store/product_img/${item.id}`;
        });
        this.productList = res.data.list;
        console.log(this.productList);
      });
    },
    modifyCount(item, type) {
      if (type == "add") {
        // alert("add");
        item.count += 1;
      } else {
        if (item.count > 0) {
          item.count--;
        }
      }
    },
    searchCategory() {
      // this.categoryText
      let url = `/store/product/${this.storeId}/${this.categoryText}`;
      if (this.categoryText.trim() == "") {
        url = `/store/product/${this.storeId}`;
      }
      this.axios.get(url).then(res => {
        res.data.list.forEach(item => {
          item.count = 0;
          item.imgSrc = `http://192.168.1.102:5000/v1/store/product_img/${item.id}`;
        });
        this.productList = res.data.list;
      });
    },
    submitOrder() {
      console.log(this.productList);
      this.orderSubmit = [];
      this.productList.forEach(item => {
        if (item.count > 0) {
          this.orderSubmit.push({
            id: item.id,
            count: item.count
          });
        }
      });
      console.log(this.orderSubmit);
      if (this.orderSubmit.length == 0 || !this.customer_address) {
        this.$message.warning("商品或住址有誤");
        return;
      }
      this.axios
        .post("/customer/orders", {
          sid: this.storeId,
          products: this.orderSubmit,
          customer_address: this.customer_address
        })
        .then(res => {
          console.log(res);
          this.$message.success("訂單創建成功！");
          this.$router.push("/home/customer");
        });
    }
  }
};
</script>
<style scoped>
.search-field {
  margin-bottom: 20px;
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

.product {
  /* margin-right: 30px; */
  padding-right: 20px;
}
.product ul li {
  font-size: 24px;
  list-style: none;
  text-decoration: none;
  margin: 0;
  padding: 0;
  text-align: center;
}
.product ul {
  padding: 0;
}
.product .primary {
  margin-left: 0;
}
</style>
