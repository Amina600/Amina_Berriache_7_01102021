<template>
    <div class="container">
        <div class="input-container">
            <div>
                <router-link to="/profile">
                    <UserIcon :user="user" :size="45"></UserIcon>
                </router-link>
            </div>
            <div class="input">
                <input v-on:click="togglePostPopup" type="text" placeholder="Dites bonjour !">
            </div>
        </div>
        <EditPost :reveal="reveal" :togglePostPopup="togglePostPopup"/>
    </div>
</template>

<script>
    import UserIcon from "../layout/UserIcon";
    import EditPost from "./EditPost";


    export default {
        name: "CreatePost",
        components: {
            'UserIcon': UserIcon,
            'EditPost': EditPost,

        },
        data() {
            let user = JSON.parse(localStorage.getItem('user'));

            return {
                reveal: false,
                user
            }
        },
        methods: {
            // Toggle Post popup
            togglePostPopup: function () {
                this.reveal = !this.reveal;
            },

        }
    }
</script>

<style scoped lang="scss">
    .container {
        width: 1100px;

        .input-container {
            margin: 30px 150px;
            padding: 25px;
            height: 100px;
            border-radius: 5px;
            background-color: lighten(#fbf0f0, 1%);
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .input {
            flex-grow: 1;
            margin-left: 10px;

            input {
                width: 100%;
                height: 50px;
                border-radius: 25px;
                border: none;
                color: black;
                font-size: 1em;
                font-weight: 600;
                padding-left: 10px;
                outline: none;
            }
        }
    }

    @media screen and (max-width: 992px) {

        .container {
            max-width: 100% !important;
            margin: 0 !important;

            .input-container {
                margin: 30px 0;
            }
        }

    }


</style>