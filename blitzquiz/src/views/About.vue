<template>
  <div class="about">
    <!-- <screener></screener> -->
    <!-- <permissions></permissions> -->
    <!-- <crawler></crawler> -->
    <profile-edit></profile-edit>
    <!-- <preferences></preferences> -->
    
    <!-- <v-app>
    <input id="inputUpload" type="file">
    <v-btn color="success" @click="submit()">Upload</v-btn>
    </v-app> -->
  </div>
</template>

<script>
import Screener from '@/components/Screener.vue'
import Permissions from '@/components/Permissions.vue'
import Crawler from '@/components/Crawler.vue'
import ProfileEdit from '@/components/ProfileEdit.vue'
import Preferences from '@/components/Preferences.vue'
import { mapActions } from 'vuex';
export default {
  name: "About",
  components: {
    Screener, Permissions,Crawler,ProfileEdit,Preferences
  },
  methods:{
    ...mapActions(['uploadFile']),
    submit(){
      var x = document.getElementById("inputUpload");
      var formData = new FormData()
      formData.append('file', x.files[0], x.files[0].name);
      var email = "7faba865-bd62-472b-b856-fe8196c403bb";
      // debugger
      this.$store.dispatch('uploadFile', {formData:formData,email:email})
    }
  }
}
</script>
