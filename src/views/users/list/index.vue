<template>
  <div class="list-user pt-4">
    <div class="container">
      <div class="row mb-3">
        <div class="col-md-4">
          <router-link to="/users/add" class="btn btn-primary">
            اضافه کردن کاربر
          </router-link>
        </div>
      </div>
      <Table
        :tableItems="tableItems"
        :tableHeader="tableHeader"
        @removeUserItem="removeUserItem"
      />
    </div>
  </div>
</template>

<script>
import Table from "../../../components/Table";
export default {
  components: {
    Table,
  },
  data() {
    return {
      tableHeader: [
        {
          id: 1,
          name: "ردیف",
        },
        {
          id: 2,
          name: "نام",
        },
        {
          id: 3,
          name: "نام خانوادگی",
        },
        {
          id: 4,
          name: "تاریخ تولد",
        },
        {
          id: 5,
          name: "کشور",
        },
        {
          id: 6,
          name: "سن",
        },
        {
          id: 7,
          name: "عملیات",
        },
      ],
      tableItems: [],
    };
  },
  mounted() {
    this.getUserItems();
  },
  methods: {
    getUserItems() {
      const usersStorage =
        (localStorage["users"] && JSON.parse(localStorage["users"])) || [];
      this.tableItems = usersStorage;
    },
    removeUserItem(id) {
      const userItem = this.tableItems.findIndex((item) => item.id === id);
      this.tableItems.splice(userItem, 1);
      localStorage.setItem("users", JSON.stringify(this.tableItems));
    },
  },
};
</script>

<style></style>
