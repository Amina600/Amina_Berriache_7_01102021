<template>

    <div class="show-post container">
        <button v-on:click="selectCategory('RECENT')" class="btn-category btn-primary"
                :class="{active: category === 'RECENT'}">
            Récent
        </button>
        <button v-on:click="selectCategory('POPULAIRE')" class="btn-category btn-primary"
                :class="{active: category === 'POPULAIRE'}">
            Populaire
        </button>
    </div>
    <div class="container" :key="index" v-for="(post, index) in posts">
        <div class="row">
            <header>
                <div class="user">
                    <router-link to="/profile">
                        <UserIcon :user="post.User" :size="50"></UserIcon>
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
                <div v-if="post.userId === myUser.id || myUser.isAdmin" class="modified">
                    <font-awesome-icon v-on:click="toggleMenu(post.id)" class="icon-show-menu" icon="ellipsis-v"/>
                    <div v-if="showMenu[post.id]" class="show-menu-modified">
                        <div class="overlay" v-on:click="toggleMenu(post.id)"></div>
                        <div class="background">
                            <ul>
                                <li v-on:click="togglePostPopup" v-if="post.userId === myUser.id">
                                    <p>Modifier</p>
                                    <font-awesome-icon class="icon-modified" icon="pen"/>
                                </li>
                                <li v-on:click="deletePost(post.id, index)">
                                    <p>Supprimer</p>
                                    <font-awesome-icon class="icon-deleted" icon="trash-alt"/>
                                </li>
                            </ul>
                            <EditPost :reveal="reveal" :togglePostPopup="togglePostPopup" :postToEdit="post"/>
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
                <img v-if="post.mediaType === 'IMAGE'" :src="post.urlMedia" alt="media"/>
                <video controls v-if="post.mediaType === 'VIDEO'" :src="post.urlMedia"></video>
            </div>
            <div class="param">
                <div class="flex">
                    <font-awesome-icon v-on:click="sendLike(post, index,post.iLiked ? 0 : 1)"
                                       :class="{'liked': post.iLiked}" class="icon-arrow-up" icon="arrow-up"/>
                    <p class="up">{{post.likeCount}}</p>
                </div>
                <div class="flex">
                    <font-awesome-icon v-on:click="sendLike(post, index,post.iDisliked ? 0 : -1)"
                                       :class="{'disliked': post.iDisliked}" class="icon-arrow-down" icon="arrow-down"/>
                    <p class="up">{{post.dislikeCount}}</p>
                </div>

                <div class="flex">
                    <font-awesome-icon v-on:click="toggleComment(post.id)" class="icon-comment" icon="comment-alt"/>
                    <p class="up">{{post.commentCount}}</p>
                </div>

            </div>
            <comments :post="post" :updateCommentCount="($event) => updateCommentCount($event, index)"
                      v-if="showComments[post.id]"/>
        </div>
    </div>

</template>

