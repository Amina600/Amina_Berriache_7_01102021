<template>
    <div class="container">
        <div class="row">
            <div class="col-1">
                <router-link to="/profile">
                    <UserIcon :user="user" :size="45"></UserIcon>
                </router-link>
            </div>
            <div class="col-11">
                <div class="input">
                    <input v-on:click="togglePostPopup" type="text" placeholder="Dites bonjour !">
                </div>
            </div>

        </div>
        <EditPost :reveal="reveal" :togglePostPopup="togglePostPopup"/>
    </div>
</template>

<script>
    //import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    import UserIcon from "../layout/UserIcon";
    import EditPost from "./EditPost";


    export default {
        name: "CreatePost",
        components: {
            'UserIcon': UserIcon,
            'EditPost': EditPost,
            //'font-awesome-icon': FontAwesomeIcon,

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

        .row {
            margin: 50px 150px 40px 150px;
            height: 100px;
            border-radius: 5px;
            padding: 25px 25px;
            background-color: lighten(#fbf0f0, 1%);
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
        }

        .col-11 {
            padding: 0 !important;
        }

        .col-1 {
            padding: 0 !important;
        }

        .input {
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

    @media screen and (min-width: 300px) and (max-width: 992px) {
        .container {
            max-width: 100% !important;
            padding: 0!important;
            margin-top: 40px;
            .row {
                max-width: 100% !important;
                margin: 0 !important;
                height: 90px;
                padding: 20px 20px 10px 20px;
                flex-wrap: nowrap!important;
                .col-11 {
                    max-width: 100% !important;
                }
                .col-1 {
                    margin-right: 5px;
                }
            }

        }
    }


</style>