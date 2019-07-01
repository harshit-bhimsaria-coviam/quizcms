<template>
  <v-app>
    <v-layout row wrap justify-center>
      <v-layout class="title" justify-center align-center>
        <h1 class="headline">Your Quiz has been successfully submitted</h1>
      </v-layout>
      <!-- 'Math.floor(Math.random() * gifs.length)' -->
      <img class="gif" src="https://media.giphy.com/media/8fen5LSZcHQ5O/giphy.gif">
      <v-card-text class="headline">Your Score : {{getScoreFromStore}}</v-card-text>
      <v-card-text>
        <h4>Explore similar quizzes:</h4>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn color="green darken-1" flat @click="dialog = false">Disagree</v-btn> -->
        <v-btn color="green darken-1" @click="dialog = false">Back to Home</v-btn>
      </v-card-actions>
    </v-layout>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: "QuizFinish",
  data() {
    return {
      dialog: false
      //   imgsrc:"https://media.giphy.com/media/8fen5LSZcHQ5O/giphy.gif",
      //   gifs:['https://media.giphy.com/media/8fen5LSZcHQ5O/giphy.gif','https://media3.giphy.com/media/26BRBKqUiq586bRVm/giphy.gif']
    };
  },
  computed: {
    ...mapGetters(['getScoreFromStore'])
  }
};
</script>
<style scoped>
.gif {
  height: 250px;
  margin: 4px;
}
.title {
  background-color: rgb(6, 150, 150);
  width: 100%;
}
</style>