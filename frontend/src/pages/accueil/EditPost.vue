<template>
    <div class="bloc-post" v-if="reveal">
        <div class="overlay" v-on:click="togglePostPopup"></div>

        <div class="post">
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
                <div class="message">
                            <textarea name="message-post" v-model="content" id="message-post" cols="45" rows="3"
                                      placeholder="Dites bonjour !"></textarea>
                    <div id="preview">
                        <video controls v-if="url && fileType === 'VIDEO'" :src="url"/>
                        <img v-if="url && fileType === 'IMAGE'" :src="url"/>
                        <button type="button" v-if="url" v-on:click="clear"
                                class="btn-close btn btn-preview">
                        </button>
                    </div>
                </div>
                <div class="layout">

                    <label for="file-input">
                        <font-awesome-icon class="icon-select" icon="image"/>
                    </label>
                    <input id="file-input" type="file" accept="image/*,video/mp4" ref="fileUpload"
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
                url: this.postToEdit?.urlMedia || null,
                fileType: this.getFileType(this.postToEdit?.urlMedia),
                content: this.postToEdit?.content || '',
                file: null,
                user,
                deleteFile: false
            }
        },
        methods: {
            // Télécharger les photos
            onFileChange(e) {
                this.file = e.target.files[0];
                this.url = URL.createObjectURL(this.file);
                this.fileType = this.getFileType(this.file.name);
            },
            clear: function () {
                this.url = ''
                this.$refs.fileUpload.value = null;
                this.deleteFile = true;
            },
            getFileType: function(name) {
                if (!name) return null;
                else if (name.slice(-3) === 'mp4') return 'VIDEO';
                else return 'IMAGE';
            },
            savePost: async function () {
                let post = {
                    id: this.postToEdit?.id,
                    content: this.content,
                    userId: this.user.id,
                    deleteFile: this.deleteFile
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
        z-index: 100;

        .overlay {
            background: rgba(245, 241, 241, 0.589);
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }

        .post {
            height: calc(100vh - 10%);
            max-height: 600px;
            width: 500px;
            max-width: 100vw;
            overflow-y: scroll;
            background: white;
            color: #333;
            position: fixed;
            top: 5%;
            box-shadow: 0 0 7px 0 rgb(150, 149, 149);
            display: flex;
            flex-direction: column;

            .header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                border-bottom: 0.2px solid rgb(212, 208, 208);
                width: 100%;
                padding: 15px 10px 15px 15px;

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
                display: flex;
                flex-direction: column;
                flex-grow: 1;

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
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;

                    textarea {
                        resize: none;
                        border: none;
                        color: black;
                        font-size: 1em;
                        outline: none;
                        flex-grow: 1;
                    }

                    #preview {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: relative;
                    }

                    img {
                        border: 1px solid #cccccc;
                        border-radius: 5px;
                        width: 100%;
                        max-height: 300px;
                        object-fit: cover;
                    }
                    video{
                        border: 1px solid #cccccc;
                        border-radius: 5px;
                        width: 100%;
                        object-fit: cover;
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
        }
    }

    @media screen and (max-width: 450px) {
        .bloc-post {
           .overlay{
               background-color: white;
           }
            .post {

                top: 0;
                max-width: 100vw !important;
                height: 100% !important;

                .content {
                    .layout {
                        flex-direction: column;
                        align-items: flex-start;
                        margin-top: 20px;

                        .icon-select {
                            font-size: 3.5em;
                        }

                        .btn-post {
                            width: 100%;
                            margin-top: 10px;
                            padding: 10px;

                        }
                    }
                }

            }
        }
    }
</style>