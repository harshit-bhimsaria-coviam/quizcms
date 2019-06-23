<template>
<div>
  <v-app>
    <v-container grid-list-md>
      <v-layout justify-center="true" align-center="true" dark="true" row wrap>
        <v-flex>
          <v-card dark color="primary">
            <h1>Screening</h1>
          </v-card>
        </v-flex>
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
          <v-select
            :items="items"
            label="Standard"
            v-model="categorySelected"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout v-if="category" justify-center="true" align-center="true" dark="true" row wrap>
        <v-flex>
          <v-btn dark color="primary" @click="next()" style="width: 200px">Next</v-btn>
        </v-flex>
      </v-layout>
      <v-carousel v-if="!category" hide-delimiters hide-controls v-model="len" :cycle="false" height=auto light>
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
        >
          <v-card>
            <v-card-text class="px-0"><h1>Question {{i+1}}</h1></v-card-text>
            <hr>
            <v-card-text>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged.
              </p>
            </v-card-text>
            <v-card-text>
              <h2>Answers</h2>
              <v-btn disabled>Option 1</v-btn>
              <v-btn disabled>Option 2</v-btn>
              <v-btn disabled>Option 3</v-btn>
            </v-card-text>
            <hr>
            <v-layout row>
              <v-flex xs4>
                  <v-card-text>
                    <h2>Difficulty</h2><p> Easy/Medium/Hard </p>
                  </v-card-text>
              </v-flex>
              <v-flex xs4>
                  <v-card-text>
                    <h2>Question Type</h2><p> Text Based/Image Based/Audio Based/Video Based </p>
                  </v-card-text>
              </v-flex>
              <v-flex xs4>
                  <v-card-text>
                    <h2>Answer Type</h2><p> Singe-Correct/Multi-Correct/Arrange the order </p>
                  </v-card-text>
              </v-flex>
            </v-layout>
            <hr>
            <v-card-text>
              <v-btn color="error" @click="reject(i)">Reject</v-btn>
              <v-btn color="success" @click="accept()">Accept</v-btn>
            </v-card-text>
          </v-card>
        </v-carousel-item>
      </v-carousel>
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
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "Screener",
  data(){
    return{
      items: ['abc', 'bcd', 'cde'],
      len: 0,
      deletelist: [],
      category: true,
      categorySelected: null
    }
  },
  methods: {
    ...mapActions(['setScreeningData']),
    // submitFn(){
    //   this.$store.dispatch('setScreeningData')
    // },
    accept(){
      if(this.len < this.items.length-1){
        this.len += 1;
      }
      else{
        this.submit()
      }
      // console.log(this.len)
    },
    reject(i){
      this.deletelist.push(i)
      if(this.len < this.items.length-1)
        this.len += 1;
      else{
        this.submit()
      }
      // console.log(this.len)
    },
    submit(){
      this.deletelist.forEach(element => {
        this.items.splice(element,1)
      });
      this.deletelist=[]
      console.log(this.items)
    },
    next(){
      if(this.categorySelected!==null)
        this.category = false;
      else
        alert("Select a category")
    }
  },
  computed: {
    ...mapGetters(['getScreeningData'])
  }
}
</script>

<style scoped>
p{
  margin: 0;
}
</style>
