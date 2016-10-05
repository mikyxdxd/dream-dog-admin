<script>
    require('./users.scss')
    import dataServices from '../../../dataservices/dataservices'
    export default{
        template:require('./users.html'),
        ready(){

          if(this.$route.query.nickname){
            this.userNickname = this.$route.query.nickname;
            this.fetchAllUsers();
          }else {
            this.fetchAllUsers();
          }
        },
        data(){
            return{
              pageNum:0,
              pageSize:50,
              usersList:[],
              fetching:true
            }
        },
      methods:{
        deleteDogViaId(dog,$index){

        },
        fetchAllUsers(){
          this.fetching = true;
          if(this.userNickname){
            dataServices.getUsersViaNickname(this.pageNum, this.pageSize, this.userNickname).then((res) => {
              this.updateUsersList(res.data.data);
            this.updateUsersList(res.data.data);
            this.fetching = false;
            })
          }else {
            dataServices.getAllUsers(this.pageNum, this.pageSize).then((res) => {
              this.updateUsersList(res.data.data);
              this.fetching = false;
            })
          }
        },
        updateUsersList(usesrList){

          this.usersList = usesrList;
          this.usersList.sort((a,b)=>{
            var keyA = a.id,
            keyB = b.id;

          if(keyA < keyB) return -1;
          if(keyA > keyB) return 1;
          return 0;
        });
        },
        updateBreed(breed,index){
          this.breedsList.$set(index, Object.assign({}, breed, {$$updating:true}));
          dataServices.updateBreedViaId(breed.id,breed).then((res)=>{
            this.breedsList.$set(index, Object.assign({}, breed, {$$updating:false}));
            this.breedsList.$set(index,res.data.data);
            toastr.success(`Breed ${res.data.data.id} has been upated`)
          })
        },
      },
        components:{
          loadinganimation:require('../../loadinganimation/loadinganimation.vue')
        }
    }
</script>
