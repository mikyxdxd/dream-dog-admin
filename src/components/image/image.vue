<script>
    require('./image.scss')
    import dataServices from '../../dataservices/dataservices'
    export default{
        template:require('./image.html'),
        data(){
            return{

              updating:false,
              detailImage:null,

            }
        },
      ready(){
        this.getMediaViaMediaId();
      },
      methods:{

        updateMedia:function(){

          dataServices.updateMediaViaId(this.currmedia).then((res)=>{
            console.log(res);
          })


        },

        getMediaViaMediaId(){
          dataServices.getMediaViaMediaId(this.currmedia).then((res)=>{
            console.log(res)
            this.detailImage = res.data;
          })
        }
      },
      props:['currmedia'],
        components:{

        }
    }
</script>
