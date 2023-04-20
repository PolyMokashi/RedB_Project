import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginHospital from '../views/LoginHospital.vue'
import LoginBlood from '../views/LoginBlood.vue'
import AboutView from '../views/AboutView.vue'
import RegisterView from '../views/RegisterView'
import DashBoardHospital from '../views/DashBoardHospital'
import DashBoardBlood from '../views/DashBoardBlood'
import RegisterHospital from '../views/RegisterHospital'
import RegisterBlood from '../views/RegisterBlood'
import DonorsBlood from '../views/DonorsBlood'
import BloodDetails from '../views/BloodDetails'
import BloodRequests from '../views/BloodRequests'
import HospitalRequests from '../views/HospitalRequests'
import ReqStatus from '../views/ReqStatus'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'hospital_login',
    component: LoginHospital
  },
  {
    path: '/LoginBlood',
    name: 'Blood_login',
    component: LoginBlood
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView

  },
  {
    path: '/BloodBank',
    name: 'blood_bank_dashboard',
    component: DashBoardBlood
  },
  {
    path: '/RegisterHospital',
    name: 'hospital_register',
    component: RegisterHospital
  },
  {
    path: '/RegisterBlood',
    name: 'blood_register',
    component: RegisterBlood
  },
  {
    path: '/Hospital',
    name: 'hospital_dashboard',
    component: DashBoardHospital
  },
  {
    path: '/donors',
    name: 'donors',
    component: DonorsBlood
  },
  {
    path: '/details',
    name: 'Blood_details',
    component: BloodDetails
  },
  {
    path: '/requests',
    name: 'Blood_requests',
    component: BloodRequests
  },
  {
    path: '/hospitalrequests',
    name: 'hospital_requests',
    component: HospitalRequests
  },
  {
    path: '/status',
    name: 'request_status',
    component: ReqStatus
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
