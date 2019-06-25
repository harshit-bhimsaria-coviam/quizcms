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
                    <h1>URL:</h1>
                </v-flex>
                <v-flex xs7>
                    <v-text-field
                        solo
                        hide-details
                        v-model="url"
                    ></v-text-field>
                </v-flex>
                <v-flex xs1>
                    <v-btn @click="getRawData()">Search</v-btn>
                </v-flex>
            </v-layout>
            <hr>
            <br>
            <v-layout justify-center="true" align-center="true" dark="true" row wrap>
                <v-flex xs12>
                    <v-card dark color="primary">
                        <h1>Select Break Points</h1>
                    </v-card>
                </v-flex>
                <v-flex xs10>
                    <v-text-field
                        solo
                        hide-details
                    ></v-text-field>
                </v-flex>
                <v-flex xs1>
                    <v-btn dark>Break</v-btn>
                </v-flex>
            </v-layout>
            <hr>
            <br>
            <v-card dark color="primary">
            <v-layout justify-center="true" align-center="true" dark="true" row wrap>
                <v-flex xs10>
                        <h1>Display</h1>
                </v-flex>
                <v-flex xs2>
                    <v-btn dark>Display</v-btn>        
                </v-flex>
            </v-layout>
            </v-card>
            <v-card dark height=70%>
                <v-textarea color="white" background-color="black" auto-grow v-model="rawdata"></v-textarea>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
import commonApi from '../../api/index.js'
export default {
    name: 'Crawler',
    data(){
        return{
            url: "",
            rawdata: null
        }
    },
    methods:{
        getRawData(){
            commonApi.crawlerData(this.url,(response)=>{
                this.rawdata = response.bodyText
                // this.rawdata = this.rawdata.split("<")
                console.log(response.bodyText)
            },(error)=>{
                alert(error)
            })
        }
    }
}
</script>

<style scoped>
</style>
