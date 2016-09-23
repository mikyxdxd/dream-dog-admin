<script>
    require('./album.scss')
    import dataServices from '../../dataservices/dataservices'
    export default{
        template:require('./album.html'),
        ready(){
          dataServices.getAlbumViaId(this.$route.params.albumId).then((res)=>{

            this.album = res.data;
            this.albumCpy = JSON.parse(JSON.stringify(this.album));
          })
        },
        methods:{




          updateAlbumViaId:function(){

            this.updating = true;
            dataServices.updateAlbumViaId(this.albumCpy.id,this.albumCpy).then((res)=>{
              this.updating = false;
              if(res.data.result == 'OK'){

                console.log(res.data.scope)
                this.album = res.data.scope;
                this.albumCpy = JSON.parse(JSON.stringify(this.album));
              }
              this.showEdit = false;

            })
          }
        },
        data(){
            return{
              album:null,
              showEdit:false,
              albumCpy:null,
              showMedias:true,
              updating:false
            }
        },
        components:{

//          dogs:require('../search/dogs/dogs.vue'),
          medias:require('../search/medias/medias.vue')

        }
    }
</script>
