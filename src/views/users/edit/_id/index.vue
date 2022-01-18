<template>
  <div class="update-user pt-3">
    <div class="container">
      <div class="user-not-found" v-if="error">
        {{ error }}
      </div>
      <div v-else>
        <div class="row mb-3">
          <div class="col-md-3">
            <router-link to="/users/list" class="btn btn-primary d-block">
              لیست کاربران
            </router-link>
          </div>
          <div class="col-md-3">
            <router-link to="/users/add" class="btn btn-primary d-block">
              کاربر جدید
            </router-link>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-4 mb-2">
            <TextField placeholder="نام" v-model="userInfo.firstName" />
          </div>
          <div class="col-lg-3 col-md-4 mb-lg-0 mb-2">
            <TextField placeholder="نام خانوادگی" v-model="userInfo.lastName" />
          </div>
          <div class="col-lg-3 col-md-4 mb-2 v">
            <date-picker
              v-model="userInfo.dateBrithday"
              format="YYYY-MM-DD"
              display-format="jYYYY-jMM-jDD"
              placeholder="تاریخ تولد"
            />
          </div>
          <div class="col-lg-3 col-md-4 mb-2 mb-lg-0">
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="userInfo.country"
            >
              <option v-for="(country, index) in countryItems" :key="index">
                {{ country.name.common }}
              </option>
            </select>
          </div>
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-primary" @click="updateUserInfo">
            ویرایش
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "./style.css";
import TextField from "../../../../components/TextField/indx.vue";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
export default {
  components: {
    TextField,
    datePicker: VuePersianDatetimePicker,
  },
  data() {
    return {
      userInfo: {
        firstName: "",
        lastName: "",
        dateBrithday: "",
        country: "",
        countryImage: "",
      },
      error: "",
      countryItems: [],
    };
  },
  mounted() {
    this.getUserInfo();
    this.getCountryItems();
  },
  methods: {
    getUserInfo() {
      try {
        const userStorage =
          (localStorage["users"] && JSON.parse(localStorage["users"])) || [];
        const { id } = this.$route.params;
        const userItem = userStorage.find(
          (item) => Number(item.id) === Number(id)
        );
        if (userItem) {
          this.userInfo = {
            firstName: userItem?.firstName,
            lastName: userItem?.lastName,
            dateBrithday: userItem?.dateBrithday,
            country: userItem?.country,
          };
          console.log(userItem);
        } else {
          this.error = "کاربر یافت نشد";
        }
      } catch (error) {
        this.$toast.error("خطایی رخ داده است");
      }
    },
    updateUserInfo() {
      let userStorage =
        (localStorage["users"] && JSON.parse(localStorage["users"])) || [];
      const { id } = this.$route.params;
      const indexUser = userStorage.findIndex(
        (item) => Number(item.id) === Number(id)
      );
      if (indexUser > -1) {
        const imageCountry = this.countryItems.find(
          (item) => item.name.common === this.userInfo.country
        );
        this.userInfo.countryImage = imageCountry.flags.png;
        userStorage[indexUser].firstName = this.userInfo.firstName;
        userStorage[indexUser].lastName = this.userInfo.lastName;
        userStorage[indexUser].dateBrithday = this.userInfo.dateBrithday;
        userStorage[indexUser].country = this.userInfo.country;
        userStorage[indexUser].countryImage = this.userInfo.countryImage;
        localStorage.setItem("users", JSON.stringify(userStorage));
        this.$toast.success("با موفقیت آپدیت شد");
      }
    },
    async getCountryItems() {
      try {
        const httpResponse = await fetch(
          "https://restcountries.com/v3.1/region/asia"
        );
        const data = await httpResponse.json();
        this.countryItems = data;
      } catch (error) {
        this.$toast.error("خطایی رخ داده است");
      }
    },
  },
};
</script>
