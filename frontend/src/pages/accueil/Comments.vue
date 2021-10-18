<template>
    <div class="bloc-comment">
        <div class="comment" :key="index" v-for="(comment, index) in comments">
            <div>
                <UserIcon :user="comment.User" :size="40"></UserIcon>
            </div>

            <div class="comment-post">
                <div class="content-comment">
                    <div class="user-name">
                        <div class="header-user">
                            <p>
                                <strong>{{comment.User.pseudo}}</strong>
                            </p>
                            <p class="date">
                                <em>{{comment.createdAt}}</em>
                            </p>
                        </div>
                        <font-awesome-icon v-if="comment.userId === user.id || user.isAdmin" v-on:click="deleteComment(comment.id, index)" class="icon-deleted" icon="trash-alt"/>

                    </div>
                    <div class="content">
                        <p>
                            {{comment.message}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="input-comment">
            <div class="comment-post">
                <router-link to="/profile">
                    <div class="profile">
                        <font-awesome-icon class="icon-profile" icon="user"/>
                    </div>
                </router-link>
                <div class="content-comment">
                    <input v-model="message" type="text" placeholder="Écrivez un commentaire…">
                </div>

            </div>
            <button v-if="message" v-on:click="saveComment" class="send-comment btn-primary" :class="{'disabled': !message?.length}"
                    :disabled="!message?.length" aria-disabled="true">Envoyer</button>
        </div>

    </div>

</template>

<script>
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    import axios from "axios";
    import moment from "moment";
    import UserIcon from "../layout/UserIcon";

    export default {
        name: "Comments",
        props: ['post', 'updateCommentCount'],
        components: {
            'font-awesome-icon': FontAwesomeIcon,
            'UserIcon': UserIcon
        },
        created() {
            this.getAllComments();
        },
        data(){
            let user = JSON.parse(localStorage.getItem('user'));
            return{
                message:'',
                user,
                comments: []
            }
        },
        methods: {
            saveComment: async function () {
                let comment = {
                    message: this.message,
                    postId: this.post.id
                };

                // Request
                try {
                    await axios.post("post/comment", {comment})
                    this.message = null;
                    this.getAllComments();
                    this.updateCommentCount(1);

                } catch (error) {
                    console.log(error)
                }
            },
            getAllComments: function() {
                try {
                    axios.get(`post/${this.post.id}/comment`)
                        .then((response) => {
                            console.log(response)
                            this.comments = response.data.map((comment) => {
                                return {
                                    ...comment,
                                    createdAt: moment(comment.createdAt).format('LLLL')
                                }
                            });
                        })
                } catch (error) {
                    console.error(error)

                }
            },
            deleteComment(commentId, index) {
                try {
                    axios.delete("post/comment/" + commentId)
                        .then(() => {
                            this.comments.splice(index, 1);
                            this.updateCommentCount(-1);
                        })
                } catch (error) {
                    console.error(error);
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .comment {
        display: flex;
        padding: 5px;

        .comment-post {
            width: 100%;
            border-radius: 5px;
            background-color: white;
            margin-left: 10px;


            .content-comment {
                padding: 10px;
                .user-name {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .header-user {
                        display: flex;
                        align-items: baseline;

                        p {
                            margin: 0;
                        }

                        .date {
                            font-size: 0.7em;
                            margin-left: 10px;

                        }
                    }

                    .icon-deleted {
                        font-size: 1.3em;
                        color: #f9abab;
                        cursor: pointer;
                        &:hover{
                            color: lighten(#f9abab, 2%);
                        }
                    }

                }.content{
                margin-top: 10px;
                                 }
            }
        }
    }

    .input-comment {
        margin-top: 50px;
        text-align: right;

        .comment-post {
            display: flex;
            align-items: center;

            .profile {
                width: 30px;
                height: 30px;
                border-radius: 15px;
                border: 1px solid #f9abab;
                cursor: pointer;
                font-size: 1em;
                text-align: center;
                margin: 0;
                padding: 0;
                color: #f9abab;
                position: relative;

                .icon-profile {
                    position: absolute;
                    font-size: 1em;
                    left: 8px;
                    bottom: 8px;
                }
            }

            .content-comment {
                flex-grow: 1;
                margin-left: 10px;

                input {
                    width: 100%;
                    height: 60px;
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

        .send-comment {
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




</style>