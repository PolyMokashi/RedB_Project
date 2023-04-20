<template>
  <v-app>
    <v-main>
      <nav class="my_nav d-none d-md-block">
        <v-container
          class="fill-height d-flex justify-space-between align-center"
        >
          <div class="logo">
            <a href="RedB" target="_blank_"
              ><img
                width="150"
                src="https://i.ibb.co/LdPZt21/Picture2.png"
                alt=""
            /></a>
          </div>
          <div class="links">
            <a
              class="link text-decoration-none white--text"
              v-for="(items, i) in links"
              :key="i"
              :href="items.url"
            >
              <span class="white underline_left"></span>
              <span :class="items.ico">
                {{ items.title }}
              </span>
              <span class="white underline_right"></span>
            </a>
          </div>
          <a href="/LoginBlood"
            ><button class="btn">
              <span class="mdi mdi-logout">Log Out</span>
            </button></a
          >
        </v-container>
      </nav>
      <nav
        class="my_nav d-md-none"
        style="position: absolute; bottom: 1px; width: 100%"
      >
        <v-container
          class="fill-height d-flex justify-space-between align-center"
        >
          <!-- <div class="logo"><a href="" target="_blank_"><img width="40" src="https://i.ibb.co/LdPZt21/Picture2.png" alt="" /></a></div> -->
          <div class="links">
            <a
              class="link text-decoration-none white--text"
              v-for="(items, i) in links"
              :key="i"
              :href="items.url"
            >
              <span class="white underline_left"></span>
              <i :class="items.icon"></i>
              <span class="white underline_right"></span>
            </a>
          </div>
          <div class="action_btn">
            <v-btn fab small><i class="ri-file-download-line"></i></v-btn>
          </div>
        </v-container>
      </nav>
      <div class="bg">
        <div class="lamp">
          <div class="lava">
            <div class="blob" v-for="i in 7" :key="i"></div>
            <div class="blob top"></div>
            <div class="blob bottom"></div>
          </div>
        </div>
        <!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <defs>
                    <filter id="goo">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                      <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                  </defs>
                </svg> -->
      </div>
      <v-card
        class="mx-auto mt-10 elevation-9 my2-card"
        max-width="1100"
        outlined
      >
        <v-card-title
          ><h2 style="font-family: Times New Roman">
            Blood Requests
          </h2></v-card-title
        >
        <v-data-table
          :headers="headers"
          :items="list"
          :search="search"
          :item-key="itemKey"
          class="elevation-2"
          fixed-header
          height="350px"
        >
          <v-divider inset></v-divider>
          <template v-slot:top>
            <v-toolbar flat color="white">
              <div class="d-flex w-100">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  dense
                  outlined
                  single-line
                  hide-details
                ></v-text-field>
              </div>
            </v-toolbar>
          </template>
          
          <template v-slot:[`item.actions`]="{ item }">
            <span>
              <v-icon color="green" class="mr-3" @click="snackbar=true,moveToAccepted(item)" v-if="!item.accepted">
                mdi-check-underline-circle-outline
              </v-icon>
              <v-snackbar
        v-model="snackbar"
        color="success"

      >
      <h3 style="color:black">Request Accepted</h3>
        <template v-slot:action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
           <strong style="color:black">Close</strong> 
          </v-btn>
        </template>
      </v-snackbar>
              <v-icon color="red" @click="snackbar2=true,moveToRejected(item)" v-if="!item.rejected">
                mdi-close-circle-outline
              </v-icon>
              <v-icon v-else @click="snackbar3=true,Deleteitem(item)">
                  mdi-close-box-outline
                </v-icon>
              <v-snackbar
        v-model="snackbar2"
        color="red"

      >
      <h3 style="color:black">Request Rejected</h3>
        <template v-slot:action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            @click="snackbar2 = false"
          >
           <strong>Close</strong> 
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar
        v-model="snackbar3"
        dark
      >
      <h3>Request Deleted</h3>
        <template v-slot:action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            @click="snackbar3 = false"
          >
           <strong>Close</strong> 
          </v-btn>
        </template>
      </v-snackbar>
            </span>
          </template>
        </v-data-table>
      </v-card>
    </v-main>
  </v-app>
</template>

   
      
      <script>
