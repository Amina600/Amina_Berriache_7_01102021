<template>
    <div class="container1">
         <div class="container">
            <div class="row">
                <div class="col-6">
            
                    <img alt="Logo de Groupomania" src="../assets/icon-left-font.png">
                    <h4>
                        Bienvenue sur votre réseau social d'entreprise
                    </h4>
                    
                </div>
                <div class="col-1"></div>
                <div class="col">
                    <div class="card">
                        <form action="">
                            <div class="form-group">
                                <input type="email" id="email" class="form-control" placeholder="Adresse e-mail">
                            </div>
                            <div class="form-group">
                                <input type="password" id="password" class="form-control" placeholder="Mot de passe">
                            </div>
                            <div type="button" class="btn-connect btn-primary">Se connecter</div>
                        </form>
                        <div class="group">
                            <div class="border-separate"></div>
                            <register :revele="revele" :toggleRegister="toggleRegister"></register>
                            <div v-on:click="toggleRegister" type="button" class="btn-register btn-success">Créer nouveau compte</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

   
</template>

<script>
import Register from './Register.vue'

export default {
    name: 'Login',
    data() {
        return {
            revele: false
        };
    },
    components: {
        'register': Register
    },
    methods: {
    toggleRegister: function() {
      this.revele = !this.revele;
    }
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
img {
    width: 350px;
}
p{
    font-size: 1.1em;
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
            background-color: #fc512f;
            &:hover{
                background-color: #fc3c14;
            }

        }.group{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .border-separate{
                border: 0.2px solid rgb(199, 196, 196);
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
                background-color:#ff7e6b;
                &:hover{
                    background-color: #fc643c;
                }
            
            }
        }
        
    }
}



</style>