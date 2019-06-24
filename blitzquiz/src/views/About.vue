<template>
  <div class="about">
    <!-- <screener></screener> -->
    <!-- <permissions></permissions> -->
    <crawler></crawler>
  </div>
</template>

<script>
import Screener from '@/components/Screener.vue'
import Permissions from '@/components/Permissions.vue'
import Crawler from '@/components/Crawler.vue'
export default {
  name: "About",
  components: {
    Screener, Permissions,Crawler
  }
}
</script>
