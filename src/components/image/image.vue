<script>
    require('./image.scss')
    import dataServices from '../../dataservices/dataservices'
    export default{
        template:require('./image.html'),
        data(){
            return{

              updating:false

            }
        },
      methods:{

        updateMedia:function(){

          dataServices.updateMediaViaId(this.currmedia).then((res)=>{

            console.log(res);
          })


        }
      },
      props:['currmedia'],
        components:{

        }
    }
</script>
