<script>
    require('./breeds.scss')
    import dataServices from '../../../dataservices/dataservices'
    export default{
        template:require('./breeds.html'),
        ready(){

          this.fetchAllBreeds();
        },
        data(){
            return{
              pageNum:0,
              pageSize:300,
              breedsList:[],
              fetching:true
            }
        },
      methods:{
        deleteDogViaId(dog,$index){


        },
        fetchAllBreeds(){
          this.fetching = true;
          dataServices.getAllBreeds(this.pageNum,this.pageSize).then((res)=>{
            this.fetching = false;
            this.updateBreedssList(res.data.data)
          })
        },
        updateBreedssList(breedsList){
          this.breedsList = breedsList;
          this.breedsList.sort((a,b)=>{
            var keyA = a.id,
                keyB = b.id;

            if(keyA < keyB) return -1;
            if(keyA > keyB) return 1;
            return 0;
          });
        },
        updateBreed(breed,index){

          this.breedsList.$set(index, Object.assign({}, breed, {$$updating:true}));
          dataServices.updateBreedViaId(breed).then((res)=>{
            this.breedsList.$set(index, Object.assign({}, breed, {$$updating:false}));
            this.breedsList.$set(index,res.data.data);
            toastr.success(`Breed ${res.data.data.id} has been upated`)
          })
        },
        switchVal(breed,key){
          breed[key]= !breed[key];
        }
      },
        components:{

          loadinganimation:require('../../loadinganimation/loadinganimation.vue')

        }
    }
</script>
