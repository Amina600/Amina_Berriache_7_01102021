<template>
    <div class="container1">
         <div class="container">
            <div class="row">
                <div class="col-6 groupomania">
                    <img alt="Logo de Groupomania" src="../assets/icon-left-font.png">
                    <h4>
                        Bienvenue sur votre réseau social d'entreprise
                    </h4>
                </div>

                <div class="col-1"></div>

                <div class="col">
                    <div class="card">
                        <form  @submit.prevent="handleSubmit">
                            <div class="form-group">
                                <input type="email" id="email" class="form-control" v-model="email" placeholder="Adresse e-mail">
                            </div>
                            <div class="form-group">
                                <input type="password" id="password" class="form-control" v-model="password" placeholder="Mot de passe">
                            </div>
                            <button class="btn-connect btn-primary">Se connecter</button>
                        </form>
                        <div class="group">
                            <div class="border-separate"></div>
                            <register :revele="revele" :toggleRegister="toggleRegister"></register>
                            <button v-on:click="toggleRegister" class="btn-register btn-success">Créer nouveau compte</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

   
</template>

<script>
    import Register from './Register.vue'
     //import axios from 'axios'

    export default {
        name: 'Login',
        data() {
            return {
                revele: false,
                email: '',
                password: ''
            };
        },
        components: {
            'register': Register
        },
        methods: {
            toggleRegister: function() {
            this.revele = !this.revele;
            }
            //async handleSubmit(){

                //const response = await axios.post('auth/login', {
                   // email: this.email,
                   // password: this.password
                //})    
            //}
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.groupomania{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    img {
        width: 350px;
    }
    p{
        font-size: 1.1em;
    }
}

.container1{
    margin: 150px;
}
.container {
    .col {
    text-align: center;
    }
    .card {
        padding: 15px;
        box-shadow: 0px 0px 7px 0px rgb(150, 149, 149);
        .form-group{
            margin-top: 15px;
            margin-bottom: 15px;
            input{
                padding: 10px;
            }
            ::placeholder{
                color: rgb(172, 168, 168);
                font-size: 1em;
                font-weight: 600;
            }
        }.btn-connect{
            margin-top: 15px;
            margin-bottom: 15px;
            border-radius: 3px;
            padding: 10px;
            font-size: 1.1em;
            font-weight: 600;
            width: 100%;
            border: none;
            background-color: #fc3c14;
            &:hover{
                background-color: #fc5b42;
            }

        }.group{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .border-separate{
                border-bottom: 0.2px solid rgb(212, 208, 208);
                width: 100%;
                margin: 20px;
            }
            .btn-register{
                margin-top: 15px;
                margin-bottom: 15px;
                border-radius: 3px;
                padding: 10px;
                font-size: 1.1em;
                font-weight: 500;
                width: 300px;
                border: none;
                background-color:#fc785d;
                &:hover{
                    background-color: #fc643c;
                }
            }
        }
        
    }
}



</style>