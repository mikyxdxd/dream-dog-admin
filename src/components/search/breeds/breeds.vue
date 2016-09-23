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
              breedsList:[]
            }
        },
      methods:{
        deleteDogViaId(dog,$index){


        },
        fetchAllBreeds(){
          dataServices.getAllBreeds(this.pageNum,this.pageSize).then((res)=>{
            this.updateBreedssList(res.data.data)
          })
        },
        updateBreedssList(breedsList){

          this.breedsList = breedsList
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

        }
    }
</script>
