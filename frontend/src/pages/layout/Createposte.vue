<template>
    <div class="container">
        <div class="row">
            <div class="col-1">
                <router-link to="/profile">
                    <div class="profile">
                        <font-awesome-icon class="icon-profile" icon="user"/>
                    </div>
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
            <div class="bloc-post" v-if="reveal">
                <div class="overlay" v-on:click="togglePostPopup"></div>

                <div class="post card">
                    <div class="header">
                        <div class="title">
                            <h4>Créer une publication</h4>
                        </div>
                        <div v-on:click="togglePostPopup" class="btn-close btn "></div>
                    </div>

                    <div class="content">
                        <div class="user">
                            <router-link to="/profile">
                                <div class="profile">
                                    <font-awesome-icon class="icon-profile" icon="user"/>
                                </div>
                            </router-link>
                            <div class="user-name">
                                <p>
                                    <strong>Chetta</strong>
                                </p>
                            </div>
                        </div>
                        <div class="message">
                            <textarea name="message-post" id="message-post" cols="50" rows="8"
                                      placeholder="Dites bonjour !"></textarea>
                        </div>
                        <div class="layout">
                            <font-awesome-icon class="icon-select" icon="image"/>
                            <button class="btn-post btn-primary">Publier</button>
                        </div>


                    </div>


                </div>
            </div>


        </div>


    </div>
</template>

<script>
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

    export default {
        name: "Createposte",
        components: {
            'font-awesome-icon': FontAwesomeIcon
        },
        data() {
            return {
                reveal: false,
            }
        },

        methods: {
            // Toggle Post popup
            togglePostPopup: function () {
                this.reveal = !this.reveal;
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        width: 1100px;


        .row {
            margin: 50px 100px;
            height: 100px;
            border-radius: 5px;
            padding: 25px 25px;
            background-color: lighten(#fbf0f0, 1%);
        }

        .col-11 {
            padding: 0 !important;
        }

        .col-1 {
            padding: 0 !important;
        }

        .profile {
            width: 50px;
            height: 50px;
            border-radius: 25px;
            border: 1px solid #f9abab;
            cursor: pointer;
            font-size: 1.5em;
            text-align: center;
            margin: 0;
            padding: 0;
            color: #f9abab;
            position: relative;

            .icon-profile {
                position: absolute;
                font-size: 1.2em;
                left: 12px;
                bottom: 11px;
            }

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
                    background-color:lighten(#f9abab, 2%);
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

        .bloc-post {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;

            .overlay {
                background: rgba(245, 241, 241, 0.589);
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }

            .post {
                background: white;
                color: #333;
                position: fixed;
                top: 20%;
                width: 450px !important;
                box-shadow: 0 0 7px 0 rgb(150, 149, 149);

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    border-bottom: 0.2px solid rgb(212, 208, 208);
                    width: 100%;
                    margin-bottom: 15px;
                    padding: 15px;
                    padding-left: 80px;

                    .btn-close {
                        font-size: 1em;
                        color: rgb(212, 208, 208);
                        font-weight: 700;

                    }
                }

                .content {
                    padding: 15px;

                    .user {
                        display: flex;
                        justify-content: flex-start;
                        align-items: flex-end;
                        margin-bottom: 30px;

                        .user-name {
                            margin-left: 10px;
                        }
                    }

                    .message {
                        height: 200px;

                        textarea {
                            resize: none;
                            border: none;
                            color: black;
                            font-size: 1em;
                            outline: none;
                        }

                    }

                    .layout {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .icon-select {
                            font-size: 2.5em;
                            color: #f9abab;
                        }

                        .btn-post {
                            margin-top: 25px;
                            margin-bottom: 15px;
                            border-radius: 3px;
                            padding: 5px;
                            font-size: 1.1em;
                            font-weight: 600;
                            width: 120px;
                            border: 1px solid forestgreen;
                            background-color: forestgreen;

                            &:hover {
                                background-color:  lighten(forestgreen, 5%);
                            }
                        }
                    }

                }


            }
        }


    }

</style>