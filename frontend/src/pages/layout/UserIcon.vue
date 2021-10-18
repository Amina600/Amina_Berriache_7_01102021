<template>
    <div class="my-profile" v-if="user.profileUrl" :style="{height: size+'px', width: size+'px'}">
        <img :src="user.profileUrl">
    </div>

    <div class="profile-default" v-else :style="{height: size+'px', width: size+'px', fontSize: size/40+'em'}">
        <font-awesome-icon icon="user"/>
    </div>

</template>

<script>
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

    export default ({
        name: 'UserIcon',
        components: {
            'font-awesome-icon': FontAwesomeIcon
        },
        props: ['user', 'size'],
    })
</script>


<style lang="scss" scoped>
    .profile-default {
        border-radius: 100px;
        color: #f9abab;
        border: 1px solid #f9abab;
        cursor: pointer;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            color: #f9abab;
            border: 1px solid #f9abab;
        }

    }
    .my-profile {
        border-radius: 100px;
        cursor: pointer;
        overflow: hidden;
        border: 1px solid #f9abab;

        img{
            width: 100%;
            height: 100%;
            border-radius: 100px;
            cursor: pointer;
            object-fit: cover;
        }

        &:hover {
            color: #f9abab;
        }

    }

</style>
