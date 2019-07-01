<template>
  <v-app>
    <v-layout row wrap>
      <snackbar v-if="snackbar_value" :text="errorText" :snackbar="snackbar_value"></snackbar>
      <v-flex md3></v-flex>
      <v-flex md6>
        <v-card dark color="red">
          <h1>Contest Create</h1>
        </v-card>
        <v-card>
          Select the number of questions in the quiz:
          <v-select :items="items" style="display: inline-block;" v-model="noOfQuestions"></v-select>
          <br>Enter the name of the quiz:
          <v-text-field required style="display: inline-block;" v-model="quizName"></v-text-field>

          <br>Enter the quiz start date:
          <v-dialog
            ref="dialog2"
            v-model="modal"
            :return-value.sync="date"
            persistent
            lazy
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field required v-model="date" readonly v-on="on" style="display: inline-block;"></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="changeStartDate()">OK</v-btn>
            </v-date-picker>
          </v-dialog>

          <br>Enter the quiz end date:
          <v-dialog
            ref="dialog4"
            v-model="modal4"
            :return-value.sync="date2"
            persistent
            lazy
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field required v-model="date2" readonly v-on="on" style="display: inline-block;"></v-text-field>
            </template>
            <v-date-picker v-model="date2" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="modal4 = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="changeEndDate()">OK</v-btn>
            </v-date-picker>
          </v-dialog>

          <br>Enter quiz start time:
          <v-dialog
            ref="dialog"
            v-model="modal2"
            :return-value.sync="time"
            persistent
            lazy
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field required v-model="time" v-on="on" style="display: inline-block;"></v-text-field>
            </template>
            <v-time-picker v-if="modal2" v-model="time" full-width>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="changeStartTime()">OK</v-btn>
            </v-time-picker>
          </v-dialog>

          <br>Enter quiz end time:
          <v-dialog
            ref="dialog3"
            v-model="modal3"
            :return-value.sync="time2"
            persistent
            lazy
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="time2" v-on="on" style="display: inline-block;"></v-text-field>
            </template>
            <v-time-picker v-if="modal3" v-model="time2" full-width>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="modal3 = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="changeEndTime()">OK</v-btn>
            </v-time-picker>
          </v-dialog>

          <br>Enter duration of the quiz
          <br>hours
          <v-text-field required
            style="display: inline-block;"
            v-model="durationHours"
            @change="changeDuration()"
          ></v-text-field>minutes
          <v-text-field required
            style="display: inline-block;"
            v-model="durationMinutes"
            @change="changeDuration()"
          ></v-text-field>
          <br>Chose the question category
          <v-select :items="temp" style="display: inline-block;" v-model="category"></v-select>
          <br>Choose contest type:
          <v-select
            :items="contestType"
            style="display: inline-block;"
            v-model="type"
            @change="typeChange()"
          ></v-select>
          <br>
          <v-btn @click="goToCreateQuiz">Continue</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import snackbar from "@/components/snackbar.vue";
