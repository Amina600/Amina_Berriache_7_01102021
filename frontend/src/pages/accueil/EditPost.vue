<template>
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
                    <div class="profile">
                        <UserIcon :user="user" :size="45"></UserIcon>
                        <p>{{user.pseudo}}</p>
                    </div>
                </div>
                <div class="message scrollbar">
                            <textarea name="message-post" v-model="content" id="message-post" cols="50" rows="3"
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


                    <button v-on:click="savePost" :class="{'disabled': !content.length && !url }"
                            class="btn-post btn-primary"
                            :disabled="!content.length && !url" aria-disabled="true">Publier
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import UserIcon from "../layout/UserIcon";
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    import axios from "axios";

    export default {
        name: "PostToEdit",
        components: {
            UserIcon,
            'font-awesome-icon': FontAwesomeIcon,
        },
        props: ['postToEdit', 'reveal', 'togglePostPopup'],
        data() {
            let user = JSON.parse(localStorage.getItem('user'));
            return {
                //url: this.postToEdit?.urlMedia || null,
                //content: this.postToEdit?.content || '',
                url: this.postToEdit?.urlMedia || null,
                content: this.postToEdit?.content || '',
                file: null,
                user
            }
        },
        methods: {
            // Télécharger les photos
            onFileChange(e) {
                this.file = e.target.files[0];
                this.url = URL.createObjectURL(this.file);
            },
            clear: function () {
                this.url = ''
                this.$refs.fileUpload.value = null
            },
            savePost: async function () {
                let post = {
                    id: this.postToEdit.id,
                    content: this.content,
                    userId: this.user.id,
                };

                // Request
                try {
                    const config = {headers: {'Content-Type': 'multipart/form-data'}};
                    let fd = new FormData();
                    fd.append('post', JSON.stringify(post));
                    fd.append('file', this.file);

                    // TODO put or post
                    if (this.postToEdit) {
                        await axios.put("post/", fd, config);
                    } else {

                        await axios.post("post/", fd, config);
                    }

                    this.$router.go();
                } catch (error) {
                    console.log(error)
                }
            }
        }

    }
</script>

<style scoped lang="scss">

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
                padding: 15px 10px 15px 80px;

                h4 {
                    margin-bottom: 0 !important;
                }

                .btn-close {
                    font-size: 1em;
                    color: rgb(212, 208, 208);
                    font-weight: 700;
                    border-radius: 30px;
                    padding: 10px 10px;
                    background-color: #cccccc;

                }

            }

            .content {
                padding: 15px;

                .user {

                    .profile {
                        display: flex;
                        align-items: center;
                        margin-bottom: 30px;

                        p {
                            margin: 5px 10px;
                        }

                    }

                }

                .message {

                    #scrollBar {
                        overflow-y: auto;
                        max-height: 300px;
                    }

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
                        width: 100%;
                        object-fit: cover;
                        border: 1px solid #cccccc;
                        border-radius: 5px;
                    }
                    .btn-preview {
                        position: absolute;
                        right: 4px;
                        top: 0px;
                        border-radius: 30px;
                        padding: 10px 10px;
                        background-color: whitesmoke;
                    }
                }
                .layout {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;

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

                        &.disabled {
                            background-color: darkgrey;
                            border: 1px solid darkgrey;
                        }

                    }
                }
            }

            .scrollbar {
                overflow-y: scroll;
                max-height: 350px;
            }


        }
    }


</style>