<template>
  <div class="about">
    <h1>This is an about page</h1>
    <screener></screener>
  </div>
</template>

<script>
import Screener from '@/components/Screener.vue'
export default {
  name: "About",
  components: {
    Screener
  }
}
</script>
