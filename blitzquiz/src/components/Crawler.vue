<template>
  <v-app>
    <v-container grid-list-md>
      <v-layout justify-center="true" align-center="true" dark="true" row wrap>
        <v-flex xs12>
          <v-card dark color="primary">
            <h1>Crawler</h1>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-data-table :items="crawlerData" class="elevation-1" hide-actions hide-headers>
            <template v-slot:items="props">
              <td v-if="props.item.webId == 'Config Id'">{{ props.item.webId }}</td>
              <td v-if="props.item.webId != 'Config Id'">
                <v-btn @click="showConfig(props.item, props.index)">{{ props.item.webId }}</v-btn>
              </td>
              <td class="text-xs-left">{{ props.item.website }}</td>
              <td v-if="props.item.status == 'Status'" class="text-xs-left">{{ props.item.status }}</td>
              <td v-if="props.item.status != 'Status'" class="text-xs-left">
                <v-btn @click="changeStatus(props.item)">{{ props.item.status }}</v-btn>
              </td>
              <td class="text-xs-left">{{ props.item.hitTimeInterval }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <br>
      <v-layout justify-center>
        <v-btn dark large @click="update()">Update</v-btn>
      </v-layout>
      <br>
      <v-layout justify-center v-if="!startCrawler">
        <v-btn dark large @click="start()">Start Crawler</v-btn>
      </v-layout>
      <v-layout justify-center v-if="startCrawler">
        <h2>Crawler Running!!</h2>  
      </v-layout>
      <v-layout justify-center v-if="startCrawler">
        <v-btn dark large @click="stop()">Stop Crawler</v-btn>
      </v-layout>
    </v-container>
    <v-dialog v-model="dialog" width=auto persistent>
      <v-card v-if="dialogData!=-1">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Configure {{crawlerData[dialogData].webId}}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
        <v-card-text>
          <v-data-table :items="crawlerData" class="elevation-1" hide-actions hide-headers>
            <template v-slot:items="props">
              <td class="text-xs-left" v-if="props.index == dialogData">
                {{ props.item.questionTag }}</td>
              <td class="text-xs-left" v-if="props.index == dialogData">
                {{ props.item.optionTag }}</td>
              <td class="text-xs-left" v-if="props.index == dialogData">
                {{ props.item.answerTag }}</td>
              <td class="text-xs-left" v-if="props.index == dialogData">
                <v-select v-model="props.item.answerType" :items="['Single_choice','Multiple_choice']"></v-select>
              </td>
              <td class="text-xs-left" v-if="props.index == dialogData">
                <v-select v-model="props.item.difficultyLevel" :items="['Easy','Average','Hard']"></v-select>
                <!-- {{ props.item.difficultyLevel }} -->
              </td>
              <td class="text-xs-left" v-if="props.index == dialogData">
                <v-select v-model="props.item.questionType" :items="['Text','Image','Audio']"></v-select>
              </td>
              <td class="text-xs-left" v-if="props.index == dialogData">
                {{ props.item.category }}
              </td>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click="closeConfig()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import commonApi from "../../api/index.js";
export default {
  name: "Crawler",
  data() {
    return {
      crawlerData: [
        {
          webId: "Config Id",
          website: "URL",
          status: "Status",
          hitTimeInterval: "Time Interval"
        }
      ],
      dialog: false,
      dialogData: -1,
      startCrawler: false     
    };
  },
  methods: {
    changeStatus(obj) {
      obj.status = !obj.status;
    },
    showConfig(obj, index) {
      this.dialog = true;
      this.dialogData = index;
    },
    closeConfig(){
      this.dialog = false;
      this.dialogData = -1;
    },
    update(){
      console.log(this.crawlerData.slice(1))
      commonApi.setCrawlerData(this.crawlerData.slice(1),()=>{alert("Crawler Updated")},()=>{alert("Crawler Not Updated")})
    },
    start(){
      commonApi.startCrawler(()=>{
        this.startCrawler = true
      },()=>{
        alert("Crawler Start Error!!")
      })
    },
    stop(){
      commonApi.stopCrawler(()=>{
        this.startCrawler = false
      },()=>{
        alert("Crawler Stop Error!!")
      })
    }
  },
  created() {
    commonApi.getCrawlerData(
      response => {
        this.crawlerData = this.crawlerData.concat(response.body);
      },
      error => {
        alert(error.body);
      }
    );
  }
};
</script>

<style scoped>
</style>
