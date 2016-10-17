<script>
    require('./image.scss')
    import dataServices from '../../dataservices/dataservices'
    export default{
        template:require('./image.html'),
        data(){
            return{

              updating:false,
              detailImage:null,
              selectOpt: ''

            }
        },
      ready(){
      },
      methods:{

        updateMedia(){

          dataServices.updateMediaViaId(this.currmedia).then((res)=>{

            if(res.data.result == 'OK'){
            toastr.success(`${this.currmedia.id} has been updated`);
          }
          })
        },

        featureImage(){

          dataServices.featureImage(this.currmedia).then((res)=>{

            if(res.data.result == 'OK'){


              toastr.success(`${this.currmedia.id} has been featured`);
            }

          })

        },

        reportImage(){
          dataServices.reportImage(this.currmedia, this.selectOpt).then((res)=>{
            if(res.data.result == 'OK'){
              toastr.success(`${this.currmedia.id} has been reported by ${this.selectOpt} reason`);
            }
          })
        }
//        getMediaViaMediaId(){
//          dataServices.getMediaViaMediaId(this.currmedia).then((res)=>{
//            this.detailImage = res.data;
//          })
//        }
      },
      props:['currmedia'],
        components:{

        }
    }
</script>