import axios from 'axios';
export default {


  mounted(){
  this.bloodBankRequest();
},
  data() {
    return {
        snackbar:false,
        snackbar2:false,
        snackbar3:false,
        accepted: false, 
        rejected: false,
      links: [
        {
          url: "/BloodBank",
          icon: "ri-home-smile-2-line",
          title: "Home",
          ico: "mdi mdi-home-outline",
        },
        {
          url: "/donors",
          icon: "ri-user-line",
          title: "Donors",
          ico: "mdi mdi-water-plus",
        },
        {
          url: "/details",
          icon: "ri-service-line",
          title: "Blood Details",
          ico: "mdi mdi-list-box",
        },
        {
          url: "/requests",
          icon: "ri-contacts-line",
          title: "Blood Requests",
          ico: "mdi mdi-bell-alert-outline",
        },
        {
          url: "/about",
          icon: "ri-contacts-line",
          title: "About",
          ico: "mdi mdi-information-outline",
        },
      ],
      search: "",
      headers: [
        {
          text: "Patient Name",
          value: "name",
          sortable: false,
          
        },
        
        {
          text: "Blood Group",
          value: "bloodgrp",
          sortable: false,
        },

        {
          text: "Hospital Name",
          value: "hospital",
          sortable: false,
        },

        {
          text: "Quantity Of Bags",
          value: "quantity",
          sortable: false,
        },
        { text: "Actions", value: "actions", sortable: false, width: "100px" },
      ],
      list: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: "",
        bloodgrp: "",
        hospital: "",
        quantity: "",
      },
      defaultItem: {
        id: 0,
        name: "",
        bloodgrp: "",
        hospital: "",
        quantity: "bags",
      },
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.list = [
        {
          id: 1,
          name: "Poly Mokashi",
          bloodgrp: "A+",
          hospital: "D Y Patil Hospital",
          quantity: "2 bags",
          accepted: false, 
        rejected: false,
        },
        {
          id: 2,
          name: "Poly Mokashi",
          bloodgrp: "A+",
          hospital: "D Y Patil Hospital",
          quantity: "2 bags",
          accepted: false, 
        rejected: false,
        },
        {
          id: 3,
          name: "Poly Mokashi",
          bloodgrp: "A+",
          hospital: "D Y Patil Hospital",
          quantity: "2 bags",
          accepted: false, 
        rejected: false,
        },
        {
          id: 4,
          name: "Poly Mokashi",
          bloodgrp: "A+",
          hospital: "D Y Patil Hospital",
          quantity: "2 bags",
          accepted: false, 
        rejected: false,
        },
        {
          id: 5,
          name: "Poly Mokashi",
          bloodgrp: "A+",
          hospital: "D Y Patil Hospital",
          quantity: "2 bags",
          accepted: false, 
        rejected: false,
        },
        {
          id: 6,
          name: "Poly Mokashi",
          bloodgrp: "A+",
          hospital: "D Y Patil Hospital",
          quantity: "2 bags",
          accepted: false, 
        rejected: false,
        },
        {
          id: 7,
          name: "Poly Mokashi",
          bloodgrp: "A+",
          hospital: "D Y Patil Hospital",
          quantity: "2 bags",
          accepted: false, 
        rejected: false,
        },
        {
          id: 8,
          name: "Poly Mokashi",
          bloodgrp: "A+",
          hospital: "D Y Patil Hospital",
          quantity: "2 bags",
          accepted: false, 
        rejected: false,
        },
      ];
    },

    

    async bloodBankRequest(){
   await axios
    .get("http://localhost:4000/get/blood/request").then((result)=>{

let alldata = result.data;
console.log(alldata)
this.list=alldata
console.log(this.list);

    }).catch((err)=>{
      console.log(err);
    })
  },

    moveToAccepted(item) {
      item.accepted = true;
      item.rejected = true;
      this.acceptedItems.push(item);
      
    },

    moveToRejected(item) {
      item.rejected = true;
      item.accepted = false;
      this.rejectedItems.push(item);
      
    },
    async Deleteitem(item) {
console.log(item);
   await axios
    .delete(`http://localhost:4000/delete/request/${item}}`).then((data)=>{
console.log(data)
    }).catch((err)=>{
    console.log(err)
    })
    
    const index = this.list.indexOf(item);
      this.list.splice(index, 1);
    },
    
  },
  
  
};
</script>
      <style>
@import url("https://fonts.cdnfonts.com/css/event-horizon");
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-family: "Helvetica", sans-serif;
}
#app {
  /*background: url(https://images.unsplash.com/photo-1551970634-747846a548cb?ixlib)
          center/cover no-repeat;*/
  background-color: #470202;
  background: radial-gradient(
    ellipse at bottom,
    rgb(67, 13, 13),
    rgb(19, 3, 3)
  );
  overflow: hidden;
  z-index: 1;
}
.my_nav {
  backdrop-filter: blur(10px);
}
.link {
  padding: 10px 20px;
  position: relative;
}
.link .underline_left,
.link .underline_right {
  display: block;
  position: absolute;
  height: 4px;
  width: 0px;
  bottom: -4px;
  transition: 0.25s;
}
.link .underline_left {
  left: 50%;
  border-radius: 2px 0 0 2px;
}
.link .underline_right {
  right: 50%;
  border-radius: 0 2px 2px 0;
}
.link:hover .underline_left {
  width: 50%;
  left: 0;
}
.link:hover .underline_right {
  width: 50%;
  right: 0;
}

