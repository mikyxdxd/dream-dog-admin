<script>
    require('./search.scss')
    import dataServices from '../../dataservices/dataservices'
    export default{
        template:require('./search.html'),
        data(){
            return{
              selected2: '',
              selected1: '',
              searchString: '',
              users: null,
              userShowSetting: false,
              dog: null,
              dogShowSetting: false,
              album: null,
              albumShowSetting: false,
            }
        },
      ready(){

        $('.ui.dropdown')
          .dropdown()
        ;
      },
      methods:{
        search: function(){
          //search Users
          if(this.selected1 == '0'){
            if(this.selected2 == '0'){
              this.searchUserViaName();
            }else{
              this.searchUserViaID();
            }
          //search Albums
          }else if(this.selected1 == '1'){
            if(this.selected2 == '0'){
              this.searchAlbumsViaName();
            }else{
              this.searchAlbumsViaID();
            }
          //search Dogs
          }else{
            if(this.selected2 == '0'){

            }else{
              console.log('aaa');
              this.searchDogViaID();
            }
          }
        },
        searchUserViaID: function(){
          dataServices.getUserViaId(this.searchString).then((res)=>{
            console.log(res.data);
            if(res.status == 200){
              if(res.data){
                var user = {
                  'avatar': res.data.avatar,
                  'following:':res.data.followed,
                  'id': res.data.id,
                  'name': res.data.name,
                  'signature': res.data.signature,
                };
                this.users = [];
                this.users.push(user);
                this.userShowSetting = true;
              }else{
                toastr.error("Your search doesn't have any result");
                console.log('no result');
              }
            }else{
              toastr.error("Error");
              console.log("Error");
            }
          })
          .catch((error)=>{
            toastr.error("Error");
            console.log(error);
          });
        },
        searchUserViaName: function(){
          dataServices.getUsersViaNickname(0, 10, this.searchString).then((res)=>{
            if(res.status == 200){
              if(res.data.data.length > 0){
                console.log(res.data.data);
                this.users = res.data.data;
                this.userShowSetting = true;
              }else{
                toastr.error("Your search doesn't have any result");
                console.log('no result');
              }
            }else{
              toastr.error("Error");
              console.log("Error");
            }
          });
        },
        searchAlbumsViaName(){
          toastr.error("Sorry, you can only search Album via ID.");
        },
        searchAlbumsViaID(){
          dataServices.getAlbumViaId(this.searchString).then((res)=>{
            if(res.status == 200){
              if(res.data){
                console.log(res.data);
                this.album = res.data;
                this.albumShowSetting = true;
              }else{
                toastr.error("Your search doesn't have any result");
                console.log('no result');
              }
            }else{
              toastr.error("Error");
              console.log("Error");
            }
          })
          .catch((error)=>{
            toastr.error("Error");
            console.log("Error");
          });
        },
        searchDogViaID(){
          dataServices.getDogViaId(this.searchString).then((res)=>{
            if(res.status == 200){
             if(res.data){
               console.log(res.data);
               this.dog = res.data;
               this.dogShowSetting = true;
             }else{
               toastr.error("Your search doesn't have any result");
               console.log('no result');
             }
            }else{
              toastr.error("Error");
              console.log("Error");
            }
          })
          .catch((error)=>{
            toastr("Error");
            console.log("Error");
          });
        },
        searchDogViaName(){
          toastr.error("Sorry, you can only search Dog via Name.");
        }

      },

        components:{
          userresult: require('./userresult/userresult.vue'),
          dogresult: require('./dogresult/dogresult.vue'),
          albumresult: require('./albumresult/albumresult.vue')
        }
    }
</script>
