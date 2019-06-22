<template>
<div>
  <v-app>
    <v-carousel hide-delimiters hide-controls v-model="len" cycle="false">
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
      >
        <v-card>
          <h1>{{item}}</h1>
          <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries, but also the leap into electronic typesetting, 
              remaining essentially unchanged.
          </p>
          <br>
          <v-btn color="success">Option 1</v-btn>
          <v-btn disabled>Option 2</v-btn>
          <v-btn disabled>Option 3</v-btn>
          <br>
          <br>
          <p> Difficulty: Easy/Medium/Hard </p>
          <v-btn @click="reject()">Reject</v-btn>
          <v-btn @click="accept()">Accept</v-btn>
        </v-card>
      </v-carousel-item>
    </v-carousel>
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
      len: 0
    }
  },
  methods: {
    ...mapActions(['setScreeningData']),
    submitFn(){
      this.$store.dispatch('setScreeningData')
    },
    accept(){
      this.len += 1;
    },
    reject(){
      this.len += 1;
    }
  },
  computed: {
    ...mapGetters(['getScreeningData'])
  }
}
</script>