<template>
    <Nav/>
    <Createpost/>
    <Post/>
</template>
<script>
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
    }
</script>
<style scoped lang="scss">

</style>
