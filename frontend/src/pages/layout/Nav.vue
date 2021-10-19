<template>
    <header>
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
                            <router-link class="home" to="/accueil">Home</router-link>
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
                            <a href="javascript:void(0)" v-on:click="handleLogout" class="icon-signOut">
                                <font-awesome-icon icon="sign-out-alt"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
    <div class="nav-mobile">
        <ul class="logo">
            <li>
                <router-link to="/accueil">
                    <img src="../../assets/icon-left-font.png" alt="logo de Groupomania">
                </router-link>
            </li>
            <li>
                <font-awesome-icon v-on:click="toggleMenuPopup" class="bars" icon="bars"/>
            </li>
        </ul>
        <ul class="menu" v-if="showMenu">
            <li>
                <router-link to="/accueil" class="profile">
                    <font-awesome-icon icon="home" class="user"/>
                    <p>Accueil</p>
                </router-link>
            </li>
            <li>
                <router-link to="/profile" class="profile">
                    <font-awesome-icon icon="user" class="user"/>
                    <p>{{myUser.pseudo}}</p>
                </router-link>
            </li>
            <li>
                <a href="javascript:void(0)" v-on:click="handleLogout" class="profile">
                    <font-awesome-icon icon="sign-out-alt" class="user"/>
                    <p>Déconnexion</p>
                </a>
            </li>
        </ul>
    </div>


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
                showMenu: false
            }
        },
        methods: {
            // Toggle menu popup
            toggleMenuPopup: function () {
                this.showMenu = !this.showMenu;
            },
            // déconnexion en supprimant le token depuis le local storage
            handleLogout() {
                localStorage.removeItem('user')
                this.$router.push('/')
            }

        }
    })
</script>


<style lang="scss" scoped>
    .nav-mobile {
        display: none;
    }

    header {
        box-shadow: 0 0 8px #f8d1d1;

        .container {
            width: 1100px;

            nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 0 135px 0px 135px;
            }

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
                            width: 215px;
                        }
                    }

                    li {
                        margin-left: 45px;

                        .home {
                            color: #333333;
                            font-size: 1.2em;
                            font-weight: 500;
                            text-decoration: none;
                            cursor: pointer;
                            border: 1px solid transparent;
                            border-radius: 30px;
                            padding: 5px 10px;

                            &:hover {
                                color: #f9abab;
                                border: 1px solid lighten(#fbf0f0, 1%);
                                background-color: lighten(#fbf0f0, 1%);
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
                            cursor: pointer;
                            border: 1px solid transparent;
                            border-radius: 30px;
                            padding: 5px 10px;
                            font-size: 1.5em;

                            &:hover {
                                border: 1px solid lighten(#fbf0f0, 1%);
                                background-color: lighten(#fbf0f0, 1%);
                                color: #f9abab;
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
                            font-size: 0.95em;
                        }
                    }
                }
            }
        }
    }

    @media screen and (min-width: 300px) and (max-width: 992px) {
        header {
            display: none;
            .container{
                width: 0;
            }
        }
        .nav-mobile {
            display: block;


            .logo {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 0;
                list-style-type: none;
                padding: 10px 20px 10px 8px;
                box-shadow: 0 0 8px #f8d1d1;

                li {
                    img {
                        width: 200px;
                    }
                    .bars{
                        font-size: 1.5em;
                        color: #333333;
                    }
                }
            }

            .menu {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                list-style-type: none;
                margin: 0;
                padding: 10px 15px 10px 10px;
                background-color: lighten(#fbf0f0, 1%);

                li {
                    padding: 7px 0;
                    a {
                        color: #333333;
                        text-decoration: none;
                    }

                    .profile {
                        display: flex;
                        align-items: flex-start;

                        p {
                            margin-bottom: 10px;
                        }

                        .user {
                            font-size: 1.3em;
                            margin-right: 7px;
                            color: #f9abab;
                        }
                    }
                }

                &:active {
                    color: lighten(#f9abab, 2%);
                }

            }

        }
    }
    /*@media screen and (min-width: 576px) and (max-width: 900px) {*/
    /*    header {*/
    /*        box-shadow: 0 0 8px #f8d1d1;*/
    /*        width: 100% !important;*/

    /*        .container {*/
    /*            width: 100% !important;*/
    /*            margin: 0;*/

    /*            nav {*/
    /*                margin: 0 0 0 0;*/
    /*            }*/

    /*        }*/
    /*    }*/
    /*}*/


</style>
