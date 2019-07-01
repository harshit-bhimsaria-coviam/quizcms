<template>
  <v-app>
    <input id="inputUpload" type="file" style="display: none" @change="fileChange">
    <v-container grid-list-md>
      <v-card color="info">
        <v-layout row wrap>
          <v-flex xs4>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-img
                    @click="imgClick"
                    style="cursor: pointer"
                    height="320px"
                    width="320px"
                    :src="url"
                  />
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex xs8>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-flex xs12>
                    <v-text-field v-model="userData.userName" :rules="nameRules" solo hide-details label="Name"></v-text-field>
                  </v-flex>
                  <!-- <v-flex xs12>
                    <v-text-field
                      v-model="phone"
                      :mask="mask"
                      solo
                      hide-details
                      label="Contact Number"
                    ></v-text-field>
                  </v-flex> -->
                  <v-flex xs12>
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password"
                      hint="8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
                      counter
                      @click:append="show1 = !show1"
                      :color="passwordValidation"
                      dark
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 dark style="text-align: left">
                    <v-layout align-center>
                      <v-flex>
                        <h2 style="color: white">Gender:</h2>
                      </v-flex>
                      <v-flex xs10>
                        <v-radio-group v-model="userData.gender" row dark>
                          <v-radio label="Male" value="male" color="white"></v-radio>
                          <v-radio label="Female" value="female" color="white"></v-radio>
                        </v-radio-group>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12>
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="date"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          dark
                          v-model="userData.dob"
                          label="Date of Birth"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="userData.dob" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(userData.dob)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
          <v-flex>
            <v-btn large @click="updateProfile()">Update</v-btn>
          </v-flex>
        </v-layout>
        <br>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import commonApi from '../../api';
export default {
  name: "ProfileEdit",
  data: () => ({
    fileUpload: false,
    userData: {},
    showLoading: false,
    valid: false,
    mask: "phone",
    phone: "",
    name: "",
    gender: "",
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    nameRules: [
      v => !!v || "Name is required"
      //   v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    checkbox: false,
    password: "",
    passwordCheck: false,
    show1: false,
    url: "http://civilcode.ge/images/2/24/Blank-avatar.png"
  }),
  computed: {
    passwordValidation(){
      let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      if(this.password == "")
        return "white"
      else if(this.password.match(decimal)){
        this.passwordCheck = true;
        return "green"
      }
      else{
        this.passwordCheck = false;
        return "red"
      }
    }
  },
  methods:{
    ...mapActions(['uploadFile', 'updateProfile', 'getOne']),
    fileChange(e){
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      this.fileUpload = true
    },
    imgClick(){
      document.getElementById("inputUpload").click();
    },
    updateProfile(){
      if(this.password!="" && this.passwordCheck)
        this.userData.password = this.password
      commonApi.updateProfile(this.userData,(response)=>{
        if(this.fileUpload){
          var x = document.getElementById("inputUpload");
          var formData = new FormData()
          formData.append('file', x.files[0], x.files[0].name);
          var email = "1360bd5b-d8c9-44ad-8da3-08772e777a9e";
          this.$store.dispatch('uploadFile', {formData:formData,email:email})
          alert("Update Success!!")
          this.$router.push('/')
        }
      },()=>{alert("Profile Update Failed!!")})
    }
  },
  created(){
    //this.getAuthedUser.id
    commonApi.getOne("1360bd5b-d8c9-44ad-8da3-08772e777a9e", (response)=>{
      this.userData = response.body;
      this.url = "https://drive.google.com/uc?export=view&id="+this.userData.userAvatar
      // this.date = this.userData.dob
    },(error)=>{
      alert("Get User Data failed")
    })
  }
};
</script>

<style scoped>
</style>
