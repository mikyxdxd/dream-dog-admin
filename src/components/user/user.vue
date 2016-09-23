<script>
    require('./user.scss')
    import dataServices from '../../dataservices/dataservices'
    export default{
        template:require('./user.html'),
        ready(){
          dataServices.getUserViaId(this.$route.params.userId).then((res)=>{
            this.user = this.userCpy = res.data;
            this.userCpy = JSON.parse(JSON.stringify(this.user));
          })
        },
        methods:{

          updateUser:function(){

            console.log(this.userCpy.location);

            dataServices.updateUserViaId(this.user.id,this.userCpy).then((res)=>{
                console.log(res);
            })

          },

          showLocationSetting:function(){

            this.showLocation = true;
          }

        },
        data(){
            return{
              user:null,
              userCpy:null,
              showDogs:true,
              showEdit:false,
              showAlbums:true,
              showLocation:false
            }
        },
        components:{

          dogs:require('../search/dogs/dogs.vue'),
          albums:require('../search/albums/albums.vue'),
          medias:require('../search/medias/medias.vue')
        }
    }
</script>
