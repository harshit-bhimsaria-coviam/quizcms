<template>
    <v-app>
        <v-layout>
            
            <v-flex md2></v-flex>
            
            <v-flex md8>
                
                <h1> Your Quiz has been successfully created</h1>
                <h2> Quiz Name: {{contestName}}</h2>
                <h2> Category : {{category}}</h2>
                <v-layout>
                    <v-flex>
                        <v-btn color="green darken-1" @click="createNewQuiz" >Create New Quiz ?</v-btn>
                        <v-btn color="green darken-1"  >Logout</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-app>
</template>
<script>
export default {
    name:'ContestCreated',
    data(){
        return{
            contestName: this.$route.params.contestName,
            category: this.$route.params.category
        }
    },
    methods:{
        createNewQuiz(){
            this.$router.push({name: 'contestCreate'})
        }
    }
}
</script>
