<script>
    require('./login.scss')
    import dataServices from '../../dataservices/dataservices'

    export default{
        template:require('./login.html'),
        data(){
            return{
              username:'',
              password:'',
              loading:false,
              fetchingUser:false
            }
        },
        ready(){

            if(dataServices.getUserType() == 'ADMIN')  this.$route.router.go({path: '/'});

        },
        props:['user'],
        methods:{

          login(){
            var self = this;
            dataServices.login(this.username,this.password).then((res)=>{
              this.fetchingUser = true;
              if(res.data.access_token){
                dataServices.setUserToken(res.data.token_type + ' ' + res.data.access_token);
                this.fetchingUser = false;
                if(this.$route.query.cont){
                  this.$route.router.go({path: `${this.$route.query.cont}`})
                }else{
                  this.$route.router.go({path: `/`});
                }
              }
            })
          }
        },
        components:{


        },
        watch:{

        }
    }
</script>
