<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ on }">
        <v-layout row wrap>
          <v-layout>
            <v-flex md12>
              <v-btn color="blue" dark v-on="on">Select Questions</v-btn>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex md12>{{textselected.length}}/{{questionNo}}</v-flex>
          </v-layout>
        </v-layout>
      </template>
      <v-card>
        <v-list three-line subheader>
          <v-subheader>Select Questions</v-subheader>
          <div class="list_element" v-for="(item, index) in textquestion" :key="index">
            <v-list-tile avatar>
              <v-list-tile-content align-center>
                <v-list-tile-sub-title
                  style="overflow-wrap:break-word; color:black; font-size: 17px;"
                >{{item.questionText}}</v-list-tile-sub-title>
                <v-layout row class="options" align-center>
                  <v-list-tile-sub-title
                    style="overflow-wrap:break-word; color:black; font-size: 17px;"
                  >A: {{item.answers[0]}} &nbsp; &nbsp; &nbsp;B: {{item.answers[1]}} &nbsp; &nbsp;&nbsp;C: {{item.answers[2]}} &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;D: {{item.answers[3]}}</v-list-tile-sub-title>
                </v-layout>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-checkbox v-model="textselected" :value="item"></v-checkbox>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
          </div>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="green darken-1" flat @click="dialog = false">Disagree</v-btn> -->
          <v-btn color="green darken-1" flat @click="addQuestion">Add Questions</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "selectQuestion",
  props:  ['textquestion','handle','questionNo'],
  data() {
    return {
      dialog: false,
      row: "",
      textselected: []
    };
  },
  methods: {
    addQuestion() {
         if (this.textselected.length < this.questionNo) {
        alert(
          "select ",
          (this.questionNo - this.textselected.length),
          "more questions"
        );
        this.dialog = false;
       
      } else if (this.textselected.length > this.questionNo) {
        alert("You can select only", this.questionNo, "questions");
      } else {
        this.dialog = false;
        this.handle(this.textselected);
      }
    }
  }
};
</script>
 <style  scoped>
.options {
  text-overflow: none;
}
</style>
