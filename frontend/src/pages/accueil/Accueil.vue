<template>
    <Nav/>
    <CreatePost/>
    <Posts/>
</template>
<script>
    import Nav from "../layout/Nav";
    import CreatePost from "./CreatePost";
    import Posts from "./Posts"


    export default {
        name: 'Accueil',
        components: {
            Nav,
            CreatePost,
            Posts
        }
    }
</script>
<style scoped lang="scss">

</style>
