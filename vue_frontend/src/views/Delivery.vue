<template>
  <div class="delivery">
    <!-- <h1>外送員專區</h1> -->
    <h1 style="margin:30px 0;">待提取訂單</h1>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="訂單編號" width="180">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column prop="customer_name" label="買家姓名"></el-table-column>
      <el-table-column prop="store_name" label="賣家店名"></el-table-column>
      <el-table-column prop="address" label="買家住址"></el-table-column>
      <el-table-column label="訂單價格" width="180">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column label="訂單狀態" width="180">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleCatch(scope.$index, scope.row)"
            >接單</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <h1 style="margin:30px 0;">已接訂單</h1>

    <el-table :data="catchOrderList" style="width: 100%" class="orderList">
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="訂單編號" width="180">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="訂單價格" width="100">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column label="訂單狀態">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column prop="store_name" label="賣家店名"></el-table-column>
      <el-table-column prop="address" label="買家住址"></el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.status === 'WAIT_ACCEPT'"></div>
          <el-button
            size="mini"
            type="danger"
            @click="orderConfirm(scope.row.id)"
            >確認訂單</el-button
          >
        </template>
      </el-table-column> -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table
            :data="scope.row.products"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column
              prop="product_name"
              label="產品名稱"
            ></el-table-column>

            <el-table-column prop="count" label="數量"></el-table-column>
            <el-table-column prop="amount" label="總價格"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "about",
  components: {},
  created() {
    this.getOrderData();
    this.getCatchOrders();
  },
  data: function() {
    return {
      tableData: [],
      catchOrderList: []
    };
  },
  methods: {
    getOrderData() {
      this.axios.get("/delivery/orders").then(res => {
        console.log(res);
        if (res.error_code !== 200) {
          this.$message.warning("先登入外送員帳戶在訪問！");
          this.$router.push("/home/login");
        }
        this.tableData = res.list;
      });
    },
    getCatchOrders() {
      this.axios.get("/delivery/delivery_orders").then(res => {
        console.log(res);
        if (res.error_code !== 200) {
          this.$message.warning("先登入外送員帳戶在訪問！");
          this.$router.push("/home/login");
        }
        this.catchOrderList = res.list;
      });
    },
    handleCatch(index, row) {
      this.axios
        .put("/delivery/orders", {
          order_id: row.id
        })
        .then(res => {
          console.log(res);

          if (res.error_code === 200) {
            this.$message.success("接單成功");
            this.getOrderData();
            this.getCatchOrders();
          }
        });
    }
  }
};
</script>
