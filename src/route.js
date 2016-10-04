import dataServices from './dataservices/dataservices';
export default (App)=>{

  var VueRouter = require('vue-router');
  var router = new VueRouter({

    hashbang:false,
    history:true,
    root:'/'
  })

  router.beforeEach(function (transition) {
    var verifyUser = setInterval(()=>{
        if(dataServices.getUserType() != 'VISITOR'){

           if(dataServices.getUser() != null){

               clearInterval(verifyUser);
               if(dataServices.getUserType() != 'ADMIN'){

                 transition.redirect('/login')

               }else{

                     transition.next();
                     window.scrollTo(0,0);
               }
             }
           }else{

             clearInterval(verifyUser);
             if(!(/login/).test(transition.to.path)){

               if(window.location.pathname == '/login' || window.location.pathname == '/' ){

                 transition.redirect('/login');
               }
               else{
                 transition.redirect('/login?cont=' + window.location.pathname);
               }
             }
             else{transition.next()}
           }

    },200);
  })

  router.redirect({
    '/': '/breeds',
  });

  router.map({
    'user/:userId':{
      component:require('./components/user/user.vue')
    },
    'dog/:dogId':{
      component:require('./components/dog/dog.vue')
    },
    'album/:albumId':{
      component:require('./components/album/album.vue')
    },
    'breed/:breedId':{
      component:require('./components/breed/breed.vue')
    },
    'login':{
      component:require('./components/login/login.vue')
    },
    'breeds':{
      component:require('./components/search/breeds/breeds.vue')
    },
    'users':{
      component:require('./components/search/users/users.vue')
    }
  })

  router.start(App,'#app');
}
