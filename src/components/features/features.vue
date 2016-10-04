<script>
    require('./features.scss')
    import dataServices from '../../dataservices/dataservices'
    export default{
      template:require('./features.html'),
      ready(){
        this.fetchFeatureMedias();
      },
        data(){
            return{

              mediasList:[],
              fetching:true,
              showEdit:false,
              deleting:false,
              currmedia:null

            }
        },

      methods: {

        Unfeature(media){

        },

        fetchFeatureMedias(){

          dataServices.getFeatureMedias().then((res)=>{

            this.mediasList = res.data.data;
            this.fetching = false;
          })
        }
      },

        components:{

          loadinganimation:require('../loadinganimation/loadinganimation.vue'),
          detailimage:require('../image/image.vue')

        }
    }
</script>
