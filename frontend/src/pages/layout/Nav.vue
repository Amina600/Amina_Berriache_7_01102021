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
                                    <router-link to="/profile">
                                        <div class="profile">
                                            <font-awesome-icon icon="user"/>
                                        </div>
                                    </router-link>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" @click="handleLogout" class="icon-signOut">
                                        <font-awesome-icon icon="sign-out-alt"/>
                                    </a>
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
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

    export default ({
        name: 'Nav',
        components: {
            'font-awesome-icon': FontAwesomeIcon
        },
        methods: {
            handleLogout(){
                localStorage.removeItem('token')
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
                            margin-left: 50px;


                            a {
                                color: #333333;
                                font-size: 1.2em;
                                font-weight: 500;
                                text-decoration: none;
                            }

                            .icon-signOut {
                                font-size: 1.5em;
                                cursor: pointer;

                                &:hover {
                                    color: #f9abab;
                                }
                            }

                            .profile {
                                width: 30px;
                                height: 30px;
                                border-radius: 15px;
                                border: 1px solid black;
                                cursor: pointer;
                                font-size: 1em;
                                text-align: center;


                                &:hover {
                                    color: #f9abab;
                                    border: 1px solid #f9abab;

                                }

                            }

                        }
                    }


                }
            }


        }


    }


</style>
