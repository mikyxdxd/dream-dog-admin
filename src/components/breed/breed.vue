<script>
    require('./breed.scss')
    import dataServices from '../../dataservices/dataservices'
    export default{
        template:require('./breed.html'),
        ready(){
          dataServices.getBreedViaId(this.$route.params.breedId).then((res)=>{
            this.breed = res.data;
            this.breedCpy = JSON.parse(JSON.stringify(this.breed));
            this.$nextTick(()=>{
                        $('.ui.checkbox').checkbox();
            })
          })

        },
        data(){
            return{
              breed:null,
              showEdit:false,
              breedCpy:null,
              updating:false,
              showMedias:true,
              newBreed:''
            }
        },
        methods:{

          removeBreed(index){

            this.dogCpy.breeds.splice(index,1);
          },

          reverse(chara,sec){

            chara.highlight = !chara.highlight;
          },

          updateBreed(){

            this.updating = true;

            dataServices.updateBreedViaId(this.breed).then((res)=>{

              if(res.data.result == 'OK'){
                this.updating = false;
                this.breed = res.data.data;
                toastr.success(`The breed ${this.breed.id} has been updated`);

              }
            })

          }
//
//          addNewBreed(dogCpy){
//
//            if(this.newBreed.length > 0) {
//              dogCpy.breeds.push(this.newBreed);
//              this.newBreed = '';
//            }
//          },

//          updateDogViaId(){
//            this.updating = true;
//            dataServices.updateDogViaId(this.dogCpy.id,this.dogCpy).then((res)=>{
//
//              if(res.data.result == 'OK'){
//                this.updating = false;
//                toastr.success(`Update Dog ${this.dog.id}`)
//                this.dog = res.data.dog;
//                this.dogCpy = JSON.parse(JSON.stringify(this.dog));
//                this.showEdit = false;
//              }
//            })
//          }

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
