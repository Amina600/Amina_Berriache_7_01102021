<template>
    <div class="bloc-register" v-if="revele">
        <div class="overlay" v-on:click="toggleRegister"></div>

        <div class="register card">
            <div class="header">
                <div class="title">
                    <h2>S'inscrire</h2> 
                </div>
                <div v-on:click="toggleRegister" class="btn-close btn "></div>
            </div>
            
            <form action="">
                <div class="form-group">
                    <input type="text" id="pseudo" class="form-control" placeholder="Pseudo">
                </div>
                <div class="form-group">
                    <input type="email" id="email" class="form-control" placeholder="Adresse e-mail">
                </div>
                <div class="form-group">
                    <input type="password" id="password" class="form-control" placeholder="Mot de passe">
                </div>
                <div type="button" class="btn-register btn-primary">S'inscrire</div>
            </form>

        </div>
    </div>
</template>


<script>

export default{
    name: 'Register',
    props: ['revele', 'toggleRegister']
}
</script>

<style scoped lang="scss">
.bloc-register{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .overlay{
        background: rgba(245, 241, 241, 0.589);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .register{
        background: #f1f1f1;
        color: #333;
        padding: 30px;
        position: fixed;
        top: 20%;
        width: 450px !important;
        box-shadow: 0px 0px 7px 0px rgb(150, 149, 149);
        background-color: #fff ;
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;
            border-bottom: 0.2px solid rgb(212, 208, 208);
            width: 100%;
            .btn-close {
                font-size: 1.5em;
                color: rgb(212, 208, 208);
                font-weight: 700;
                
            }

        }.form-group{
            margin-bottom: 20px;
            input{
                background-color: rgb(247, 247, 247);
                padding: 10px;
            }::placeholder{
                color: rgb(172, 168, 168);
                font-size: 1em;
                font-weight: 600;
            }
            
        }.btn-register{
            margin-top: 50px;
            margin-bottom: 25px;
            border-radius: 3px;
            padding: 10px;
            font-size: 1.1em;
            font-weight: 600;
            background-color:#ff7e6b;
            &:hover{
                background-color: #fc643c;
            }
        }
    }

}





</style>
