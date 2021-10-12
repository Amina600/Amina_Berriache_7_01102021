<template>
    <div class="bloc-comment">
        <div class="comment">
            <router-link to="/profile">
                <div class="profile">
                    <font-awesome-icon class="icon-profile" icon="user"/>
                </div>
            </router-link>
            <div class="comment-post">
                <div class="content-comment">
                    <div class="user-name">
                        <div class="header-user">
                            <p>
                                <strong>Chetta</strong>
                            </p>
                            <p class="date">
                                <em>Le 12 octobre 2021 à 16.01</em>
                            </p>
                        </div>
                        <font-awesome-icon class="icon-deleted" icon="trash-alt"/>
                    </div>
                    <div class="content">
                        <p>
                            What is Lorem Ipsum?
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry the printing and
                            typesetting industry.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="comment">
            <div class="profile">
                <font-awesome-icon class="icon-profile" icon="user"/>
            </div>
            <div class="comment-post">
                <div class="content-comment">
                    <div class="user-name">
                        <div class="header-user">
                            <p>
                                <strong>Chetta</strong>
                            </p>
                            <p class="date">
                                <em>Le 12 octobre 2021 à 16.01</em>
                            </p>
                        </div>
                        <font-awesome-icon class="icon-deleted" icon="trash-alt"/>

                    </div>
                    <div class="content">
                        <p>
                            What is Lorem Ipsum?
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry the printing and
                            typesetting industry.
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
                    <input type="text" placeholder="Écrivez un commentaire…">
                </div>

            </div>
            <button class="send-comment btn-primary">Envoyer</button>
        </div>
    </div>

</template>

<script>
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

    export default {
        name: "Comments",
        components: {
            'font-awesome-icon': FontAwesomeIcon
        }
    }
</script>

<style lang="scss" scoped>
    .comment {
        display: flex;
        padding: 5px;

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

        .comment-post {
            width: 100%;
            border-radius: 5px;
            background-color: white;
            padding-left: 10px;
            padding-top: 5px;
            margin-left: 10px;


            .content-comment {
                .user-name {
                    display: flex;
                    justify-content: space-between;

                    .header-user {
                        display: flex;
                        align-items: center;

                        p {
                            margin: 0;
                        }

                        .date {
                            font-size: 0.75em;
                            margin-left: 10px;

                        }
                    }

                    .icon-deleted {
                        margin-right: 10px;
                        font-size: 1.3em;
                        color: #f9abab;
                        cursor: pointer;
                        &:hover{
                            color: lighten(#f9abab, 2%);
                        }
                    }

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
        }


    }


</style>