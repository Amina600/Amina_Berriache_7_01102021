<template>
    <div class="container">
        <div class="row">
            <header>
                <div class="user">
                    <div class="profile">
                        <font-awesome-icon class="icon-profile" icon="user"/>
                    </div>
                    <div class="user-name">
                        <p>
                            <strong>Chetta</strong>
                        </p>
                    </div>
                </div>
                <div class="modified">
                    <font-awesome-icon v-on:click="toggleMenu" class="icon-show-menu" icon="ellipsis-v"/>
                    <div v-if="reveal" :reveal="reveal" :toggleMenu="toggleMenu" class="show-menu-modified">
                        <div class="background">
                            <ul>
                                <li>
                                    <p>Modifier</p>
                                    <font-awesome-icon class="icon-modified" icon="pen"/>
                                </li>
                                <li>
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
                    What is Lorem Ipsum?
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div class="photo">
                <img src="../../assets/chat.jpeg">
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
                    <font-awesome-icon v-on:click="toggleComment" class="icon-comment" icon="comment-alt"/>
                    <p class="up">2</p>
                </div>

            </div>
            <comments v-if="showComments" :toggleComment="toggleComment"/>
        </div>
    </div>
    <div class="container">
        <div class="more-post">
            <font-awesome-icon class="icon-more" icon="plus-circle"/>
        </div>
    </div>

</template>

<script>
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    import Comments from "../layout/Comments";

    export default {
        name: "post.vue",
        components: {
            'font-awesome-icon': FontAwesomeIcon,
            Comments,
        },
        data() {
            return {
                reveal: false,
                showComments: false,
            }
        },
        methods: {
            // Toggle menu popup
            toggleMenu: function () {
                this.reveal = !this.reveal;
            },
            toggleComment: function () {
                this.showComments = !this.showComments;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        width: 1100px;
        margin-top: 130px;

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
                    }
                }

                .modified {
                    position: relative;
                    cursor: pointer;
                    .icon-show-menu{
                        color: #f9abab;
                        font-size: 1.3em;
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
                                    background: #f8d1d1;
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
                overflow: hidden;
                text-align: center;
                margin-top: 10px;
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
                            color: #E0909C;
                        }

                    }
                }


            }
        }
    }

    .container {
        .more-post {
            text-align: center;

            .icon-more {
                color: #f9abab;
                font-size: 2em;
                font-weight: bolder;
                cursor: pointer;
            }
        }

    }


</style>