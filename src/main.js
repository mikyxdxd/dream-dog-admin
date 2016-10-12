import Vue from 'vue'
import VueRouter from 'vue-router';
import dataServices from './dataservices/dataservices';
// require('../node_modules/jquery/dist/jquery')
require('../node_modules/semantic-ui/dist/semantic.min.css');
require('../node_modules/semantic-ui/dist/semantic.min');
Vue.use(VueRouter);
/* eslint-disable no-new */
var app = Vue.extend({
  data:function(){
    return{

      ready:true
    }
  },
  components:{
    wheader:require('./components/header/header.vue'),
    sidebar:require('./components/sidebar/sidebar.vue')
  }
})


import route from './route'
route(app);
