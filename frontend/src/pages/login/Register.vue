<template>
    <div class="bloc-register" v-if="reveal">
        <div class="overlay" v-on:click="toggleRegisterPopup"></div>

        <div class="register card">
            <div class="header">
                <div class="title">
                    <h2>S'inscrire</h2>
                </div>
                <div v-on:click="toggleRegisterPopup" class="btn-close btn "></div>
            </div>

            <form @submit.prevent="handleSubmit">
                <!--Pseudo-->
                <div class="form-group">
                    <input type="text" id="pseudo" :class="{'is-invalid': v$.pseudo.$error}"
                           class="form-control" v-model.trim="v$.pseudo.$model" placeholder="Pseudo">
                    <div v-for="error of v$.pseudo.$errors" :key="error.$uid" class="error">
                        <span>{{error.$message}}</span>
                    </div>
                </div>

                <!--Email-->
                <div class="form-group">
                    <input type="email" id="email" :class="{'is-invalid': v$.email.$error}"
                           class="form-control" autocomplete="email" v-model.trim="v$.email.$model"
                           placeholder="Adresse e-mail">
                    <div v-for="error of v$.email.$errors" :key="error.$uid" class="error">
                        <span>{{error.$message}}</span>
                    </div>
                </div>

                <!--Password-->
                <div class="form-group">
                    <input type="password" id="password" :class="{'is-invalid': v$.password.$error}"
                           class="form-control" autocomplete="new-password" v-model.trim="v$.password.$model"
                           placeholder="Mot de passe">
                    <div v-for="error of v$.password.$errors" :key="error.$uid" class="error">
                        <span>{{error.$message}}</span>
                    </div>
                </div>

                <div v-if="signUpError" class="error2">
                    <span>{{signUpError}}</span>
                </div>

                <button class="btn-register btn-primary">S'inscrire</button>
            </form>

        </div>
    </div>
</template>


<script>
    import axios from 'axios'
    import useVuelidate from '@vuelidate/core'
    import {required, email, minLength, maxLength, helpers} from '@vuelidate/validators'

    export default {
        name: 'Register',
        props: ['reveal', 'toggleRegisterPopup'],
        setup() {
            return {v$: useVuelidate()}
        },
        data: function () {
            return {
                pseudo: '',
                email: '',
                password: '',
                signUpError: null
            }
        },
        validations: {
            pseudo: {
                required: helpers.withMessage('Ce champs est obligatoire !', required)
            },
            email: {
                required: helpers.withMessage('Ce champs est obligatoire !', required),
                email: helpers.withMessage('Cet email est invalide !', email)
            },
            password: {
                required: helpers.withMessage('Ce champs est obligatoire !', required),
                minLength: helpers.withMessage('6 caractères minimum', minLength(6)),
                maxLength: helpers.withMessage('10 caractères maximum', maxLength(10))
            }

        },

        methods: {
            async handleSubmit() {

                // Check form
                const isFormCorrect = await this.v$.$validate();
                if (!isFormCorrect) return;

                // Request
                try {
                    await axios.post('auth/signup', {
                        pseudo: this.pseudo,
                        email: this.email,
                        password: this.password
                    })
                    // Après avoir envoyé le post, la popup se ferme
                    this.toggleRegisterPopup();
                } catch (error) {
                    if (error.response.status === 400) this.signUpError = error.response.data.message;
                    else this.signUpError = 'Une erreur s\'est produite'
                }
            }
        }

    }

</script>

<style scoped lang="scss">
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
                margin-bottom: 35px;

                .btn-close {
                    font-size: 1.5em;
                    color: rgb(212, 208, 208);
                    font-weight: 700;

                }

            }

            .form-group {
                margin-bottom: 20px;

                input {
                    background-color: rgb(247, 247, 247);
                    padding: 10px;

                }

                ::placeholder {
                    color: rgb(172, 168, 168);
                    font-size: 1em;
                    font-weight: 600;
                }

            }

            .btn-register {
                margin-top: 15px;
                margin-bottom: 25px;
                border-radius: 3px;
                padding: 10px;
                font-size: 1.1em;
                font-weight: 600;
                width: 100%;
                border: none;
                background-color: #ff7e6b;

                &:hover {
                    background-color: #fc643c;
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
                margin-bottom: 20px;

            }
        }
    }
    @media screen and (max-width: 460px) {
        .bloc-register {
            .overlay{
                background-color: white;
            }
            .register {
                top: 0;
                max-width: 120vw !important;
                height: 100% !important;
                width: 100% !important;


                .header {
                    border-bottom: 0.2px solid rgb(212, 208, 208);
                    width: 100%;
                    padding: 0 10px 10px 0;

                    h4 {
                        margin-bottom: 0 !important;
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
            }
        }
    }
</style>
