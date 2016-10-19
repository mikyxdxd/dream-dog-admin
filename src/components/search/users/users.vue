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
              currSize: 0,
              usersList:[],
              fetching:true,
              disablePrev: true,
              disableNext: false
            }
        },
      watch:{
          'pageNum': function(val, oldVal){
               if(val == 0){
                 this.disablePrev = true;
               }else{
                 this.disablePrev = false;
               }
          },
          'currSize': function(val, oldVal){
            if(val < 50){
              this.disableNext = true;
            }else{
              this.disableNext = false;
            }
          }
      },
      methods:{
        nextPage(){
          this.pageNum++;
          if(!this.disableNext){
            this.fetchAllUsers();
          }
        },
        prevPage(){
          this.pageNum--;
          if(!this.disablePrev){
            this.fetchAllUsers();
          }
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
              this.currSize = res.data.data.length;
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
        }
      },
        components:{
          loadinganimation:require('../../loadinganimation/loadinganimation.vue')
        }
    }
</script>
