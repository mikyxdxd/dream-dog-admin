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
          dataServices.defeatureImage(media).then((res)=>{
            var self = this
            if(res.data.result == "OK"){
              toastr.success(`Successfully removed ${media.id} from feature image`);
              self.mediasList = [];
              self.fetchFeatureMedias();
              self.$nextTick(()=>{
              })
            }
          })
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
