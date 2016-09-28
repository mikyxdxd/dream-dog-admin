
<script>
    require('./userresult.scss')
    export default{
        template:require('./userresult.html'),
        data(){
            return{

            }
        },
        methods:{
          hideResult(){
            $('#user-result').fadeOut();
          }
        },
        components:{

        },
        watch:{

          'users':{
            deep:true,
            handler:function(v,ov){

              if(v.length != 0){
                $('#user-result').fadeIn();
              }
            }
          }

        },
        props:['users', 'showsetting']
    }
</script>