<script>
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    import Comments from "./Comments";
    import axios from "axios";
    import moment from "moment";
    import UserIcon from "../layout/UserIcon";
    import EditPost from "./EditPost";


    export default {
        name: "Posts",
        components: {
            'font-awesome-icon': FontAwesomeIcon,
            Comments,
            'UserIcon': UserIcon,
            'EditPost': EditPost
        },
        data() {
            let myUser = JSON.parse(localStorage.getItem('user'));
            return {
                showMenu: {},
                showComments: {},
                posts: [],
                myUser,
                reveal: false,
                category: 'RECENT'
            }
        },
        // Chargement des posts en changement de la page
        created() {
            this.getAllPost();
        },
        methods: {
            // Toggle Post popup
            togglePostPopup: function () {
                this.reveal = !this.reveal;
            },
            // Toggle menu popup
            toggleMenu: function (postId) {
                this.showMenu[postId] = !this.showMenu[postId];
            },
            // // Toggle commentaire popup
            toggleComment: function (postId) {
                this.showComments[postId] = !this.showComments[postId];
            },
            getAllPost() {
                try {
                    axios.get("post/"+ this.category)
                        .then((response) => {
                            // Formatage de la date des commentaires
                            this.posts = response.data.map((post) => {
                                return {
                                    ...post,
                                    createdAt: moment(post.createdAt).format('lll'),
                                    mediaType: post.urlMedia && post.urlMedia.slice(-3) === 'mp4' ? 'VIDEO' : 'IMAGE',
                                    iLiked: post.iLiked === '1',
                                    iDisliked: post.iDisliked === '1',
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
                    console.error(error);
                }
            },
            sendLike(post, index, action) {

                try {
                    axios.post(`post/like/${post.id}`, {action})
                        .then(() => {
                            // Simule en local le changement en back-end
                            let likeCount = post.likeCount;
                            let dislikeCount = post.dislikeCount;
                            let iLiked = post.iLiked;
                            let iDisliked = post.iDisliked;

                            if (action === 1) {
                                likeCount++;
                                iLiked = true;

                                if (iDisliked) {
                                    dislikeCount--;
                                    iDisliked = false;
                                }

                            } else if (action === -1) {
                                dislikeCount++;
                                iDisliked = true;

                                if (iLiked) {
                                    likeCount--;
                                    iLiked = false;
                                }
                            } else {
                                if (iLiked) {
                                    likeCount--;
                                    iLiked = false;

                                } else {
                                    dislikeCount--;
                                    iDisliked = false;
                                }
                            }
                            // Mise à jour des likes
                            this.posts[index] = {...post, likeCount, dislikeCount, iLiked, iDisliked};
                        });

                } catch (error) {
                    console.error(error)
                }
            },
            updateCommentCount(count, index) {
                this.posts[index] = {
                    ...this.posts[index],
                    commentCount: this.posts[index].commentCount + count
                };
            },
            selectCategory(category) {
                this.category = category;
                this.getAllPost();
            },
        }
    }
</script>

<style lang="scss" scoped>
    .show-post {

        padding: 0 160px;

        .btn-category {
            width: 180px;
            height: 40px;
            border-radius: 20px;
            margin-right: 10px;
            background-color: lighten(#f9abab, 13%) !important;
            color: #f9abab;
            font-weight: 600;
            font-size: 1.2em;
            border: 1px solid lighten(#f9abab, 13%);
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);

            &.active, &:hover {
                background-color: #f9abab !important;
                border: 1px solid #f9abab;
                color: #fff;
            }
        }
    }

    .container {
        width: 1100px;
        margin-bottom: 20px;

        .row {
            margin: 0 150px;
            border-radius: 5px;
            padding: 0 !important;
            background-color: lighten(#fbf0f0, 1%);
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

            header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 20px 20px 0;

                .user {
                    display: flex;
                    align-items: flex-start;

                    .user-name {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;

                        p {
                            margin-bottom: 5px !important;
                            margin-left: 10px;
                        }

                        .date {
                            font-size: 0.7em;
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
                    .overlay {
                        position: fixed;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;

                    }

                    .background {
                        background-color: white;
                        border-radius: 5px;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                        position: absolute;
                        right: 0;
                        top: 22px;


                        ul {
                            list-style-type: none;
                            padding: 0;
                            margin: 0;

                            li {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                padding: 5px;

                                &:hover {
                                    background: #f5d8d8;
                                    color: white;
                                    border-radius: 3px;
                                    cursor: pointer;
                                }

                                p {
                                    font-weight: bold;
                                    margin: 8px;
                                    font-size: 0.9em;
                                }

                                .icon-deleted {
                                    margin: 8px;
                                    color: #f9abab;
                                    font-size: 1em;
                                }

                                .icon-modified {
                                    margin: 8px;
                                    font-size: 1em;
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

            .content {
                margin-top: 15px;
                padding: 0px 20px;
            }

            .photo {
                max-width: 100%;
                overflow: hidden;
                text-align: center;
                margin-top: 10px;
                background-color: #333333;
            }

            img {
                max-width: 100%;
                object-fit: cover;
            }
            video{
                max-width: 100%;
                object-fit: cover;
            }

            .param {
                display: flex;
                justify-content: flex-start;
                padding: 20px 20px 0;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

                .flex {
                    display: flex;
                    margin-right: 20px;

                    .icon-arrow-up {
                        color: #f9abab;
                        font-size: 1.3em;
                        font-weight: bolder;
                        margin-right: 5px;
                        cursor: pointer;

                        &.liked, &:hover {
                            color: forestgreen;
                        }
                    }

                    .icon-arrow-down {
                        color: #f9abab;
                        font-size: 1.3em;
                        font-weight: bolder;
                        margin-right: 5px;
                        cursor: pointer;

                        &.disliked, &:hover {
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

    @media screen and (max-width: 992px) {

        .btn-category {
            margin-bottom: 10px;
        }

        .show-post {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 30px 0px !important;
            text-align: center;

        }
        .container {
            max-width: 100% !important;
            padding: 0;
            .row{
                max-width: 100% !important;
                margin: 0 !important;
                padding: 10px 10px;

            }
        }

    }


</style>