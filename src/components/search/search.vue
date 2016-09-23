<script>
    require('./search.scss')
    export default{
        template:require('./search.html'),
        data(){
            return{

            }
        },
      ready(){

        $('.ui.dropdown')
          .dropdown()
        ;
      },
        components:{

        }
    }
</script>
