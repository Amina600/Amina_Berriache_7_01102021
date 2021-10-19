<template>
    <Nav/>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="content">
                    <header>
                        <font-awesome-icon icon="user" class="user"/>
                        <h4>Photo de profile</h4>
                    </header>
                    <div class="container-photo">

                        <img v-if="url || myUser.profileUrl" :src="url || myUser.profileUrl"/>
                        <div v-else>
                            <img src="../../../src/assets/photo-profile.png" alt="photo de profile" class="imgDefault">
                        </div>

                    </div>
                </div>
                <div class="btns-photo">
                    <label class="custom-file-upload">
                        Ajouter une photo
                        <input id="file-input" type="file" accept=".jpg, .jpeg, .png" ref="fileUpload" @change="onFileChange"/>
                    </label>

                    <button v-on:click="sendPhoto" :class="{'disabled': !file }" :disabled="!file" aria-disabled="true"
                            class="btn-send-photo btn-primary">Appliquer</button>
                </div>
            </div>

            <div class="col">
                <div class="header-param">
                    <font-awesome-icon class="icon-param" icon="cogs"/>
                    <h4>Paramètres</h4>
                </div>

                <form @submit.prevent="updatePseudo">
                    <div class="form-group">
                        <label for="pseudo">Changer le pseudo :</label>
                        <input type="text" id="pseudo" :class="{'is-invalid': v$.pseudo.$error}"
                               class="form-control" v-model.trim="v$.pseudo.$model" placeholder="Pseudo">
                        <div v-for="error of v$.pseudo.$errors" :key="error.$uid" class="error">
                            <span>{{error.$message}}</span>
                        </div>
                        <div v-if="signUpErrorPseudo" class="error2">
                            <span>{{signUpErrorPseudo}}</span>
                        </div>

                    </div>
                    <button class="btn-send-data btn-primary">Appliquer</button>
                </form>

                <form @submit.prevent="updatePassword">
                    <div class="form-group">
                        <label>Changer le mot de passe :</label>
                        <input type="password" id="password" :class="{'is-invalid': v$.password.$error}"
                               class="form-control" v-model.trim="v$.password.$model"
                               placeholder="Actuel">
                        <div v-for="error of v$.password.$errors" :key="error.$uid" class="error">
                            <span>{{error.$message}}</span>
                        </div>
                        <input type="password" id="password-new" :class="{'is-invalid': v$.newPassword.$error}"
                               class="form-control"
                               v-model.trim="v$.newPassword.$model" placeholder="Nouveau mot de passe">
                        <div v-for="error of v$.newPassword.$errors" :key="error.$uid" class="error">
                            <span>{{error.$message}}</span>
                        </div>
                        <div v-if="signUpErrorPassword" class="error2">
                            <span>{{signUpErrorPassword}}</span>
                        </div>
                    </div>

                    <button class="btn-send-data btn-primary">Appliquer</button>
                </form>

                <div class="btns">
                    <button type="button" v-on:click="toggleDelete" class="btn-deleted btn-primary">Supprimer le
                        compte
                    </button>
                </div>
            </div>

        </div>
        <div class="bloc-register" v-if="showDelete">
            <div class="overlay" v-on:click="toggleDelete"></div>

            <div class="register card">
                <div class="header">
                    <div class="title">
                        <p>Voulez vous vraiment supprimer votre compte?</p>
                    </div>
                    <div v-on:click="toggleDelete" class="btn-close btn "></div>
                </div>
                <div class="btns-popup">
                    <button v-on:click="deleteCompte" class="btn-yes">Confirmer</button>
                    <button v-on:click="toggleDelete" class="btn-no">Annuler</button>

                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import Nav from "../layout/Nav";
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    import axios from "axios";
    import useVuelidate from '@vuelidate/core';
    import {helpers, maxLength, minLength, required} from "@vuelidate/validators";

    export default {
        name: "Profile",
        components: {
            Nav,
            'font-awesome-icon': FontAwesomeIcon
        },
        setup() {
            return {v$: useVuelidate()}
        },
        data() {
            let myUser = JSON.parse(localStorage.getItem('user'));
            return {
                showDelete: false,
                url: null,
                file: null,
                myUser,
                pseudo: '',
                signUpErrorPseudo: null,
                signUpErrorPassword: null,
                password: '',
                newPassword: '',
            }
        },
        validations: {
            pseudo: {
                required: helpers.withMessage('Ce champs est obligatoire !', required)
            },
            password: {
                required: helpers.withMessage('Ce champs est obligatoire !', required),
                minLength: helpers.withMessage('6 caractères minimum', minLength(6)),
                maxLength: helpers.withMessage('10 caractères maximum', maxLength(10))
            },
            newPassword: {
                required: helpers.withMessage('Ce champs est obligatoire !', required),
                minLength: helpers.withMessage('6 caractères minimum', minLength(6)),
                maxLength: helpers.withMessage('10 caractères maximum', maxLength(10))
            }

        },
        methods: {
            toggleDelete: function () {
                this.showDelete = !this.showDelete;
            },
            onFileChange(e) {
                this.file = e.target.files[0]
                this.url = URL.createObjectURL(this.file)
            },
            sendPhoto: async function () {

                // Request
                try {
                    const config = {headers: {'Content-Type': 'multipart/form-data'}};
                    let fd = new FormData();
                    fd.append('file', this.file);

                    const response = await axios.put("profile/image", fd, config);

                    let userLocal = JSON.parse(localStorage.getItem('user'));
                    userLocal.profileUrl = response.data.profileUrl;
                    localStorage.setItem('user', JSON.stringify(userLocal));
                    this.$router.go();
                } catch (error) {
                    console.log(error)
                }
            },
            updatePseudo: async function () {

                // Verification du formulaire
                this.v$.pseudo.$touch();
                if (this.v$.pseudo.$invalid) return;

                // Request
                try {
                    let pseudo = {
                        pseudo: this.pseudo,
                    }
                    await axios.put("profile/pseudo", pseudo);

                    let userLocal = JSON.parse(localStorage.getItem('user'));
                    userLocal.pseudo = this.pseudo;
                    localStorage.setItem('user', JSON.stringify(userLocal));

                    this.$router.go();
                } catch (error) {
                    if (error.response.status === 400) {
                        this.signUpErrorPseudo = error.response.data.message;
                    }
                    else {
                        this.signUpError = 'Une erreur s\'est produite'
                    }
                }
            },
            updatePassword: async function () {

                // Verification du formulaire
                this.v$.password.$touch();
                this.v$.newPassword.$touch();
                const isFormCorrect = !this.v$.password.$invalid && !this.v$.newPassword.$invalid;
                if (!isFormCorrect) return;

                // Request
                try {
                    await axios.put("profile/password", {
                        password: this.password,
                        newPassword: this.newPassword
                    })
                    this.password = null;
                    this.newPassword = null;
                    this.v$.password.$reset();
                    this.v$.newPassword.$reset();
                } catch (error) {
                    if (error.response.status === 400) {
                        this.signUpErrorPassword = error.response.data.message;
                    }
                    else {
                        this.signUpError = 'Une erreur s\'est produite'
                    }
                }
            },
            deleteCompte: async function () {

                try {
                    axios.delete("profile/delete/")
                        .then(() => {
                            localStorage.removeItem('user');
                            this.$router.push('/');
                        })
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        width: 800px;
        margin-top: 40px;

        .row {
            border-radius: 5px;
            padding: 10px 10px;
            background-color: lighten(#fbf0f0, 1%);

            .col {
                background-color: white;
                width: 340px;
                margin: 10px;
                border-radius: 5px;
                padding: 15px 15px;

                form {
                    border-radius: 5px;
                    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    margin-top: 15px;

                    .form-group {
                        margin-bottom: 10px;

                        label {
                            font-weight: bold;
                        }

                        input {
                            margin-top: 10px;
                            padding: 7px;
                        }
                    }

                    .error {
                        color: rgb(190, 8, 8);
                        font-size: 0.85em;
                        vertical-align: top;
                        text-align: left;
                        margin-top: 5px;
                    }

                    .error2 {
                        color: rgb(190, 8, 8);
                        font-size: 0.85em;
                        vertical-align: top;
                        text-align: center;
                        margin-top: 10px;


                    }

                    .btn-send-data {
                        border-radius: 3px;
                        padding: 5px;
                        width: 100px;
                        font-size: 1em;
                        font-weight: 600;
                        border: 1px solid forestgreen;
                        background-color: forestgreen;
                        color: white;
                        margin-left: 218px;

                        &:hover {
                            background-color: lighten(forestgreen, 5%);
                        }
                    }
                }

            }

            .content {
                display: flex;
                flex-direction: column;
                align-items: center;

                header {
                    margin-bottom: 10px;
                    border-bottom: 1px solid grey;
                    width: 100%;
                    display: flex;
                    .user{
                        font-size: 1.5em;
                        margin-right: 7px;
                    }
                }

                .container-photo {
                    width: 335px;
                    height: 345px;
                    margin: 10px 0;
                    overflow: hidden;
                    border: 1px solid lighten(#fbf0f0, 1%);
                    background-color: lighten(#fbf0f0, 1%);
                    border-radius: 5px;
                    text-align: center;
                    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);


                    img {
                        width: 100%;
                        object-fit: cover;
                        border-radius: 5px;
                    }
                }


            }

            .btns-photo {
                display: flex;
                justify-content: space-between;

                .custom-file-upload {
                    margin-top: 15px;
                    margin-bottom: 10px;
                    border-radius: 3px;
                    border: 1px solid #ccc;
                    display: inline-block;
                    padding: 6px 12px;
                    cursor: pointer;
                    font-size: 1.1em;
                    font-weight: 600;
                    border: 1px solid #f9abab;
                    background-color: #f9abab;
                    color: white;

                    &:hover {
                        background-color: lighten(#f9abab, 2%);
                    }
                }

                input[type="file"] {
                    display: none;
                }

                .btn-send-photo {
                    margin-top: 15px;
                    margin-bottom: 10px;
                    border-radius: 3px;
                    padding: 8px;
                    font-size: 1.1em;
                    font-weight: 600;
                    border: 1px solid forestgreen;
                    background-color: forestgreen;
                    color: white;

                    &:hover {
                        background-color: lighten(forestgreen, 5%);
                    }&.disabled {
                         background-color: darkgrey;
                         border: 1px solid darkgrey;
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

            .btns {
                display: flex;
                justify-content: center;

                .btn-deleted {
                    margin-top: 25px;
                    margin-bottom: 10px;
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
                padding: 25px;
                position: fixed;
                top: 20%;
                width: 500px !important;
                box-shadow: 0 0 7px 0 rgb(150, 149, 149);

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    border-bottom: 0.2px solid rgb(212, 208, 208);
                    width: 100%;
                    margin-bottom: 25px;

                    p {
                        font-size: 1.1em;
                        color: black;
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

                .btns-popup {
                    display: flex;
                    justify-content: center;

                    .btn-yes {
                        border-radius: 3px;
                        padding: 5px;
                        font-size: 1em;
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
                        padding: 5px;
                        font-size: 1em;
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