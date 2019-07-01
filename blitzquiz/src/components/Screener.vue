<template>
  <div>
    <v-app>
      <v-container grid-list-md>
        <v-layout justify-center="true" align-center="true" dark="true" row wrap>
          <v-card dark color="primary" width="100%">
            <h1>Screening</h1>
          </v-card>
        </v-layout>
        <v-layout v-if="!category">
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
        <v-layout v-if="!category" row wrap style="background-color: white">
          {{getScreeningData}}
          <v-data-table style="width: 100%" :items="items" select-all v-model="selected" item-key="question" class="elevation-1" hide-actions>
            <template v-slot:headers="props">
              <tr>
                <th
                  v-for="header in headers"
                  :key="header.text"
                >
                  {{ header.text }}
                </th>
              </tr>
            </template>
            <template v-slot:items="props">
              <tr>
                <td class="text-xs-left question">
                  <center>
                    <v-img
                      style="max-height: 200px; max-width: 150px"
                      v-if="props.item.questionType == 'Image'"
                      :src="props.item.binaryPath"
                    />
                  </center>
                  <audio v-if="props.item.questionType == 'voice' || props.item.questionType == 'Audio'" controls style="margin: 10px 0px">
                    <source :src="props.item.binaryPath">
                  </audio><br>
                  {{ props.item.question }}
                </td>
                <td class="text-xs-left">
                  {{ props.item.option1 }}, {{props.item.option2}}, {{props.item.option3}}, {{props.item.option4}}
                </td>
                <td class="text-xs-left rightanswer">
                  {{ props.item.rightAnswer }}
                </td>
                <td class="text-xs-left difficultylevel">
                  {{ props.item.difficultyLevel }}
                </td>
                <td class="text-xs-left answertype">
                  {{ props.item.answerType }}
                </td>
                <td class="text-xs-left answertype">
                  <v-checkbox
                    v-model="props.item.isRejected"
                    primary
                    hide-details
                  ></v-checkbox>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-layout>
        <v-layout v-if="!category" justify-center="true" align-center="true" dark="true" row wrap>
          <v-flex>
            <v-btn dark color="primary" @click="nextPage()" style="width: 200px">Next Page</v-btn>
          </v-flex>
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
      headers: [
        {
          text: 'Question',
          value: 'question'
        },
        { text: 'Options', value: 'option' },
        { text: 'Right Answer', value: 'answer' },
        { text: 'Difficulty', value: 'difficulty' },
        { text: 'Answer Type', value: 'anstype' },
        { text: 'Approved', value: 'isRejected' }
      ],
      selected: [],
      items: [],
      len: 0,
      deletelist: [],
      categoryList: [],
      category: true, 
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
    submit() {
      var sounds = document.getElementsByTagName("audio");
      let j = 0;
      for (j = 0; j < sounds.length; j++) sounds[j].pause();
      this.category = true;
      this.len = 0;
    },
    nextPage(){
      var sounds = document.getElementsByTagName("audio");
      let j = 0;
      for (j = 0; j < sounds.length; j++) sounds[j].pause();
      let sceenedData = [];
      let unsceenedData = [];
      let temp3 = {};
      this.items.forEach(ele => {
        ele.isScreened = "1"
        if (ele.isRejected == true) {
          ele.isRejected = "1"
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
          ele.isRejected = "0"
          unsceenedData.push(ele);
        }
      });
      this.$store.dispatch("setScreenedData", {
        data: sceenedData,
        success: () => {
          this.$store.dispatch("setUnScreenedData", {unsceenedData: unsceenedData, success:()=>{
            this.items = []
            this.$store.dispatch("getScreeningDataFromCMS", {
              data: this.categorySelected,
              success: () => {
                this.items = this.getScreeningData;
                this.getScreeningData.forEach(element => {
                  if(element.isRejected == "0")
                    element.isRejected = false
                  else
                    element.isRejected = true
                });
                if(this.items.length === 0){
                  alert("No Questions Recieved!!")
                  this.category = true;
                }
              }
            });
          }});
        }
      });
    },
    next() {
      if (this.categorySelected !== "") {
        this.$store.dispatch("getScreeningDataFromCMS", {
          data: this.categorySelected,
          success: () => {
            this.category = false;
            this.items = this.getScreeningData;
            this.getScreeningData.forEach(element => {
              if(element.isRejected == "0")
                element.isRejected = false
              else
                element.isRejected = true
            });
            if(this.items.length === 0){
              alert("No Questions Recieved!!")
              this.category = true;
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
.question {
  width: 38em;
  max-width: 38em;
}
.options {
  width: 10em;
}
.rightanswer {
  width: 2em;
}
.difficultylevel {
  width: 8em;
}
.answertype {
  width: 8em;
}
</style>