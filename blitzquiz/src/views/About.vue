<template>
  <div class="about">
    <!-- <screener></screener> -->
    <!-- <permissions></permissions> -->
    <!-- <crawler></crawler> -->
    <!-- <profile-edit></profile-edit> -->
    <preferences></preferences>
  </div>
</template>

<script>
import Screener from '@/components/Screener.vue'
import Permissions from '@/components/Permissions.vue'
import Crawler from '@/components/Crawler.vue'
import ProfileEdit from '@/components/ProfileEdit.vue'
import Preferences from '@/components/Preferences.vue'
export default {
  name: "About",
  components: {
    Screener, Permissions,Crawler,ProfileEdit,Preferences
  }
}
</script>