import { exists } from "fs";
import { setTimeout } from "timers";
export default {
  name: "ContestCreate",
 
  data: () => ({
    date: null,
    date2: null,
    menu: false,
    modal: false,
    menu2: false,
    time: null,
    time2: null,
    modal2: false,
    modal3: false,
    modal4: false,
    items: ["10", "20"],
    categories: [],
    noOfQuestions: "",
    quizName: "",
    category: "",
    temp: [],
    type: "",
    dynamicContest: false,
    contestType: ["static", "dynamic"],
    startTime: 0,
    startDate: 0,
    endTime: 0,
    endDate: 0,
    durationHours: 0,
    durationMinutes: 0,
    duration: 0,
    snackbar_value: false,
    errorText: "",
     data :{
        contestName: null,
        questionId: [],
        startTime: null,
        endTime: null,
        durationOfContest: null,
        category: null,
        dynamicContest: null
      }
  }),

  methods: {
    ...mapActions(["getCategories1", "setCategories","setData"]),
    goToCreateQuiz() {
      
      this.data.durationOfContest=this.duration
      this.data.startTime= this.startTime+ this.startDate
      this.data.endTime= this.endTime + this.endDate
      this.data.dynamicContest=this.dynamicContest
      this.data.category=this.category
      this.data.noOfQuestions=this.noOfQuestions
      this.data.contestName=this.quizName

    if(this.date && this.date2 && this.time && this.time2 && this.noOfQuestions && this.quizName && this.category && this.type && (this.durationHours || this.durationMinutes))
        {
            this.$store.dispatch("setData",this.data)
            this.$router.push({name: 'createquiz', params:{'questionNo': this.data.noOfQuestions}}) 
        }
    },
    getCategoriesSuccess(res) {
      console.log(res.body);
      res.body.forEach(ele => {
        this.temp.push(ele.categoryName);
      });
      this.$store.dispatch("setCategories", res.body);
      this.categories = this.getCategoriesFromStore;
    },
    getCategoriesFailure(err) {
      console.log(err);
    },
    changeStartTime() {
      if (this.time != "")
      console.log("start Time")
        this.startTime = 0

      if (this.date === null || this.date2 === null) {
        this.errorText = "You must enter the Start and end dates first";
        this.snackbar_value = true;
        setTimeout(() => (this.snackbar_value = false), 3000);
      } else {
        this.$refs.dialog.save(this.time);
        console.log("start Time actual")
        var r =
          (Number(this.time.split(":")[0]) * 60 +
            Number(this.time.split(":")[1])) *
          60000;
        this.startTime = r;
        console.log(this.startTime);
      }
    },
    changeStartDate() {
      if (this.date != "") this.startDate = 0;
      this.$refs.dialog2.save(this.date);
      this.startDate = new Date(this.date).getTime();
      console.log(this.startDate , "startDate")
    },
    changeEndTime() {
      var create = document.getElementById("create");
      console.log("end Time")
      if (this.time2 != "")
        this.endTime = 0

      if (this.date === null || this.date2 === null) {
        this.errorText = "You must enter the Start and end dates first";
        this.snackbar_value = true;
        setTimeout(() => (this.snackbar_value = false), 3000);
      } else {
        this.$refs.dialog3.save(this.time2);
        if (this.date === this.date2 && this.time >= this.time2) {
          this.errorText =
            "If the start and end date is same, then end time cannot be before start time";
          this.snackbar_value = true;
          this.time2 = null;
          this.$refs.dialog3.save(this.time2);
        } else {
            console.log("end TIme Actual")
          var r =
            (Number(this.time2.split(":")[0]) * 60 +
              Number(this.time2.split(":")[1])) *
            60000;
          this.endTime = r;
          console.log(r);
        }
      }
    },
    changeEndDate() {
      var create = document.getElementById("create");
      if (this.date2 != "") {
          console.log("inside")
        this.endTime = 0;
      }
      this.$refs.dialog4.save(this.date2);
      if (this.date > this.date2) {
        this.errorText = "End date cannot be before start date";
        this.snackbar_value = true;
        setTimeout(() => (this.snackbar_value = false), 3000);
        this.date2 = null;
        console.log(this.date2);
        this.$refs.dialog4.save(this.date2);
      } else {
          let r = (new Date(this.date2)).getTime()
          console.log(this.endTime, "before")
          this.endDate = r
        // this.endTime = r;
        console.log(this.endDate , "endDate")
      }
    },
    typeChange() {
      if (this.type == "static") this.dynamicContest = false;
      else this.dynamicContest = true;
    },
    changeDuration() {
      this.duration =
        (Number(this.durationHours) * 60 + Number(this.durationMinutes)) *
        60000;
    }
  },
  computed: {
    ...mapGetters(["getCategoriesFromStore"])
  },
  created() {
    this.$store.dispatch("getCategories1", {
      url: "http://172.16.26.38:8080/categoryManagement/getCategories",
      success: this.getCategoriesSuccess,
      failure: this.getCategoriesFailure
    });
  },
  components: {
    snackbar
  }
};
</script>

<style scoped>
.v-select,
.v-text-field,
.v-input,
.v-input__slot {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
