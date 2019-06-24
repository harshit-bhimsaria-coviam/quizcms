<template>
    <v-app>
        <v-container grid-list-md>
            <v-layout justify-center="true" align-center="true" dark="true" row wrap>
                <v-flex xs12>
                    <v-card dark color="primary">
                        <h1>Crawler</h1>
                    </v-card>
                </v-flex>
                <v-flex xs3>
                    <v-card>
                        <h1>URL:</h1>
                    </v-card>
                </v-flex>
                <v-flex xs7>
                    <v-text-field
                        solo
                        hide-details
                    ></v-text-field>
                </v-flex>
                <v-flex xs1>
                    <v-btn dark>Search</v-btn>
                </v-flex>
            </v-layout>
            <hr>
            <v-layout justify-center="true" align-center="true" dark="true" row wrap>
                <v-flex xs12>
                    <v-card dark color="primary">
                        <h1>Display</h1>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name: 'Crawler'
}
</script>
