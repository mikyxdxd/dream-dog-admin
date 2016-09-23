<script>
    require('./dogs.scss')
    import dataServices from '../../../dataservices/dataservices'
    export default{
        template:require('./dogs.html'),
        ready(){

          if(this.$route.params.userId != null){

            this.userId = this.$route.params.userId;
            this.fetchUserDogs();
//            console.log(this.userId);

          }

        },
        data(){
            return{
              pageNum:0,
              pageSize:50,
              userId:null,
              showEdit:false,
              deleting:false,
              dogsList:[]
            }
        },
      methods:{

        deleteDogViaId(dog,$index){

          this.deleting = true;
//          this.dogsList.splice($index,1);

          dataServices.deleteDogViaId(dog.id).then((res)=>{
            this.deleting = false;
            this.dogsList.splice($index,1);
            console.log(res);
          })

        },
        fetchUserDogs(){
          var self = this;
          dataServices.getDogsViaUserId(this.userId,this.pageNum,this.pageSize).then((res)=>{
            this.updateDogsList(res.data.data);
          })
        },
        updateDogsList(dogsList){
          if(!this.dogsList.length){
            this.dogsList = dogsList;
          }
        }
      },
        components:{

        }
    }
</script>
