<template>
    <div class="container1">
        <div class="container">
            <div class="row">
                <div class="col-6 groupomania">
                    <img alt="Logo de Groupomania" src="../../assets/icon-left-font.png">
                    <h4>
                        Bienvenue sur votre réseau social d'entreprise
                    </h4>
                </div>

                <div class="col-1"></div>

                <div class="col">
                    <div class="card">
                        <!--Login form-->
                        <form @submit.prevent="handleSubmit">
                            <div class="form-group">
                                <input type="email" id="email" class="form-control" autocomplete="email"
                                       :class="{'is-invalid': v$.loginEmail.$error}"
                                       v-model.trim="v$.loginEmail.$model" placeholder="Adresse e-mail">
                                <div v-for="error of v$.loginEmail.$errors" :key="error.$uid" class="error">
                                    <span>{{error.$message}}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="password" id="password" class="form-control"
                                       autocomplete="current-password"
                                       :class="{'is-invalid': v$.loginPassword.$error}"
                                       v-model.trim="v$.loginPassword.$model" placeholder="Mot de passe">
                                <div v-for="error of v$.loginPassword.$errors" :key="error.$uid" class="error">
                                    <span>{{error.$message}}</span>
                                </div>
                            </div>
                            <div v-if="loginError" class="error2">
                                <span>{{loginError}}</span>
                            </div>
                            <button class="btn-connect btn-primary">Se connecter</button>
                        </form>

                        <!--Register button + dialog-->
                        <div class="group">
                            <div class="border-separate"></div>
                            <Register :reveal="reveal" :toggleRegisterPopup="toggleRegisterPopup"></Register>
                            <button v-on:click="toggleRegisterPopup" class="btn-register btn-success">Créer nouveau compte
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import Register from './Register.vue'
    import axios from 'axios'
    import useVuelidate from '@vuelidate/core'
    import {required, email, helpers} from '@vuelidate/validators'

    export default {
        name: 'Login',
        setup() {
            return {v$: useVuelidate()}
        },
        data() {
            return {
                reveal: false,
                loginEmail: '',
                loginPassword: '',
                loginError: null
            };
        },
        components: {
            Register
        },
        validations: {
            loginEmail: {
                required: helpers.withMessage('Ce champs est obligatoire !', required),
                email: helpers.withMessage('Cet email est invalide !', email)
            },
            loginPassword: {
                required: helpers.withMessage('Ce champs est obligatoire !', required),
            }
        },
        methods: {
            // Toggle Register popup
            toggleRegisterPopup: function () {
                this.reveal = !this.reveal;
            },
            async handleSubmit() {
                // Verification du formulaire
                this.v$.loginEmail.$touch();
                this.v$.loginPassword.$touch();
                const isFormCorrect = !this.v$.loginEmail.$invalid && !this.v$.loginPassword.$invalid;
                if (!isFormCorrect) return;

                // Requête
                try {
                    const response = await axios.post('auth/login', {
                        email: this.loginEmail,
                        password: this.loginPassword

                    })
                    // Sauvegarde du token et redirection vers Accueil
                    localStorage.setItem('token', response.data.token);
                    this.$router.push('./accueil');
                } catch (error) {
                    if (error.response.status === 400) this.loginError = error.response.data.message;
                    else this.loginError = 'Une erreur s\'est produite';
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .groupomania {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        img {
            width: 350px;
        }

        p {
            font-size: 1.1em;
        }
    }

    .container1 {
        margin: 150px;
    }

    .container {
        .col {
            text-align: center;
        }

        .card {
            padding: 15px;
            box-shadow: 0 0 7px 0 rgb(150, 149, 149);

            .form-group {
                margin-top: 15px;
                margin-bottom: 15px;

                input {
                    padding: 10px;
                }

                ::placeholder {
                    color: rgb(172, 168, 168);
                    font-size: 1em;
                    font-weight: 600;
                }

                .error {
                    color: rgb(190, 8, 8);
                    font-size: 0.85em;
                    vertical-align: top;
                    text-align: left;
                    margin-top: 5px;
                }
            }

            .btn-connect {
                margin-top: 15px;
                margin-bottom: 15px;
                border-radius: 3px;
                padding: 10px;
                font-size: 1.1em;
                font-weight: 600;
                width: 100%;
                border: none;
                background-color: #fc3c14;

                &:hover {
                    background-color: #fc5b42;
                }

            }

            .group {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .border-separate {
                    border-bottom: 0.2px solid rgb(212, 208, 208);
                    width: 100%;
                    margin: 20px;
                }

                .btn-register {
                    margin-top: 15px;
                    margin-bottom: 15px;
                    border-radius: 3px;
                    padding: 10px;
                    font-size: 1.1em;
                    font-weight: 500;
                    width: 300px;
                    border: none;
                    background-color: #fc785d;

                    &:hover {
                        background-color: #fc643c;
                    }
                }
            }

            .error2 {
                color: rgb(190, 8, 8);
                font-size: 0.85em;
                vertical-align: top;
                text-align: center;
                margin-top: 5px;
                margin-bottom: 10px;
            }

        }
    }


</style>