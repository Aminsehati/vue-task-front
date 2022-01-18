import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import TextField from "../../../components/TextField/indx.vue";
import "./style.css";
  <div class="users-add">
    <div class="container">
      <div class="row mb-3">
        <div class="col-md-4">
          <router-link to="/users/list" class="btn btn-primary">
            لیست کاربران
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-4 mb-2 mb-lg-0">
          <TextField placeholder="نام" v-model="userInfo.firstName" />
        </div>
        <div class="col-lg-3 col-md-4 mb-2 mb-lg-0">
          <TextField placeholder="نام خانوادگی" v-model="userInfo.lastName" />
        </div>
        <div class="col-lg-3 col-md-4 mb-2 mb-lg-0">
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
        <button class="btn btn-primary" @click="registerUser">
          اضافه کردن
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
      countryItems: [],
    };
  },
  mounted() {
    this.getCountryItems();
  },
  methods: {
    registerUser() {
      if (
        this.userInfo.firstName &&
        this.userInfo.lastName &&
        this.userInfo.dateBrithday
      ) {
        let users =
          (localStorage["users"] && JSON.parse(localStorage["users"])) || [];
        const imageCountry = this.countryItems.find(
          (item) => item.name.common === this.userInfo.country
        );
        this.userInfo.countryImage = imageCountry && imageCountry.flags.png;
        users.push({ ...this.userInfo, id: Date.now() });
        localStorage.setItem("users", JSON.stringify(users));
        this.$toast.success("با موفقیت ثبت شد");
        this.userInfo = {
          firstName: "",
          lastName: "",
          dateBrithday: "",
        };
        this.$router.push("/users/list");
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
        this.$toast.error("خطایی رخ داده است")
      }
    },
    changeCountry(e) {
      console.log(e.target);
    },
  },
};
</script>

<style></style>
