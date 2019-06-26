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
          <v-data-table :items="desserts" class="elevation-1" hide-actions hide-headers>
            <template v-slot:items="props">
              <td>{{ props.item.id }}</td>
              <td class="text-xs-left">{{ props.item.URL }}</td>
              <td class="text-xs-left">{{ props.item.Status }}</td>
              <td class="text-xs-left">{{ props.item.Time }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import commonApi from "../../api/index.js";
export default {
  name: "Crawler",
  data() {
    return {
      desserts: [
        {
          id: "1",
          URL: "http://www.google.com",
          Status: 6.0,
          Time: 24
        },
        {
          id: "2",
          URL: "http://www.facebook.com",
          Status: 6.0,
          Time: 24
        },
        {
          id: "3",
          URL: "http://www.reddit.com",
          Status: 6.0,
          Time: 24
        },
        {
          id: "4",
          URL: "http://www.youtube.com",
          Status: 6.0,
          Time: 24
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped>
</style>
