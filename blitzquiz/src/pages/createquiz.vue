<template>
  <div>
    <v-layout class="a" align-center pa-4 ma-4>
      <v-flex md4>
          
        <h3>Text questions</h3>
      </v-flex>
      <v-flex>
        <select-text-question :handle="handleTextQuestions" :textquestion="textquestion" :questionNo="textNo"></select-text-question>
      </v-flex>
    </v-layout>
    <v-layout class="a" align-center pa-4 ma-4>
      <v-flex md4>
        <h3>Image questions</h3>
      </v-flex>
      <select-image-question :handle="handleImageQuestions" :imagequestion="imagequestion" :questionNo="imageNo"></select-image-question>
    </v-layout>
    <!-- <v-layout class="a" align-center pa-4 ma-4>
      <v-flex md4>
        <h3>Video questions</h3>
      </v-flex>
      <select-video-question :handle="handleVideoQuestions" :videoquestion="videoquestion" :questionNo="parseInt(questionNo.questionNo)*.2"></select-video-question>
    </v-layout> -->
    <v-layout class="a" align-center pa-4 ma-4>
      <v-flex md4>
        <h3>Audio questions</h3>
      </v-flex>
      <select-audio-question :handle="handleAudioQuestions" :audioquestion="audioquestion" :questionNo="audioNo"></select-audio-question>
    </v-layout>
    <v-btn color="green darken-1"  @click="createquiz">Create Quiz</v-btn>
  </div>
</template>
<script>
import selectTextQuestion from "@/components/selectTextQuestion.vue";
import selectImageQuestion from "@/components/selectImageQuestion.vue";
import selectAudioQuestion from "@/components/selectAudioQuestion.vue";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "createquiz",
  components: {
    selectTextQuestion,
    selectImageQuestion,
    selectAudioQuestion
  },
  data() {
    return {
      imagequestion: [],
      textquestion: [],
      selectedTextQuestion:[],
      selectedImageQuestion:[],
    //   selectedVideoQuestion:[],
      selectedAudioQuestion:[],
      videoquestion: [],
      audioquestion: [],
      data: {},
      questionNo: this.$route.params,
      btnDisable:false,
      textNo:'',
      imageNo:'',
      audioNo:''
    };
  },
  methods: {
    ...mapActions(["getScreenedQuestion", "setQuiz"]),
    handleTextQuestions(selectedTextQuestion) {
        
        this.selectedTextQuestion=selectedTextQuestion
        console.log(this.selectedTextQuestion,'text')
    },
    handleImageQuestions(selectedImageQuestion) {
        this.selectedImageQuestion=selectedImageQuestion
        console.log(this.selectedImageQuestion,'image')
    },
     handleVideoQuestions(selectedVideoQuestion) {
        this.selectedVideoQuestion=selectedVideoQuestion
    },
     handleAudioQuestions(selectedAudioQuestion) {
        this.selectedAudioQuestion=selectedAudioQuestion
        console.log(this.selectedAudioQuestion,'audio')
    },
    setQuizSuccess() {},
    setQuizFailure() {},
    createquiz() {
        this.data.questionId=[]
      this.data = this.getData;
      
      this.selectedTextQuestion.forEach(ele => {
        this.data.questionId.push(ele);
      });
      this.selectedImageQuestion.forEach(ele => {
        this.data.questionId.push(ele);
      });
    //   this.selectedVideoQuestion.forEach(ele => {
    //     this.data.questionId.push(ele);
    //   });
      this.selectedAudioQuestion.forEach(ele => {
        this.data.questionId.push(ele);
      });
      console.log(this.questionNo.questionNo,'q no')
      console.log(this.data.questionId.length)
      console.log(this.data.questionId)
      if(this.data.questionId.length==this.questionNo.questionNo)
      {
      this.$store.dispatch("setQuiz", {
        url: "http://172.16.26.38:8080/cms/saveContest",
        success: this.setQuizSuccess,
        failure: this.setQuizFailure,
        data: this.data
      });
      this.$router.push({name: 'ContestCreated', params:{'contestName': this.data.contestName,'category':this.data.category}})
      }
      else{
          alert('Please select '+ this.questionNo.questionNo +' questions to Create quiz')
      }
    },
    getScreenedQuestionSuccess(res) {
        console.log("res inside", res)
      this.getScreenedQuestionFromStore.forEach(element => {
        if (element.questionType === "Text") {
          this.textquestion.push(element);
        }
        if (element.questionType === "Image") {
          this.imagequestion.push(element);
        }
        // if (element.questionType === "Video") {
        //   this.imagequestion.push(element);
        // }
        if(element.questionType === "voice" || element.questionType === "Audio"){
             this.audioquestion.push(element);
        }
      });
      this.checkLimits()
    },
    checkLimits() {
        let initialText = this.textquestion.length
        let initialAudio = this.audioquestion.length
        let initialImage = this.imagequestion.length

        let actualText = this.questionNo.questionNo*0.6
        let actualImage = this.questionNo.questionNo*0.2
        let actualAudio = this.questionNo.questionNo*0.2

        let realText = Math.min(initialText, actualText)
        let realImage = Math.min(initialImage, actualImage)
        let realAudio = Math.min(actualAudio, initialAudio)

        let diffText = actualText - realText
        let diffImage = actualImage - realImage
        let diffAudio = actualAudio - realAudio

        realText += diffImage +diffAudio
        this.textNo=realText
        this.imageNo=realImage
        this.audioNo=realAudio
        console.log("initial",initialText,initialImage,initialAudio)
        console.log("actual",actualText,actualImage,actualAudio)
        console.log("real",realText,realImage,realAudio)
        console.log("diff",diffText, diffImage,diffAudio)
    },
    getScreenedQuestionFailure(err) {
        console.log(err)
    }
  },
  created() {
      console.log(this.getData, "dhyf")
    this.$store.dispatch("getScreenedQuestion", {
      url:
        `http://172.16.26.38:8080/screener/getScreenedQuestionsByCategory/${this.getData.category}`,
      success: this.getScreenedQuestionSuccess,
      failure: this.getScreenedQuestionFailure
    });
  },
  computed: {
    ...mapGetters(["getScreenedQuestionFromStore", "getData"]),
   
  }
};
</script>
<style scoped>
.a {
  border: 1px solid black;
}
</style>
