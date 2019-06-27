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
                    <v-text-field v-model="name" :rules="nameRules" solo hide-details label="Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="phone"
                      :mask="mask"
                      solo
                      hide-details
                      label="Contact Number"
                    ></v-text-field>
                  </v-flex>
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
                        <v-radio-group v-model="gender" row dark>
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
                          v-model="date"
                          label="Date of Birth"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
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
            <v-btn large>Update</v-btn>
          </v-flex>
        </v-layout>
        <br>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "ProfileEdit",
  data: () => ({
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
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    password: "",
    show1: false,
    url: "http://civilcode.ge/images/2/24/Blank-avatar.png"
  }),
  computed: {
    passwordValidation(){
      let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      if(this.password == "")
        return "white"
      else if(this.password.match(decimal))
        return "green"
      else
        return "red"
    }
  },
  methods:{
    fileChange(e){
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    imgClick(){
      document.getElementById("inputUpload").click();
    }
  }
};
</script>

<style scoped>
</style>
