<script>
    require('./sidebar.scss')
    import dataServices from '../../dataservices/dataservices'
    export default{
        template:require('./sidebar.html'),
        data(){
            return{
              user:null,
              dataServices:dataServices
            }
        },
        components:{

          login:require('../login/login.vue'),
          search:require('../search/search.vue')

        },
      watch:{

        'dataServices.getUser()': function(val, oldVal) {
          this.user = val;
        }
      }
    }
</script>
