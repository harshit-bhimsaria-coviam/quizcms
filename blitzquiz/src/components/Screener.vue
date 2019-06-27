<template>
  <div>
    <v-app>
      <v-container grid-list-md>
        <v-layout justify-center="true" align-center="true" dark="true" row wrap>
          <v-card dark color="primary" width="100%">
            <h1>Screening</h1>
          </v-card>
        </v-layout>
        <v-layout v-if="category">
          <v-flex>
            <v-card>
              <h1>Select a Category of Questions</h1>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout v-if="category" justify-center="true">
          <v-flex xs4>
            <v-select :items="categoryList" label="Standard" v-model="categorySelected"></v-select>
          </v-flex>
        </v-layout>
        <v-layout v-if="category" justify-center="true" align-center="true" dark="true" row wrap>
          <v-flex>
            <v-btn dark color="primary" @click="next()" style="width: 200px">Next</v-btn>
          </v-flex>
        </v-layout>
        <!-- <v-carousel v-if="!category" hide-delimiters hide-controls v-model="len" :cycle="false" height=auto light class="cara">
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
        >-->
        <v-layout v-if="!category" row wrap style="background-color: white">
          <v-card
            v-for="(item,i) in getScreeningData"
            :key="i"
            height="auto"
            width="100%"
            :class="[i==len?'visibleClass':'invisibleClass']"
          >
            <!-- <v-card-text class="px-0"><h1>Question {{item.queNo}}</h1></v-card-text>
            <hr>-->
            <center>
              <v-img
                style="max-height: 300px; max-width: 200px"
                v-if="item.questionType == 'Image'"
                :src="item.binaryPath"
              />
            </center>
            <audio v-if="item.questionType == 'voice' || item.questionType == 'Audio'" controls>
              <source :src="item.binaryPath">
            </audio>
            <v-card-text>
              <p>{{item.question}}</p>
            </v-card-text>
            <v-card-text>
              <h2>Answers</h2>
              <v-btn disabled>{{item.option1}}</v-btn>
              <v-btn disabled>{{item.option2}}</v-btn>
              <v-btn disabled>{{item.option3}}</v-btn>
              <v-btn disabled>{{item.option4}}</v-btn>
            </v-card-text>
            <hr>
            <v-layout row>
              <v-flex xs4>
                <v-card-text>
                  <h2>Difficulty</h2>
                  <p>{{item.difficultyLevel}}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-card-text>
                  <h2>Question Type</h2>
                  <p>{{item.questionType}}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-card-text>
                  <h2>Answer Type</h2>
                  <p>{{item.answerType}}</p>
                </v-card-text>
              </v-flex>
            </v-layout>
            <hr>
            <v-card-text>
              <v-btn color="error" @click="reject(i)">Reject</v-btn>
              <v-btn color="success" @click="accept(i)">Accept</v-btn>
            </v-card-text>
          </v-card>
        </v-layout>
        <!-- </v-carousel-item>
        </v-carousel>-->
        <v-layout v-if="!category" justify-center="true" align-center="true" dark="true" row wrap>
          <v-flex>
            <v-btn dark color="primary" @click="submit()" style="width: 200px">Leave</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Screener",
  data() {
    return {
      items: [],
      len: 0,
      deletelist: [],
      categoryList: [],
      category: true, //True
      categorySelected: ""
    };
  },
  methods: {
    ...mapActions([
      "getScreeningDataFromCMS",
      "getCategories",
      "setScreenedData",
      "setUnScreenedData"
    ]),
    accept(i) {
      this.getScreeningData[i].isScreened = "1";
      this.getScreeningData[i].isRejected = "0";
      var sounds = document.getElementsByTagName('audio');
      let j=0;
      for(j=0; j<sounds.length; j++) sounds[j].pause();
      if (this.len == this.items.length-1) this.submit();
      else {
        this.len += 1;
        while (this.getScreeningData[this.len].isScreened == "1") {
          if (this.len == this.items.length - 1) {
            this.len = 0;
            alert("No more Questions in this Catrgory!!");
            this.category = true;
            break;
          }
          this.len += 1;
        }
      }
      // console.log(this.getScreeningData, i)
    },
    reject(i) {
      this.getScreeningData[i].isScreened = "1";
      this.getScreeningData[i].isRejected = "1";
      var sounds = document.getElementsByTagName('audio');
      let j=0;
      for(j=0; j<sounds.length; j++) sounds[j].pause();
      if (this.len == this.items.length-1) this.submit();
      else {
        this.len += 1;
        while (this.getScreeningData[this.len].isScreened == "1") {
          if (this.len == this.items.length - 1) {
            this.len = 0;
            alert("No more Questions in this Catrgory!!");
            this.category = true;
            break;
          }
          this.len += 1;
        }
      }
      // console.log(this.getScreeningData, i)
    },
    submit() {
      var sounds = document.getElementsByTagName('audio');
      let j=0;
      for(j=0; j<sounds.length; j++) sounds[j].pause();
      let sceenedData = [];
      let unsceenedData = [];
      let temp3 = {};
      this.getScreeningData.forEach(ele => {
        if (ele.isScreened == "1" && ele.isRejected == "0") {
          // console.log(ele, "isScreenedSubmit")
          temp3.id = ele.queNo;
          temp3.questionText = ele.question;
          temp3.answers = [];
          temp3.answers.push(
            ele.option1,
            ele.option2,
            ele.option3,
            ele.option4
          );
          temp3.answerType = ele.answerType;
          temp3.questionType = ele.questionType;
          temp3.rightAnswers = ele.rightAnswer;
          temp3.difficultyLevel = ele.difficultyLevel;
          temp3.resourceUrl = ele.binaryPath;
          temp3.category = ele.category;

          sceenedData.push(temp3);
          temp3 = {};
          unsceenedData.push(ele);
        } else {
          unsceenedData.push(ele);
        }
      });
      this.$store.dispatch("setScreenedData", {
        data: sceenedData,
        success: () => {
          this.$store.dispatch("setUnScreenedData", unsceenedData);
        }
      });
      this.category = true;
      this.len = 0;
    },
    next() {
      if (this.categorySelected !== "") {
        this.$store.dispatch("getScreeningDataFromCMS", {
          data: this.categorySelected,
          success: () => {
            this.category = false;
            this.items = this.getScreeningData;
            while (this.getScreeningData[this.len].isScreened == "1") {
              if (this.len == this.items.length - 1) {
                this.len = 0;
                alert("No more Questions in this Catrgory!!");
                this.category = true;
                break;
              }
              this.len += 1;
            }
          }
        });
      } else alert("Select a category");
    }
  },
  computed: {
    ...mapGetters(["getScreeningData", "getCategoryData"])
  },
  created() {
    this.$store.dispatch("getCategories", () => {
      this.categoryList = this.getCategoryData.map(obj => {
        return obj.categoryName;
      });
    });
  }
};
</script>

<style scoped>
p {
  margin: 0;
}
.cara,
.cara .v-window__container,
.cara .v-carousel__item {
  height: auto !important;
}

.visibleClass {
  display: initial;
}

.invisibleClass {
  display: none;
}
</style>