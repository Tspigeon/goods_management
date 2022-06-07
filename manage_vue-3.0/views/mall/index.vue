<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateFrom"
        :inline="true"
        ref="form"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">新增</el-button>
      <common-form
        class="input"
        :formLabel="formLabel"
        :form="searchFrom"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchFrom.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="deleteUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "../../src/components/CommonForm.vue";
import CommonTable from "../../src/components/CommonTable.vue";

export default {
  components: { CommonForm, CommonTable },
  name: 'Mall_show',
  component: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "品牌",
          type: "input",
        },
        {
          model: "age",
          label: "型号",
          type: "input",
        },
        {
          model: "sex",
          label: "是否包邮",
          type: "input",
        },
        {
          model: "birth",
          label: "发售日期",
          type: "date",
        },
        {
          model: "addr",
          label: "价格",
          type: "input",
        },
      ],
      operateFrom: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchFrom: {
        keyword: "",
      },
      tableData: [
        {
          name: "华为",
          age: "mate 40",
          sex: "是",
          birth: "2021-06-17",
          addr: "5399",
        },
        {
          name: "小米",
          age: "12",
          sex: "否",
          birth: "2021-12-28",
          addr: "3499",
        },
        {
          name: "苹果",
          age: "iPhone 13",
          sex: "是",
          birth: "2021-09-16",
          addr: "5999",
        },
      ],
      tableLabel: [
        {
          prop: "name",
          label: "品牌",
        },
        {
          prop: "age",
          label: "型号",
        },
        {
          prop: "sex",
          label: "是否包邮",
        },
        {
          prop: "birth",
          label: "发售日期",
          with: 200,
        },
        {
          prop: "addr",
          label: "价格",
          width: 120,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  methods: {
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/user/edit", this.operateFrom).then((res) => {
          console.log(res);
          this.isShow = false;
        });
      } else {
        this.$http.post("/user/edit", this.operateFrom).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateFrom = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    //生成表单
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
    },
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateFrom = row;
    },
    deleteUser(row) {
      this.$confirm("此操作将永久删除该组件,是否继续?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .get("user/del", {
            parma: { id },
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          });
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>