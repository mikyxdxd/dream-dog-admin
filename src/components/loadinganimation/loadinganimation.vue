<script>
    require('./loadinganimation.scss')
    import dataServices from '../../dataservices/dataservices'
    export default{
        template:require('./loadinganimation.html'),
        data(){
            return{
              user:null,
              dataServices:dataServices
            }
        }
    }
</script>
