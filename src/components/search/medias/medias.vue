<script>
    require('./medias.scss')
    import dataServices from '../../../dataservices/dataservices'
    export default{
        template:require('./medias.html'),
      ready(){

          console.log(this.source)

        //Media Source
        switch(this.source){

          case 'user':
            this.userId = this.$route.params.userId;
            break;

          case 'breed':
            this.breedId = this.$route.params.breedId;
            break

          case 'scope':
            this.albumId = this.$route.params.albumId;
            break;

          case 'dog':
            this.dogId = this.$route.params.dogId;
            break;
        }

        this.fetchMedias();

      },
        data(){
            return{

              pageNum:0,
              pageSize:200,
              dogId:null,
              breedId:null,
              albumId:null,
              userId:null,
              currmedia:null,
              mediasList:[],
              fetching:true,
              showEdit:false,
              deleting:false

            }
        },

      props:['source'],

      methods:{

        deleteMediaViaId(media,index){

          this.deleting = true;

          dataServices.deleteMediaViaId(media.id).then((res)=>{

            if(res.data.result == 'OK'){

              this.mediasList.splice(index,1);
              this.deleting = false;

            }

          })

        },

        fetchMedias(){
          var self = this;
          this.fetching = true;
          switch(this.source){
            case 'scope':
              dataServices.getMediaViaAlbumId(this.albumId,this.pageNum,this.pageSize).then((res)=>{

                self.mediasList = res.data.data;
                this.fetching = false;
              })
              break;

        case 'breed':
          dataServices.getMediaViaBreedId(this.breedId,this.pageNum,this.pageSize).then((res)=>{

            self.mediasList = res.data.data;
          this.fetching = false;
        })
          break;

            case 'dog':
              dataServices.getMediaViaDogId(this.dogId,this.pageNum,this.pageSize).then((res)=>{

                self.mediasList = res.data.data;
                this.fetching = false;
              })
              break;

        case 'user':
          dataServices.getMediaViaUserId(this.userId,this.pageNum,this.pageSize).then((res)=>{

            self.mediasList = res.data.data;
            this.fetching = false;
        })
          break;

          }

        }


      },
        components:{

          detailimage:require('../../image/image.vue'),
          loadinganimation:require('../../loadinganimation/loadinganimation.vue')

        }
    }
</script>
