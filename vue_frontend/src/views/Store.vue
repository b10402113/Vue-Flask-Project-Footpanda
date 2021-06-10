<template>
  <div class="store">
    <h1>商品管理</h1>
    <el-button type="primary" @click="handleAddButton"
      >新增產品</el-button
    >
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="商品名稱" width="120">
      </el-table-column>
      <el-table-column prop="price" label="商品價格" width="120">
      </el-table-column>
      <el-table-column prop="category" label="商品類別"> </el-table-column>
      <el-table-column label="商品圖片">
        <template slot-scope="scope" width="120">
          <el-image
            :src="
              `http://192.168.1.102:5000/v1/store/product_img/${scope.row.id}`
            "
            style="width: 200px; height: 200px"
          />
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="small"
            >編輯</el-button
          >
          <el-button type="danger" size="small" @click="handleDelete(scope.row)"
            >刪除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <h1>訂單管理</h1>
    <el-table :data="orderList" style="width: 100%" class="orderList">
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
          <div v-if="scope.row.status === 'WAIT_ACCEPT'"></div>
          <el-button
            size="mini"
            type="success"
            @click="orderConfirm(scope.row.id)"
            >確認訂單</el-button
          >
        </template>
      </el-table-column>
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

    <el-dialog title="添加商品" :visible.sync="addFormVisible">
      <div class="dialog">
        <el-input
          v-model="addForm.name"
          placeholder="Input the name"
          class="product-input"
        ></el-input>
        <el-input
          v-model="addForm.price"
          placeholder="Input the price"
          class="product-input"
        ></el-input>
        <el-input
          v-model="addForm.category"
          placeholder="Input the category"
          class="product-input"
        ></el-input>
        <input type="file" accept="image/*" @change="previewImage" />
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProduct">添加產品</el-button>
      </div>
    </el-dialog>

    <el-dialog title="編輯" :visible.sync="editFormVisible">
      <div class="dialog">
        <el-input
          v-model="editForm.name"
          placeholder="请输入名稱"
          class="product-input"
        ></el-input>
        <el-input
          v-model="editForm.price"
          placeholder="请输入内容"
          class="product-input"
        ></el-input>
        <el-input
          v-model="editForm.category"
          placeholder="请输入内容"
          class="product-input"
        ></el-input>
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editProduct">保存產品</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "store",
  data() {
    return {
      productList: [],
      addFormVisible: false,
      editFormVisible: false,
      addForm: {
        name: "",
        price: 0,
        category: "",
        image: ""
      },
      editForm: {
        name: "",
        price: 0,
        category: "",
        id: 0
      },
      tableData: [],
      orderList: []
    };
  },
  mounted() {
    this.getProductList();
    this.getOrderList();
  },
  methods: {
    handleAddButton() {
      this.addFormVisible = true
      this.addForm.name = ''
      this.addForm.price = 0
      this.addForm.category = ''
      this.addForm.image = ''
    },
    getProductList() {
      this.axios.get("/store/product").then(res => {
        console.log(res);
        if (res.error_code !== 200) {
          this.$message("請先登入");
          this.$router.push("/home/login");
        }
        this.tableData = res.data.list;
      });
    },
    getOrderList() {
      this.axios.get("/store/orders").then(res => {
        console.log(res);
        // if (res.error_code !== 200) {
        //   this.$message.warning("先登入顧客帳戶在訪問！");
        //   this.$router.push("/home/login");
        // }
        this.orderList = res.data;
      });
    },
    previewImage(event) {
      var input = event.target;
      if (input.files) {
        // var reader = new FileReader();
        // reader.onload = (e) => {
        //   this.preview = e.target.result;
        // }
        this.addForm.image = input.files[0];
        console.log(this.addForm);
        // reader.readAsDataURL(input.files[0]);
        // console.log(input.files);
      }
    },

    addProduct() {
      
      let param = new FormData();
      param.append("name", this.addForm.name);
      param.append("price", this.addForm.price);
      param.append("category", this.addForm.category);
      param.append("img", this.addForm.image);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      this.axios.post("/store/product", param, config).then(res => {
        if (res.error_code !== 200) {
          this.$message.warning("添加失敗");
        }
        this.$message.success("添加成功");
        this.getProductList()
        this.addFormVisible = false;
      });
    },
    orderConfirm(id) {
      console.log(id);
      this.axios
        .put("/store/orders", {
          order_id: id
        })
        .then(res => {
          console.log(res);
          this.getOrderList();
        });
    },
    handleDelete(item){
      this.axios.delete("/store/product",{
        data:{
          id:item.id
        }
      }).then(res => {
        console.log(res);
        if (res.error_code == 200) {
          this.$message.success('刪除成功')
          this.getProductList()
        }
      })
    },
    handleEdit(item) {
      console.log(item);
      this.editFormVisible = true;
      this.editForm.name = item.name;
      this.editForm.price = item.price;
      this.editForm.category = item.category;
      this.editForm.id = item.id;
    },
    editProduct() {
      console.log(this.editForm);
      let param = new FormData();
      param.append("name", this.editForm.name);
      param.append("price", this.editForm.price);
      param.append("category", this.editForm.category);
      param.append("id", this.editForm.id);
      console.log(param);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      this.axios.put("/store/product", param, config).then(res => {
        console.log(res);
        if (res.error_code !== 200) {
          this.$message.warning("修改失敗");
          this.editFormVisible = false;

          return;
        }
        this.$message.success("修改成功");
        this.editFormVisible = false;
        this.getProductList();
      });
    }
  }
};
</script>
<style scoped>
.dialog .product-input {
  margin-bottom: 10px;
}
.orderList {
  margin-bottom: 30px;
}
</style>
