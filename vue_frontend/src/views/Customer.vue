<template>
  <div class="about">
    <h1>顧客訂單</h1>
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
          <template v-if="scope.row.status == 'WAIT_ACCEPT'">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
          <template v-else-if="scope.row.status == 'WAIT_DELIVER'">
            <el-button
              size="mini"
              type="success"
              @click="handleSuccess(scope.$index, scope.row)"
              >完成訂單</el-button
            >
          </template>
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
  },
  data: function() {
    return {
      tableData: []
    };
  },
  methods: {
    getOrderData() {
      this.axios.get("/customer/orders").then(res => {
        console.log(res);
        if (res.error_code !== 200) {
          this.$message.warning("先登入顧客帳戶在訪問！");
          this.$router.push("/home/login");
        }
        this.tableData = res.data;
      });
    },
    handleDelete(index, row) {
      console.log(row.id);
      console.log(row.status);
      if (row.status !== "WAIT_ACCEPT") {
        this.$message.warning("不可刪除");
        //   return
      }
      this.axios
        .delete("/customer/orders", {
          data: {
            order_id: row.id
          }
        })
        .then(res => {
          console.log(res);

          if (res.error_code === 200) {
            this.$message.success("刪除成功！");
            this.getOrderData();
          } else {
            this.$message.warning("刪除失敗");
          }
        });
    },
    handleSuccess(index, row) {
      console.log(row.id);
      console.log(row.status);
      if (row.status !== "WAIT_DELIVER") {
        this.$message.warning("不可完成");
        //   return
      }
      this.axios
        .put("/customer/orders", {
            order_id: row.id
        })
        .then(res => {
          console.log(res);

          if (res.error_code === 200) {
            this.$message.success("完成訂單！");
            this.getOrderData();
          } else {
            this.$message.warning("刪除失敗");
          }
        });
    }
  }
};
</script>
