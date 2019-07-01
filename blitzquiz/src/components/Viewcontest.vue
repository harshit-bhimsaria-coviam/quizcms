<template>
  <v-app>
    <v-container grid-list-md>
      <v-layout row wrap justify-center>
        <v-data-table :items="getAllContestsData" class="elevation-1" hide-actions>
          <template v-slot:headers="props">
            <tr>
              <th v-for="header in headers" :key="header.text">{{ header.text }}</th>
            </tr>
          </template>
          <template v-slot:items="props">
            <tr>
              <td>{{ props.item.contestName }}</td>
              <td>{{ props.item.category }}</td>
              <td>{{ props.item.questionId.length }}</td>
              <td>{{ (new Date(props.item.startTime).toLocaleTimeString()) }} ,{{ (new Date(props.item.startTime).toDateString()) }}</td>
              <td>{{ (new Date(props.item.endTime).toLocaleTimeString()) }} ,{{ (new Date(props.item.endTime).toDateString()) }}</td>
              <td>{{ getDuration(props.item) }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-layout>
      <v-layout justify-center>
        <v-btn dark @click="refresh()">Refresh</v-btn>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Viewcontest",
  data() {
    return {
      headers: [
        { text: "Contest Name", value: "Contest Name" },
        { text: "Category", value: "category" },
        { text: "No. of Questions", value: "questions" },
        { text: "Start Time", value: "stime" },
        { text: "End Time", value: "etime" },
        { text: "Duration", value: "duration" }
      ]
    };
  },
  methods: {
    ...mapActions(["getAllContests"]),
    getDuration(item) {
      let hours = new Date(item.durationOfContest).getHours();
      console.log(item.durationOfContest);
      let minutes = new Date(item.durationOfContest).getMinutes();
      console.log(minutes);
      minutes = minutes + 60;
      hours = hours - 1;
      minutes -= 30;
      if (minutes > 60) {
        minutes -= 60;
        hours += 1;
      }
      hours -= 5;
      if (minutes == 60) {
        minutes = 0;
        hours += 1;
      }
      if (hours > 0 && minutes > 0)
        return hours + " hours : " + minutes + " minutes";
      else if (hours > 0) return hours + " hours";
      else return minutes + " minutes";
    },
    refresh(){
      this.$store.dispatch("getAllContests");
      this.$forceUpdate()
    }
  },
  computed: {
    ...mapGetters(["getAllContestsData"])
  },
  created() {
    this.$store.dispatch("getAllContests");
  }
};
</script>

<style scoped>
</style>
