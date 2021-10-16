<template>
    <div class="container" >
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
                                    <strong>{{user.pseudo}}</strong>
                                </p>
                            </div>
                        </div>
                        <div class="message">
                            <textarea name="message-post" v-model="content" id="message-post" cols="50" rows="4"
                                      placeholder="Dites bonjour !"></textarea>
                            <div id="preview">
                                <img v-if="url" :src="url"/>
                                <button type="button" v-if="url" v-on:click="clear"
                                        class="btn-close btn btn-preview">
                                </button>
                            </div>
                        </div>
                        <div class="layout">

                            <label for="file-input">
                                <font-awesome-icon class="icon-select" icon="image"/>
                            </label>
                            <input id="file-input" type="file" accept="image/*" ref="fileUpload"
                                   @change="onFileChange"/>


                            <button v-on:click="save" :class="{'disabled': !content?.length}" class="btn-post btn-primary"
                                    :disabled="!content?.length" aria-disabled="true">Publier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    import axios from "axios";

    export default {
        name: "Createposte",
        components: {
            'font-awesome-icon': FontAwesomeIcon
        },
        data() {
            let user = JSON.parse(localStorage.getItem('user'));

            return {
                reveal: false,
                url: null,
                content: '',
                file: null,
                user
            }
        },

        methods: {
            // Toggle Post popup
            togglePostPopup: function () {
                this.reveal = !this.reveal;
            },
            // Télécharger les photos
            onFileChange(e) {
                this.file = e.target.files[0];
                this.url = URL.createObjectURL(this.file);
            },
            clear: function () {
                this.url = ''
                this.$refs.fileUpload.value = null
            },
            save: async function () {
                let post = {
                    content: this.content,
                    UserId: this.user.id,
                };

                // Request
                try {
                    const config = {headers: {'Content-Type': 'multipart/form-data'}};
                    let fd = new FormData();
                    fd.append('post', JSON.stringify(post));
                    fd.append('file', this.file);
                    await axios.post("post/", fd, config)
                    this.$router.go()
                } catch (error) {
                    console.log(error)
                }
            }
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
                top: 15%;
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
                        textarea {
                            resize: none;
                            border: none;
                            color: black;
                            font-size: 1em;
                            outline: none;
                        }

                        #preview {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            position: relative;
                        }

                        #preview img {
                            max-width: 100%;
                            max-height: 150px;
                        }

                        .btn-preview {
                            position: absolute;
                            right: 0;
                            top: 0;
                        }

                    }

                    .layout {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 20px;

                        .icon-select {
                            font-size: 2.5em;
                            color: #f9abab;
                            cursor: pointer;

                            &:hover {
                                color: #f8d1d1;
                            }
                        }

                        input {
                            display: none;
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
                                background-color: lighten(forestgreen, 5%);
                            }
                            &.disabled{
                                background-color: darkgrey;
                                border: 1px solid darkgrey;
                            }
                        }
                    }

                }


            }
        }


    }

</style>