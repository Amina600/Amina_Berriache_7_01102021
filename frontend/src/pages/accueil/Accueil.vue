<template>
    <Nav/>
    <Createpost/>
    <Post/>
</template>
<script>
    //import axios from 'axios'
    import Nav from "../layout/Nav";
    import Createpost from "../layout/Createposte";
    import Post from "../layout/Post"


    export default {
        name: 'Accueil',
        components: {
            Nav,
            Createpost,
            Post
        }
        /*async created() {
          const response = await axios.get('user')
          console.log(response)

        }*/
    }
</script>
<style scoped lang="scss">

</style>
