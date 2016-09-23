<script>
    require('./albums.scss')
    import dataServices from '../../../dataservices/dataservices'
    export default{
        template:require('./albums.html'),
        ready(){

          if(this.$route.params.userId != null){
            this.userId = this.$route.params.userId;
            this.fetchUserAlbums();
//            console.log(this.userId);

          }

        },
        data(){
            return{
              pageNum:0,
              pageSize:50,
              userId:null,
              albumsList:[],
              showEdit:false
            }
        },
      methods:{
        fetchUserAlbums(){
          var self = this;
          dataServices.getAlbumsViaUserId(this.userId,this.pageNum,this.pageSize).then((res)=>{
            console.log(res.data)
            this.updateAlbumsList(res.data.data);
          })
        },
        updateAlbumsList(albumsList){
          if(!this.albumsList.length){
            this.albumsList = albumsList;
          }
        }
      },
        components:{

        }
    }
</script>
