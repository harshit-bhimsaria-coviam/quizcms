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
            <v-flex md12>{{audioselected.length}}/{{questionNo}}</v-flex>
          </v-layout>
        </v-layout>
      </template>
      <v-card>
        <v-list three-line subheader class="grow">
          <v-subheader>Select Questions</v-subheader>

          <div class="list_element" v-for="(item, index) in audioquestion" :key="index">
            <v-card>
              <v-layout>
                <v-flex md11>
                  <h2>{{item.questionText}}</h2>

                  <div class="audio">
                    <audio controls :id="'audio'+item.id">
                      <source :src="item.resourceUrl">
                    </audio>
                  </div>
                  <h4>A: {{item.answers[0]}} &nbsp; &nbsp; &nbsp;B: {{item.answers[1]}} &nbsp; &nbsp;&nbsp;C: {{item.answers[2]}} &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;D: {{item.answers[3]}}</h4>
                </v-flex>
                <v-flex m1 align-end>
                  <v-checkbox v-model="audioselected" :value="item" align-end></v-checkbox>
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

document.addEventListener('play', function(e){
    var audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len;i++){
        if(audios[i] != e.target){
            audios[i].pause();
        }
    }
}, true);

export default {
  name: "selectAudioQuestion",
  components: {},
  props: ["audioquestion", "handle", "questionNo"],
  data() {
    return {
      dialog: false,
      row: "",
      audioselected: []
    };
  },
  methods: {
    addQuestion() {
      if (this.audioselected.length < this.questionNo) {
        alert(
          "Select "+
          (this.questionNo - this.audioselected.length)+
          " more questions"
        );
        this.dialog = false;
        
      } 
      else if (this.audioselected.length > this.questionNo) {
        alert("You can select only "+this.questionNo+ " questions");
      }
       else {
        this.dialog = false;
        this.handle(this.audioselected);
      }
        var audios = document.getElementsByTagName('audio');
        for(var i = 0, len = audios.length; i < len;i++){
            audios[i].pause();
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
.audio {
      height: 51%;
  width: 300px;
  align-self: center;
  margin-left: 40%;
}
</style>
