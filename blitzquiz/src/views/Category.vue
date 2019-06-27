<template>
  <v-app>
    <v-container grid-list-md>
      <v-layout row wrap justify-center>
        <v-flex>
          <h1>{{selectedCategory.selectedCategory}}</h1>
        </v-flex>
      </v-layout>
      <v-layout justify-center row wrap>
        <v-flex xs2 style="margin:0px 20px 20px 0px" v-for="(item,index) in items" :key="index">
          <v-card @click="()=>{}">
            <v-layout justify-center>
              <v-card-title primary-title style="text-align: left">
                <h3>Contest Name: {{item.contestName}}</h3><br>
                <h4 v-if="item.dynamicContest">Type: Dynamic</h4>
                <h4 v-if="!item.dynamicContest">Type: Static</h4>
                <h4>Start Time: {{item.startTime}}</h4>
                <h4>End Time: {{item.endTime}}</h4>
              </v-card-title>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import commonApi from '../../api/index.js'
export default {
  name: "Category",
  data() {
    return {
      selectedCategory: this.$route.params,
      items:[]
    };
  },
  created(){
    commonApi.getContestByCategory(this.selectedCategory.selectedCategory, 0, (response)=>{
      this.items = response.body;
    },(error)=>{
      alert(error)
    })
  }
};
</script>

<style scoped>
</style>
