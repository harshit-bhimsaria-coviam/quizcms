<template>
    <v-app>
        <!-- <input id="inputUpload" type="file">
        <v-btn color="success" @click="submit()">Upload</v-btn> -->
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12>
                    <h1>Preferences</h1>
                </v-flex>
                <v-layout justify-center row wrap>
                <v-flex xs2 style="margin:0px 20px 20px 0px" v-for="(item,index) in items" :key="index">
                    <v-card @click="selectFunction(item)" :class="[item.state?'active1':'']">
                        <div :class="[item.state?'active':'']"></div>
                        <div v-if="item.state" class="active3"><v-icon color="white" x-large>check_circle</v-icon></div>
                        <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                        aspect-ratio="1.25"
                        ></v-img>
                        <v-layout justify-center>
                        <v-card-title primary-title>
                        <div>
                            {{item.categoryName}}
                        </div>
                        </v-card-title>
                        </v-layout>
                    </v-card>
                </v-flex>
                </v-layout>
            </v-layout>
            <v-layout justify-center>
                <v-btn @click="savePreferences()" dark>Save</v-btn>
            </v-layout>
        </v-container>
    </v-app>    
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// import commonApi from '../../api/index.js'
export default {
    name: 'Preferences',
    data(){
        return{
            items: [],
            selected: {}
            // formData: null
        }
    },
    methods:{
        ...mapActions(['getCategories', 'savePreferences']),
        selectFunction(item){
            let temp = 0;
            let sel = false;
            this.items.forEach((ele)=>{
                if(ele.state==true){
                    temp+=1;
                    if(ele.categoryName==item.categoryName)
                        sel = true
                }
            })
            if(temp<4 || sel)
                item.state = !item.state;
            else
                alert("Maximum no of preferences selected!!")
        },
        savePreferences(){
            this.selected.userId="";
            this.selected.interest=[];
            this.items.forEach((ele)=>{
                if(ele.state==true){
                    this.selected.interest.push(ele.categoryName)
                }
            })
            console.log(this.selected)
            //this.$store.dispatch('savePreferences', this.selected)
        }
        // submit(){
        //     var x = document.getElementById("inputUpload");
        //     var file = x.files[0];
        //     console.log(file)
        //     console.log(file)
        //     console.log(file.name)
        //     console.log(file.size)
        //     var formData = new FormData()
        //     formData.append('file', file, file.name);
        //     commonApi.uploadFile(formData,(response)=>{
        //         alert(response.bodyText)
        //     },(error)=>{
        //         alert(error.bodyText)
        //     })
        // }
    },
    computed:{
        ...mapGetters(['getCategoryData'])
    },
    created(){
        this.$store.dispatch('getCategories',()=>{
            //console.log(this.getCategoryData)
            this.getCategoryData.forEach(element => {
                let temp = {
                    "categoryName": element.categoryName,
                    "state": false
                }
                this.items.push(temp)
            });
        })
    }
}
</script>

<style>
.active{
    background-color: black;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.30;
    z-index: 4;
}
.active1{
    border: 4px solid;
}
.active3{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 4;
    margin-top: 45%;
}
</style>
