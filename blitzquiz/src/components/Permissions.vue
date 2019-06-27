<template>
  <v-container grid-list-md>
    <v-layout justify-center="true" align-center="true" dark="true" row wrap>
      <v-flex xs10>
        <v-card dark color="#1976D2">
          <h1>Permissions</h1>
        </v-card>
      </v-flex>
      <v-flex xs10>
        <v-card>
          <v-list>
            <v-list-tile>
              <v-flex xs1><v-list-tile-avatar>S No.</v-list-tile-avatar></v-flex>
              <v-flex xs2><v-list-tile-avatar>Avatar</v-list-tile-avatar></v-flex>
              <v-flex xs4><v-list-tile-content>Name</v-list-tile-content></v-flex>
              <v-flex xs2><v-list-tile-content>Role</v-list-tile-content></v-flex>
              <v-flex xs2><v-list-tile-action>Screener</v-list-tile-action></v-flex>
              <v-flex xs2><v-list-tile-action>Quiz Master</v-list-tile-action></v-flex>
            </v-list-tile>
          </v-list>
        </v-card>
        <v-card style="height: 60vh; overflow: scroll">
          <v-list>
            <v-list-tile
              v-for="(item, index) in getAllUserData"
              :key="index"
              avatar
            >
              <v-flex xs1>
                <v-list-tile-avatar>
                  {{index+1}}
                </v-list-tile-avatar>
              </v-flex>
              <v-flex xs2>
              <v-list-tile-avatar>
                <img :src="item.userAvatar">
              </v-list-tile-avatar>
              </v-flex>
              <v-flex xs4>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.userName"></v-list-tile-title>
              </v-list-tile-content>
              </v-flex>
              <v-flex xs2>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.role"></v-list-tile-title>
              </v-list-tile-content>
              </v-flex>
              <v-flex xs2>
              <v-list-tile-action>
                <v-icon @click="optionSelect(item,0)" :color="item.role=='Screener' || item.role=='admin'? 'teal' : 'grey'">check_box</v-icon>
              </v-list-tile-action>
              </v-flex>
              <v-flex xs2>
              <v-list-tile-action>
                <v-icon @click="optionSelect(item,1)" :color="item.role=='Quiz Master' || item.role=='admin' ? 'teal' : 'grey'">check_box</v-icon>
              </v-list-tile-action>
              </v-flex>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-btn color="success" @click="updatePermissions()">Update</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import commonApi from '../../api/index.js'
export default {
  name: 'Permissions',
  data () {
    return {
      // items: [
      //   { title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', screen:false, create:false },
      //   { title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg', screen:false, create:false },
      //   { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', screen:false, create:false },
      //   { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg', screen:false, create:false }
      // ]
    }
  },
  methods:{
    ...mapActions(['getAllUsers']),
    optionSelect(item, i){
      //console.log(item.role[i])
      if(i==0 && item.role!=='admin' && item.role!='Screener')
        item.role='Screener'
      else if(i==0 && item.role=='Screener')
        item.role=''
      else if(i==1  && item.role!=='admin' && item.role!='Quiz Master')
        item.role='Quiz Master'
      else if(i==1  && item.role=='Quiz Master')
        item.role=''
    },
    updatePermissions(){
      commonApi.updatePermissions(this.getAllUserData, ()=>{alert("Permissions Update Successful!!")}, ()=>{alert("Permissions Update UnSuccessful!!")})
    }
  },
  computed:{
    ...mapGetters(['getAllUserData'])
  },
  created(){
    this.$store.dispatch('getAllUsers')
  }
}
</script>

<style scoped>

</style>