.btn {
  position: relative;
  border: none;
  background: #ff0000;
  backdrop-filter: blur(10px);
  color: black;
  padding: 10px 20px;
  letter-spacing: 2px;
  text-transform: uppercase;
  overflow: hidden;
  border: 2px solid #fff5;
  border-radius: 1px;
  transition: 0.25s;
}
.btn:hover {
  box-shadow: 5px 5px 5px #0005;
  transform: scale(1.025);
}
.btn:active {
  box-shadow: 0 0 0 #fffdfd;
  transform: scale(1.5);
}
.btn::before {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.25) 50%,
    transparent 50%
  );
  top: 0;
  left: -80%;
  transform: skew(-45deg);
  transition: 1s;
}
.btn:hover::before {
  left: 120%;
}

/* ----------- lamp css ------------- */

.lamp {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  width: 100vw;
  min-width: 100vw;
  z-index: -1;
  /*filter: blur(100px);*/
}

.lava {
  filter: url("#goo");
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}

.blob {
  border-radius: 50%;
  background: #372323;
  /* Other sample colors:
        Orange: #e8630a
        Pink: #EA3281
        Fuscia: #E71669
        Purple: #661BAC
        Yellow: #FDC600
        Kermit green: #75AC25
        Light blue: #3283B5
        Dark blue: #0A5D9A
        Gunmetal: #232F37
        BGLight: #1B2735
        BGDark: #090a0f
        Want more colors? check out https://coolors.co/ for inspiration.
        */
  position: absolute;
}
.blob.top {
  border-radius: 50%;
  width: 100%;
  height: 3%;
  top: -3%;
  left: 0;
}
.blob.bottom {
  border-radius: 50%;
  width: 100%;
  height: 4%;
  bottom: -3%;
  left: 0;
}
.blob:nth-child(1) {
  width: 200px;
  height: 200px;
  left: 35%;
  bottom: -15%;

  animation: wobble 4s ease-in-out alternate infinite,
    blob-one ease-in-out 13s infinite;
}
.blob:nth-child(2) {
  width: 330px;
  height: 330px;
  right: 24%;
  bottom: -65%;

  animation: wobble 5s ease-in-out alternate infinite,
    blob-two ease-in-out 22s infinite;
}
.blob:nth-child(3) {
  width: 150px;
  height: 150px;
  bottom: -15%;
  left: 34%;

  animation: wobble 6s ease-in-out alternate infinite,
    blob-three ease-in-out 16s infinite;
}
.blob:nth-child(4) {
  width: 235px;
  height: 235px;
  bottom: -19%;
  left: 30%;

  animation: wobble 7s ease-in-out alternate infinite,
    blob-four ease-in-out 12s infinite;
}
.blob:nth-child(5) {
  width: 55px;
  height: 55px;
  bottom: -25%;
  left: 34%;

  animation: wobble 9s ease-in-out alternate infinite,
    blob-five ease-in-out 32s infinite;
}
.blob:nth-child(6) {
  width: 35px;
  height: 35px;
  bottom: -25%;
  right: 34%;

  animation: wobble 10s ease-in-out alternate infinite,
    blob-six ease-in-out 12s infinite;
}
.blob:nth-child(7) {
  width: 435px;
  height: 435px;
  bottom: -85%;
  right: 40%;

  animation: wobble 11s ease-in-out alternate infinite,
    blob-seven ease-in-out 32s infinite;
}
@keyframes blob-one {
  0%,
  100% {
    transform: translatey(0);
  }
  50% {
    transform: translatey(-700%);
  }
}

@keyframes blob-two {
  0%,
  100% {
    transform: translatey(0);
  }
  50% {
    transform: translatey(-420%);
  }
}

@keyframes blob-three {
  0%,
  100% {
    transform: translatey(0);
  }
  50% {
    transform: translatey(-305%);
  }
}
@keyframes blob-four {
  0%,
  100% {
    transform: translatey(0);
  }
  50% {
    transform: translatey(-605%);
  }
}
@keyframes blob-five {
  0%,
  100% {
    transform: translatey(0);
  }
  50% {
    transform: translatey(-700%);
  }
}
@keyframes blob-six {
  0%,
  100% {
    transform: translatey(0);
  }
  50% {
    transform: translatey(-700%);
  }
}
@keyframes blob-seven {
  0%,
  100% {
    transform: translatey(0);
  }
  50% {
    transform: translatey(-300%);
  }
}

@keyframes wobble {
  50% {
    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
  }
  100% {
    border-radius: 38% 52% 75% 36% / 50% 40% 50% 60%;
  }
}

/*------ cradit -------------- */
.cradit {
  position: fixed;
  font-size: 12px;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
}
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background: #ff9b9b;
  color: #000000;
}
.w-100 {
  width: 100%;
}
.my2-card {
  width: 100%;
  max-width: 1200px;
  background-color: transparent;
  opacity: 0.75;
}
</style>