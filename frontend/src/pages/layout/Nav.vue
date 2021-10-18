<template>

    <header>
        <div class="container">
            <div class="bg-header">
                <div class="container">
                    <nav>
                        <div class="logo">
                            <ul>
                                <li class="logo-photo">
                                    <router-link to="/accueil">
                                        <img src="../../assets/icon-left-font.png" alt="logo de Groupomania">
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/accueil">Home</router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="menu">
                            <ul>
                                <li>
                                    <router-link to="/profile" class="profile">
                                        <UserIcon :user="myUser" :size="40"></UserIcon>
                                        <p>{{myUser.pseudo}}</p>

                                    </router-link>
                                </li>
                                <li>
                                    <div class="icon-signOut">
                                        <a href="javascript:void(0)" v-on:click="handleLogout">
                                            <font-awesome-icon icon="sign-out-alt"/>
                                        </a>
                                    </div>

                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>

    </header>


</template>

<script>
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
    import UserIcon from "./UserIcon"

    export default ({
        name: 'Nav',
        components: {
            'font-awesome-icon': FontAwesomeIcon,
            'UserIcon': UserIcon
        },
        data() {
            let myUser = JSON.parse(localStorage.getItem('user'));
            return {
                myUser,
            }
        },
        methods: {
            handleLogout() {
                localStorage.removeItem('user')
                this.$router.push('/')
            }

        }
    })
</script>


<style lang="scss" scoped>
    header {
        box-shadow: 0 0 8px #f8d1d1;

        .container {
            width: 1100px;

            nav {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .logo {
                    ul {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        list-style-type: none;
                        margin: 0;
                        padding: 0;
                        cursor: pointer;

                        .logo-photo {
                            margin: 0;

                            img {
                                width: 223px;
                            }
                        }

                        li {
                            margin-left: 50px;

                            a {
                                color: #333333;
                                font-size: 1.2em;
                                font-weight: 500;
                                text-decoration: none;

                                &:hover {
                                    color: #f9abab;

                                }

                            }
                        }
                    }
                }

                .menu {
                    ul {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        list-style-type: none;
                        margin: 0;
                        padding: 0;

                        li {
                            margin-left: 55px;

                            a {
                                color: #333333;
                                font-size: 1.2em;
                                font-weight: 500;
                                text-decoration: none;
                            }

                            .icon-signOut {

                                a{
                                    font-size: 1.6em;
                                    cursor: pointer;
                                    padding: 3px 7px;

                                    &:hover {
                                        border: 1px solid lighten(#fbf0f0, 1%);
                                        background-color: lighten(#fbf0f0, 1%);
                                        border-radius: 20px;
                                        width: 40px;
                                        height: 40px;
                                        color: #f9abab;

                                    }
                                }

                            }
                        }

                        .profile {
                            display: flex;
                            align-items: center;
                            padding: 3px;
                            border: 1px solid transparent;
                            border-radius: 20px;

                            &:hover {
                                border: 1px solid lighten(#fbf0f0, 1%);
                                background-color: lighten(#fbf0f0, 1%);
                                color: #f9abab;
                            }
                            p {
                                margin: 5px 10px;
                            }
                        }
                    }

                }
            }


        }


    }


</style>
