<template>
  <v-app>
    <v-tabs
      centered
      color="cyan"
      dark
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab href="#tab-1" v-if="role=='admin'">
        Crawler
      </v-tab>

      <v-tab href="#tab-2" v-if="role=='admin' || role=='Screener'">
        Screener
      </v-tab>

      <v-tab href="#tab-3" v-if="role=='admin' || role=='Quiz Master'">
        Create Quiz
      </v-tab>

      <v-tab href="#tab-4" v-if="role=='admin'">
        Permissions
      </v-tab>

      <v-tab-item
        value="tab-1"
      >
        <Crawler></Crawler>
      </v-tab-item>
      
      <v-tab-item
        value="tab-2"
      >
        <Screener></Screener>
      </v-tab-item>

      <v-tab-item
        value="tab-3"
      >
      <ContestCreate></ContestCreate>
      </v-tab-item>
      
      <v-tab-item
        value="tab-4"
      >
        <Permissions></Permissions>
      </v-tab-item>
    </v-tabs>
  </v-app>
</template>

<script>
import Screener from '@/components/Screener.vue'
import Permissions from '@/components/Permissions.vue'
import Crawler from '@/components/Crawler.vue'
import ContestCreate from '@/pages/ContestCreate.vue'
export default {
  name: 'Cms',
  components: {
    Screener, Permissions, Crawler, ContestCreate
  },
  data(){
    return{
      role: this.$route.params.role
    }
  }
};
</script>

<style scoped>
</style>
