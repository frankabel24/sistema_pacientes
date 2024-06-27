<template>
    <div>
        <HeaderComponent />
        <div class="container left">
            <form action="" class="form-horizontal">
                <div class="form-group left">
                    <label for="" class="control-label col-sm-2">Nombre</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="nombre" id="nombre" v-model="form.nombre">
                    </div>
                </div>
                <div class="form-group left">
                    <label for="" class="control-label col-sm-2">Direccion</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="direccion" id="direccion"
                            v-model="form.direccion">
                    </div>
                </div>
                <div class="form-group left row">
                    <div class="col">
                        <label for="" class="control-label col-sm-3">Correo</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="correo" id="correo" v-model="form.correo">
                        </div>
                    </div>
                    <div class="col">
                        <label for="" class="control-label col-sm-5">Código Postal</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="codigopostal" id="codigopostal"
                                v-model="form.codigoPostal">
                        </div>
                    </div>
                </div>
                <div class="form-group left row">
                    <div class="col">
                        <label for="" class="control-label col-sm-2">Género</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="genero" id="genero" v-model="form.genero">
                        </div>
                    </div>
                    <div class="col">
                        <label for="" class="control-label col-sm-2">Teléfono</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="telefono" id="telefono"
                                v-model="form.telefono">
                        </div>
                    </div>
                </div>
                <div class="form-group left row">
                    <div class="col">
                        <label for="" class="control-label col-sm-2">Fecha Nacimiento</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" name="fechanacimineto" id="fechanacimineto"
                                v-model="form.fechaNacimiento">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group left">
                            <label for="" class="control-label col-sm-2">Carné de Identidad</label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" name="DNI" id="DNI" v-model="form.dni">
                            </div>
                        </div>
                    </div>

                </div>


                <div class="form-group">
                    <button type="button" class="btn btn-primary mt-2" v-on:click="guardar()">Guardar</button>
                    <button type="button" class="btn btn-dark margen mt-2 ms-2" v-on:click="salir()">Salir</button>
                </div>
            </form>
        </div>

        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import axios from 'axios'


export default {
    name: 'NuevoView',
    components: {
        HeaderComponent,
        FooterComponent
    },
    data: function () {
        return {
            pacienteId: null,
            form: {
                "nombre": "",
                "direccion": "",
                "dni": "",
                "correo": "",
                "codigoPostal": "",
                "genero": "",
                "telefono": "",
                "fechaNacimiento": "",
                "token": "",
            }
        }
    },
    methods: {
        guardar() {
            this.form.token = localStorage.getItem('token');
            axios.post("http://localhost/Projects/patients/pacientes", this.form)
                .then(data => {
                    console.log(data);
                    this.makeToast("Hecho", "El paciente ha sido creado", "success");
                }).catch(e => {
                    console.log(e);
                    this.makeToast("Error", "No se ha creado el paciente", "danger");
                })

        },
        salir() {
            this.$router.push('/dashboard');
        },
        makeToast(titulo, texto, tipo) {
            this.toastCount++
            this.$bvToast.toast(texto, {
                title: titulo,
                variant: tipo,
                autoHideDelay: 5000,
                appendToast: true
            })
        }
    }
}

</script>


<style scoped>
.left {
    text-align: left;
}
</style>