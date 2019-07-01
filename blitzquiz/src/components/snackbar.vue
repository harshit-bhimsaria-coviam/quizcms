<template>
    <v-snackbar
        v-model="snackbar"
        right
        top
        timeout=4000
      >
        {{ text }}
        <v-btn
          color="red"
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
</template>

<script>
export default {
    name: "Snackbar",
    props: {
        text: String,
        snackbar: false
    }
}
</script>

Collapse



Message Input
