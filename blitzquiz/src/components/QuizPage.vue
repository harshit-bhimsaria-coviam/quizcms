<template>
  <v-app id="quiz">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 0" :step="0">Start</v-stepper-step>
        <div v-for="item in array" v-bind:key="item">
          <v-stepper-step :complete="e1 > item+1" :step="item+1"></v-stepper-step>
          <v-divider></v-divider>
        </div>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-btn @click="openFullscreen()">Start</v-btn>
        </v-stepper-content>
        <v-stepper-content v-for="(question,i) in questions" v-bind:key="i" :step="i+2">
          <v-card class="mb-5" color="lighten-1" height="auto">
            <h2>{{question.questionText}}</h2>

            <v-img
              class="image"
              contain
              :src="question.resourceUrl"
              v-if="question.questionType=='Image'"
            ></v-img>
            <!-- <iframe
              class="videolist"
              width="300"
              height="100%"
              src
              frameborder="0"
              allow="accelerometer; autoplay;  gyroscope;"
              allowfullscreen
            ></iframe>-->
            <audio
              controls
              class="audio"
              v-if="question.questionType=='Audio' || question.questionType=='voice'"
            >
              jnfhjklsnbdfnbkd
              <source :src="question.resourceUrl">
            </audio>
            <v-list subheader>
              <v-list-tile avatar @click="selectOption(j)" v-for="(answer,j) in question.answers" :key="j">
                <v-list-tile-action>
                  <v-icon :color="active[j] ? 'blue' : 'grey'">fiber_manual_record</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{answer}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
          <v-btn flat @click="skipQuestion(question.id)">Skip Question</v-btn>
          <v-btn v-if="btnvar" color="primary" @click="nextQuestion(question.id)">Next question</v-btn>

          <v-btn color="primary" v-if="!btnvar" @click="submit(question.id)">Submit</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-app>
</template>
<script>
import QuizFinish from "@/components/QuizFinish.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "QuizPage",
  components: {
    QuizFinish
  },
  data() {
    return {
      e1: 0,
      array: [],
      dialog: false,
      optionSelected: "",
      btnvar: true,
      contest: {},
      questions: [],
      active: [false, false, false, false],
      option: ["A", "B", "C", "D"],
      state: {
        userId: '5fcd0eb6-9bbb-420e-a561-6548b9286163',
        contestName: 'xxx',
        contestId: '5d1491eec9558f930783a581',
        response: {}
      },
      storedState: {},
      contestId: "5d1491eec9558f930783a581"
    };
  },
  methods: {
    ...mapActions(["getContest",'sendQuizState','getQuizState']),
    selectOption(i) {
        this.active = this.active.map(state => false);
        this.optionSelected = this.option[i];
        this.active[i] = true;
    },
    openFullscreen() {
      var elem = document.documentElement;
      this.e1++;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    },
    closeFullscreen() {
      var elem = document.documentElement;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
    },
    nextQuestion(i) {
      var sounds = document.getElementsByTagName('audio');
      let j=0;
      for(j=0; j<sounds.length; j++) sounds[j].pause();
      console.log(this.optionSelected)
      console.log(this.storedState)
      if(this.e1===2)
        this.storedState.response = {}
      this.storedState.response[i]=this.optionSelected
       this.active = this.active.map(storedState => false);
      if (this.e1 < this.array.length) {
        this.e1++;
      } else {
        this.e1++;
        this.btnvar = false;
        //route to quiz completed page
      }
    },
    skipQuestion(id) {
      var sounds = document.getElementsByTagName('audio');
      let j=0;
      for(j=0; j<sounds.length; j++) sounds[j].pause();
      this.storedState.response[id]=""
      this.e1++
    },
    saveScoreSuccess(res) {
      
    },
    saveScoreFailure(err){

    },
    updateQuizSuccess(res){},
    updateQuizFailure(err){},
    submit(i) {
      var sounds = document.getElementsByTagName('audio');
      let j=0;
      for(j=0; j<sounds.length; j++) sounds[j].pause();
      this.storedState.response[i]=this.optionSelected
      console.log(this.storedState)

      this.$store.dispatch("updateQuizState", {
      url: "http://172.16.26.39:9092/state/updateState/",
      state: this.storedState,
      success: this.updateQuizSuccess,
      failure: this.updateQuizFailure
    })

    this.$store.dispatch("saveScore", {
      url: "http://172.16.26.39:9092/score/saveScore/",
      state: this.storedState,
      success: ()=>{},
      failure: ()=>{}
    })

    this.closeFullscreen()
     this.$router.push('/quizFinish')
    },
    getContestSuccess(res) {
      console.log(res.body);
      if(!res.body.stateId){
      this.contest = res.body;
      this.questions = res.body.questionId;
      let i = 1;
      while (i <= this.questions.length) {
        this.array.push(i);
        this.questions[i - 1].active = [false, false, false, false];
        i++;
      }
      this.state.contestName = res.body.contestName
      this.storedState.contestName = res.body.contestName
      this.state.contestId = res.body.contestId 
      this.storedState.contestId = res.body.contestId
      
      }
    },
    getContestFailure(err) {
      console.log(err);
    },
    setQuizStateSuccess(res) {
      console.log(res)
    },
    setQuizStateFailure (err) {
      console.log(err)
    }
  },
  computed: {
    ...mapGetters(['getStoredStateFromStore'])
  },
  created() {
    this.$store.dispatch("getContest", {
      url: "http://172.16.26.38:8080/cms/getContestById/",
      contestId: this.contestId,
      success: this.getContestSuccess,
      failure: this.getContestFailure
    })

    this.storedState = this.getStoredStateFromStore


    
  }
};
</script>
<style scoped>
.options {
  background-color: coral;
  width: 100%;
  height: 100px !important;
  padding: 3px;
}
.image {
  height: 75%;
  width: 335px;
  align-self: center;
  margin-left: 36%;
}
.videolist {
  height: 75%;
  width: 300px;
  align-self: center;
  /* margin-left: 40%; */
}
.audio {
  height: 50px;
  width: 300px;
  align-self: center;
}
.gif {
  height: 150px;
  margin: 4px;
}
.title {
  background-color: rgb(6, 150, 150);
}
</style>