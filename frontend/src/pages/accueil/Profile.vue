<template>
    <Nav/>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="content">
                    <header>
                        <h4>Photo de profile</h4>
                    </header>
                    <div class="container-photo">
                        <img src="../../assets/photo-profile.png" alt="photo de profile">
                    </div>
                </div>
                <div class="btns-photo">
                    <button class="btn-add">Ajouter une photo</button>
                    <button class="btn-send-photo btn-primary">Appliquer</button>
                </div>

            </div>
            <div class="col">
                <div class="header-param">

                    <font-awesome-icon class="icon-param" icon="cogs"/>
                    <h4>Paramètres</h4>

                </div>
                <form>
                    <div class="form-group">
                        <label for="pseudo">Changer le pseudo :</label>
                        <input type="text" id="pseudo" class="form-control" placeholder="Changer pseudo">

                    </div>
                    <div class="form-group">
                        <label>Changer le mot de passe :</label>
                        <input type="password" id="password-actuel" class="form-control" placeholder="Actuel">
                        <input type="password" id="password-new" class="form-control"
                               placeholder="Nouveau mot de passe">
                    </div>
                    <div class="btns">
                        <button type="button" v-on:click="toggleDelete" class="btn-deleted btn-primary">Supprimer le
                            compte
                        </button>
                        <button class="btn-send-data btn-primary">Appliquer</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="bloc-register" v-if="showDelete">
            <div class="overlay" v-on:click="toggleDelete"></div>

            <div class="register card">
                <div class="header">
                    <div class="title">
                        <p>Voulez vous vraiment supprimer votre compte?</p>
                    </div>
                </div>
                <div class="btns-popup">
                    <button class="btn-yes">Oui</button>
                    <button v-on:click="toggleDelete" class="btn-no">Annuler</button>

                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import Nav from "../layout/Nav";
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

    export default {
        name: "Profile",
        components: {
            Nav,
            'font-awesome-icon': FontAwesomeIcon
        },
        data() {
            return {
                showDelete: false,
            }
        },
        methods: {
            toggleDelete: function () {
                this.showDelete = !this.showDelete;
            }

        }

    }
</script>

<style scoped lang="scss">
    .container {
        width: 1100px;
        margin-top: 100px;

        .row {
            margin: 0 100px;
            border-radius: 5px;
            padding: 25px 25px;
            background-color: lighten(#fbf0f0, 1%);

            .col {
                background-color: white;
                margin: 15px;
                border-radius: 5px;
                padding: 25px 25px;

            }

            .content {
                display: flex;
                flex-direction: column;
                align-items: center;

                header {
                    margin-bottom: 10px;
                    border-bottom: 1px solid grey;
                    width: 100%;
                }

                .container-photo {
                    width: 250px;
                    height: 200px;
                    margin: 0;
                    overflow: hidden;
                    border: 1px solid lighten(#fbf0f0, 1%);
                    background-color: lighten(#fbf0f0, 1%);
                    border-radius: 5px;
                    text-align: center;
                    margin-top: 15px;

                    img {
                        object-fit: cover;
                        width: 250px;
                        border-radius: 5px;
                    }
                }


            }

            .btns-photo {
                margin-top: 36px;
                display: flex;
                justify-content: space-between;

                .btn-add {
                    margin-top: 25px;
                    margin-bottom: 15px;
                    border-radius: 3px;
                    padding: 8px;
                    font-size: 1.1em;
                    font-weight: 600;
                    border: 1px solid #f9abab;
                    background-color: #f9abab;
                    color: white;

                    &:hover {
                        background-color: lighten(#f9abab, 2%);
                    }
                }

                .btn-send-photo {
                    margin-top: 25px;
                    margin-bottom: 15px;
                    border-radius: 3px;
                    padding: 8px;
                    font-size: 1.1em;
                    font-weight: 600;
                    border: 1px solid forestgreen;
                    background-color: forestgreen;
                    color: white;

                    &:hover {
                        background-color: lighten(forestgreen, 5%);
                    }
                }
            }


            .header-param {
                display: flex;
                margin-bottom: 10px;
                border-bottom: 1px solid grey;

                .icon-param {
                    font-size: 1.5em;
                    margin-right: 7px;
                }
            }

            form {
                margin-top: 15px;

                .form-group {
                    margin-bottom: 15px;

                    label {
                        font-weight: bold;
                    }

                    input {
                        margin-top: 10px;
                        padding: 10px;
                    }
                }
            }

            .btns {
                display: flex;
                justify-content: space-between;

                .btn-send-data {
                    margin-top: 25px;
                    margin-bottom: 15px;
                    border-radius: 3px;
                    padding: 8px;
                    font-size: 1.1em;
                    font-weight: 600;
                    border: 1px solid forestgreen;
                    background-color: forestgreen;
                    color: white;

                    &:hover {
                        background-color: lighten(forestgreen, 5%);
                    }
                }

                .btn-deleted {
                    margin-top: 25px;
                    margin-bottom: 15px;
                    border-radius: 3px;
                    padding: 8px;
                    font-size: 1.1em;
                    font-weight: 600;
                    border: 1px solid #fc3c14;
                    background-color: #fc3c14;
                    color: white;

                    &:hover {
                        background-color: lighten(#fc3c14, 5%);
                    }

                }
            }

        }

        .bloc-register {
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

            .register {
                background: white;
                color: #333;
                padding: 30px;
                position: fixed;
                top: 20%;
                width: 450px !important;
                box-shadow: 0 0 7px 0 rgb(150, 149, 149);

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    border-bottom: 0.2px solid rgb(212, 208, 208);
                    width: 100%;
                    margin-bottom: 25px;
                    p{
                        font-size: 1.1em;
                        color: black;
                    }
                }

                .btns-popup {
                    display: flex;
                    justify-content: center;

                    .btn-yes {
                        border-radius: 3px;
                        padding: 8px;
                        font-size: 1.1em;
                        font-weight: 600;
                        border: 1px solid #fc3c14;
                        background-color: #fc3c14;
                        color: white;
                        margin-left: 20px;

                        &:hover {
                            background-color: lighten(#fc3c14, 5%);
                        }

                    }

                    .btn-no {

                        border-radius: 3px;
                        padding: 8px;
                        font-size: 1.1em;
                        font-weight: 600;
                        border: 1px solid forestgreen;
                        background-color: forestgreen;
                        color: white;
                        margin-left: 10px;

                        &:hover {
                            background-color: lighten(forestgreen, 5%);
                        }
                    }
                }


            }

        }
    }


</style>