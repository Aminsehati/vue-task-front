<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="item in tableHeader" :key="item.id" scope="col">
          {{ item.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(table, index) in tableItems" :key="table.id">
        <th scope="row">
          {{ index + 1 }}
        </th>
        <th>
          {{ table.firstName }}
        </th>
        <th>
          {{ table.lastName }}
        </th>
        <th>
          {{ convertDate(table.dateBrithday) }}
        </th>
        <th>
          <img
            :src="table.countryImage"
            width="50"
            height="50"
            style="object-fit: contain"
            :title="table.country"
          />
        </th>
        <th>
          {{ ageUser(table.dateBrithday) }}
        </th>
        <th>
          <router-link :to="`/users/list/${table.id}`"> ویرایش </router-link>
          <span @click="removeUserItem(table.id)"> حذف </span>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script>
import moment from "jalali-moment";
export default {
  props: {
    tableItems: {
      type: Array,
      default: [],
    },
    tableHeader: {
      type: Array,
      default: [],
    },
  },
  methods: {
    removeUserItem(id) {
      this.$emit("removeUserItem", id);
    },
    convertDate(date) {
      return moment(date, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD");
    },
    ageUser(date) {
      const dateBridthday = moment(date, "YYYY/MM/DD")
        .locale("fa")
        .format("YYYY");
      const dataNow = moment(new Date(), "YYYY/M/D").format("jYYYY");
      return dataNow - dateBridthday;
    },
  },
};
</script>

<style></style>
