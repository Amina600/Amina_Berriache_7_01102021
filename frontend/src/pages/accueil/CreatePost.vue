<template>
    <div class="container" >
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
            <div class="show-post">
                <button class="btn-recent btn-primary">Récent</button>
                <button class="btn-populaire btn-primary">Populaire</button>
            </div>
        </div>
        <PostToEdit :reveal="reveal" :togglePostPopup="togglePostPopup"/>
    </div>
</template>

<script>
   //import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    //import axios from "axios";
    import UserIcon from "../layout/UserIcon";
   import PostToEdit from "./PostToEdit";


    export default {
        name: "CreatePost",
        components: {
            'UserIcon': UserIcon,
            'PostToEdit': PostToEdit,
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
            margin: 50px 100px 115px 100px;
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

        .show-post {
            margin-top: 65px;

            .btn-recent {
                width: 180px;
                height: 40px;
                border-radius: 20px;
                margin-right: 10px;
                background-color: #f9abab;
                color: #fff;
                font-weight: bolder;
                font-size: 1.2em;
                border: 1px solid #f9abab;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                transition: all 0.4s ease-in-out;

                &:hover {
                    background-color: lighten(#f9abab, 2%);
                    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.6);
                }
            }

            .btn-populaire {
                width: 180px;
                height: 40px;
                border-radius: 20px;
                margin-right: 10px;
                background-color: #f9abab !important;
                color: #fff;
                font-weight: bolder;
                font-size: 1.2em;
                border: 1px solid #f9abab;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                transition: all 0.4s ease-in-out;

                &:hover {
                    background-color: lighten(#f9abab, 2%);
                    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.6);
                }

            }
        }

    }

</style>