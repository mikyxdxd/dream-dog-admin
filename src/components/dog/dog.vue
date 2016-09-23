<script>
    require('./dog.scss')
    import dataServices from '../../dataservices/dataservices'
    export default{
        template:require('./dog.html'),
        ready(){
          dataServices.getDogViaId(this.$route.params.dogId).then((res)=>{

            this.dog = res.data;
            this.dogCpy = JSON.parse(JSON.stringify(this.dog));
          })
        },
        data(){
            return{
              dog:null,
              showEdit:false,
              dogCpy:null,
              updating:false,
              showMedias:true,
              newBreed:''
            }
        },
        methods:{

          removeBreed(index){

            this.dogCpy.breeds.splice(index,1);
          },

          addNewBreed(dogCpy){

            if(this.newBreed.length > 0) {
              dogCpy.breeds.push(this.newBreed);
              this.newBreed = '';
            }
          },

          updateDogViaId(){
            this.updating = true;
            dataServices.updateDogViaId(this.dogCpy.id,this.dogCpy).then((res)=>{

              if(res.data.result == 'OK'){
                this.updating = false;
                toastr.success(`Update Dog ${this.dog.id}`)
                this.dog = res.data.dog;
                this.dogCpy = JSON.parse(JSON.stringify(this.dog));
                this.showEdit = false;
              }
            })
          }

        },
        watch:{

          'showEdit':function(old,val){
            if(val == true){

              this.dogCpy = JSON.parse(JSON.stringify(this.dog))
            }
          }

        },
        components:{

          dogs:require('../search/dogs/dogs.vue'),
          medias:require('../search/medias/medias.vue')

        }
    }
</script>
