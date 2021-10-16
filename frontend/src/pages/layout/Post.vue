<template>
    <div class="container" :key="index" v-for="(post, index) in posts">
        <div class="row">
            <header>
                <div class="user">
                    <router-link to="/profile">
                        <div class="profile">
                            <font-awesome-icon class="icon-profile" icon="user"/>
                        </div>
                    </router-link>
                    <div class="user-name">
                        <p>
                            <strong>{{post.User.pseudo}}</strong>
                        </p>
                        <p class="date">
                            <em>{{post.createdAt}}</em>
                        </p>
                    </div>
                </div>
                <div class="modified">
                    <font-awesome-icon v-on:click="toggleMenu(post.id)" class="icon-show-menu" icon="ellipsis-v"/>
                    <div v-if="showMenu[post.id]" class="show-menu-modified">
                        <div class="background">
                            <ul>
                                <li>
                                    <p>Modifier</p>
                                    <font-awesome-icon class="icon-modified" icon="pen"/>
                                </li>
                                <li v-on:click="deletePost(post.id, index)">
                                    <p>Supprimer</p>
                                    <font-awesome-icon class="icon-deleted" icon="trash-alt"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </header>
            <div class="content">
                <p>
                    {{post.content}}
                </p>
            </div>

            <div v-if="post.urlMedia" class="photo">
                <img :src="post.urlMedia">
            </div>
            <div class="param">
                <div class="flex">
                    <font-awesome-icon class="icon-arrow-up" icon="arrow-up"/>
                    <p class="up">5</p>
                </div>
                <div class="flex">
                    <font-awesome-icon class="icon-arrow-down" icon="arrow-down"/>
                    <p class="up">2</p>
                </div>

                <div class="flex">
                    <font-awesome-icon v-on:click="toggleComment(post.id)" class="icon-comment" icon="comment-alt"/>
                    <p class="up">2</p>
                </div>

            </div>
            <comments :post="post" v-if="showComments[post.id]"/>
        </div>
    </div>
    <div class="container">
        <div class="more-post">
            <font-awesome-icon class="icon-more" icon="plus-circle"/>
            <p>Charger plus</p>
        </div>
    </div>

</template>

<script>
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    import Comments from "../layout/Comments";
    import axios from "axios";
    import moment from "moment";

    export default {
        name: "post.vue",
        components: {
            'font-awesome-icon': FontAwesomeIcon,
            Comments,
        },
        data() {
            return {
                showMenu: {},
                showComments: {},
                posts: []
            }
        },
        created() {
            this.getAllPost();
        },
        methods: {
            // Toggle menu popup
            toggleMenu: function (postId) {
                this.showMenu[postId] = !this.showMenu[postId];
            },
            toggleComment: function (postId) {
                this.showComments[postId] = !this.showComments[postId];
            },
            getAllPost() {
                try {
                    axios.get("post/")
                        .then((response) => {
                            this.posts = response.data.map((post) => {
                                return {
                                    ...post,
                                    createdAt: moment(post.createdAt).format('LLLL')
                                }
                            });
                        })
                } catch (error) {
                   console.error(error)
                }
            },
            deletePost(postId, index) {
                try {
                    axios.delete("post/" + postId)
                        .then(() => {
                            this.posts.splice(index, 1);
                        })
                } catch (error) {
                    if (error.response.status === 400) this.loginError = error.response.data.message;
                    else this.loginError = 'Une erreur s\'est produite';
                }
            },
        },


    }
</script>

<style lang="scss" scoped>
    .container {
        width: 1100px;
        margin-bottom: 20px;

        .row {
            margin: 0 100px;
            border-radius: 5px;
            padding: 25px 25px;
            background-color: lighten(#fbf0f0, 1%);

            header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;

                .user {
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-end;
                    margin-bottom: 30px;

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

                    .user-name {
                        margin-left: 10px;
                        display: flex;
                        align-items: center;

                        .date {
                            font-size: 0.75em;
                            margin-left: 10px;

                        }
                    }
                }

                .modified {
                    position: relative;
                    cursor: pointer;

                    .icon-show-menu {
                        color: #f9abab;
                        font-size: 1.3em;

                        &:hover {
                            color: lighten(#f9abab, 2%);
                        }
                    }

                }

                .show-menu-modified {
                    position: absolute;
                    right: 0;

                    .background {
                        width: 150px;
                        height: 80px;
                        background-color: white;
                        border-radius: 5px;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

                        ul {
                            list-style-type: none;
                            padding: 0;
                            margin: 0;

                            li {
                                display: flex;
                                justify-content: space-between;

                                &:hover {
                                    background: #f5d8d8;
                                    color: white;
                                    border-radius: 3px;
                                    cursor: pointer;
                                }

                                p {
                                    font-weight: bold;
                                    margin: 8px;
                                }

                                .icon-deleted {
                                    margin: 5px;
                                    color: #f9abab;
                                    font-size: 1.3em;
                                }

                                .icon-modified {
                                    margin: 5px;
                                }
                            }
                        }

                    }
                }

                .icon-modified {
                    color: #f9abab;
                    font-size: 1.3em;
                }
            }

            .photo {
                width: 100%;
                height: 400px;
                overflow: hidden;
                text-align: center;
                margin-top: 10px;
            }

            img {
                width: 100%;
                height: 400px;
                object-fit: cover;
            }

            .param {
                display: flex;
                justify-content: flex-start;
                margin-top: 20px;

                .flex {
                    display: flex;
                    margin-right: 20px;

                    .icon-arrow-up {
                        color: #f9abab;
                        font-size: 1.3em;
                        font-weight: bolder;
                        margin-right: 5px;
                        cursor: pointer;

                        &:hover {
                            color: forestgreen;
                        }
                    }

                    .icon-arrow-down {
                        color: #f9abab;
                        font-size: 1.3em;
                        font-weight: bolder;
                        margin-right: 5px;
                        cursor: pointer;

                        &:hover {
                            color: #fc3c14;
                        }

                    }

                    .icon-comment {
                        color: #f9abab;
                        font-size: 1.3em;
                        font-weight: bolder;
                        margin-right: 5px;
                        cursor: pointer;

                        &:hover {
                            color: #fdc3c3;
                        }

                    }
                }


            }
        }
    }

    .container {
        .more-post {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;

            p {
                color: #f9abab;
                font-weight: bold;
                margin: 0;
            }

            .icon-more {
                color: #f9abab;
                font-size: 2em;
                font-weight: bolder;
                cursor: pointer;
                margin-right: 5px;
            }
        }

    }


</style>