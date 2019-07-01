<template>
  <div class="welcome">
    <v-layout justify-center>
      <div class="header pa-2 dark"></div>
        <v-layout justify-center>
      <v-img
        contain
        class="quizpic"
        src="https://apprecs.org/gp/images/app-icons/300/de/com.june.guessthemovie.bollywood.jpg"
      ></v-img>
        </v-layout>
    </v-layout>
    <v-app color="white">
      <v-container class="quiz_info">
        <div>
          <v-layout justify-center>
            <h1 class="display-1">quiz Name</h1>
          </v-layout>
          <v-layout row wrap>
            <v-flex md1></v-flex>
            <v-flex md10 class="info">
              <v-card>
                <v-layout align-center>
                  <v-flex md8 style="text-align: left;" pa-4>
                    <h2 class="font-weight-regular">Duration : 2hrs</h2>
                    <h2 class="font-weight-regular">Category : Bollywood</h2>
                  </v-flex>
                  <v-flex md4 style="text-align: right" pr-4>
                    <v-btn big color="deep-orange">Leaderboard</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex md1></v-flex>
                  <v-flex md10 class="rules" mb-2>
                    <h1 class="font-weight-regular">Rules</h1>
                    <blockquote class="blockquote">
                      sdtfgybhujnkmjncfdxszebhjknhbcfdxs
                      <br>hbjgvfcdxszdxcfghvbjknhgftdrswrdfcghv
                      <br>hgftydretfghjuhdrtegthy
                    </blockquote>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex md1></v-flex>
                  <v-flex md10>
                    <v-btn large color="success" @click="goToQuiz">Take Challenge</v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </div>
      </v-container>
      
    </v-app>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  name: "quizWelcome",
  data() {
    return {
      storedState: {},
      state: {
        userId: '5fcd0eb6-9bbb-420e-a561-6548b9286163',
        contestName: 'xxx',
        contestId: '5d1491eec9558f930783a581',
        response: {}
      },
      userId: '5fcd0eb6-9bbb-420e-a561-6548b9286163',
      contestId: '5d1491eec9558f930783a581'
    }
  },
  computed: {
    ...mapGetters(['getStoredStateFromStore'])
  },
  methods: {
    ...mapActions(["getContest",'sendQuizState','getQuizState']),
    getQuizStateSuccess(res) {
      console.log("getSuccess",res)
      this.storedState = res.body
      if(this.contestId === this.storedState.contestId){
        this.$router.push('/quizPage')
      }
      else {} 
    },
    getQuizStateFailure(err) {
      console.log(err)
    },
    goToQuiz() {
      this.$router.push('/quizPage')
    },
    saveQuizStateInitiallySuccess(res) {
      console.log("initial success",res)
    },
    saveQuizStateInitiallyFailure(err) {
      console.log(err)
    }
  },
  created() {

      this.$store.dispatch("getQuizState",{
      url: `http://172.16.26.39:9092/state/getState?userId=${this.userId}&contestId=${this.contestId}`,
      success: this.getQuizStateSuccess,
      failure: this.getQuizStateFailure
    })

    console.log("check",this.storedState)

    if(this.storedState.response != null){
      
    }
      
    else {
      this.$store.dispatch("saveQuizStateInitially", {
      url: "http://172.16.26.39:9092/state/saveState/",
      state: this.state,
      success: this.saveQuizStateInitiallySuccess,
      failure: this.saveQuizStateInitiallyFailure
    })
    this.storedState = this.getStoredStateFromStore
    console.log(this.storedState)
    }
  }
};
</script>
<style scoped>
.header {
  height: 200px;
  background-color: rgb(175, 22, 22);
  border-bottom: 5px solid rgb(109, 79, 79);
  filter: blur(5px);
  position: absolute;
  width: 100%;
  margin: 0 0 5% 0;
}
.quizpic {
  height: 25%;
  width: 25%;
  position: absolute;
  margin: 1% 0 0% 0;
}
.info {
  border: 2px solid black;
  border-radius: 37px;
}
.rules {
  border: 2px dashed grey;
}
.blockquote {
  padding: 5px 0 5px 0px;
}
.quiz_info{
    position: relative;
    margin: 17% 0% 0 3%;
}
.welcome{
    background-color: black;
}
</style>