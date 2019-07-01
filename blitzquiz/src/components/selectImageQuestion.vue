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
            <v-flex md12>{{imageselected.length}}/{{questionNo}}</v-flex>
          </v-layout>
        </v-layout>
      </template>
      <v-card>
        <v-list three-line subheader class="grow">
          <v-subheader>Select Questions</v-subheader>

          <div class="list_element" v-for="(item, index) in imagequestion" :key="index">
            <v-card>
              <v-layout>
                <v-flex md11>
                  <h2>{{item.questionText}}</h2>

                  <div class="image">
                    <v-img     max-height="168px" contain :src="item.resourceUrl"></v-img>
                  </div>
                  <h4 style="padding:2px;">A: {{item.answers[0]}} &nbsp; &nbsp; &nbsp;B: {{item.answers[1]}} &nbsp; &nbsp;&nbsp;C: {{item.answers[2]}} &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;D: {{item.answers[3]}}</h4>
                </v-flex>
                <v-flex m1 align-end>
                  <v-checkbox v-model="imageselected" :value="item" align-end></v-checkbox>
                </v-flex>
              </v-layout>
            </v-card>
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
  name: "selectImageQuestion",
  components: {},
  props: ['imagequestion','handle','questionNo'],
  data() {
    return {
      dialog: false,
      row: "",
      imageselected: [],
    
    };
  },
  methods: {
    addQuestion() {
           if (this.imageselected.length < this.questionNo) {
        alert(
          "select "+
          (this.questionNo - this.imageselected.length)+
          " more questions"
        );
        this.dialog = false;
        
      } 
      else if (this.imageselected.length > this.questionNo) {
        alert("You can select only"+ this.questionNo+ "questions");
      } else {
        this.dialog = false;
        this.handle(this.imageselected);
      }
    }
  }
};
</script>
 <style  scoped>
.options {
  text-overflow: none;
}
.v-input--selection-controls {
  margin-top: 85%;
}
.image {
  height: 75%;
  width: 235px;
  align-self: center;
  margin-left: 40%;
}
.outimage {
  width: 100%;
}
</style>
