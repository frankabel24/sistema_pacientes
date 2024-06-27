<template>
    <div>
        <HeaderComponent />
        <div class="container">
            <form action="" class="form-horizontal">
                <div class="form-group left">
                    <label for="" class="control-label col-sm-2">Nombre</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="nombre" id="nombre" v-model="form.nombre">
                    </div>
                </div>
                <div class="form-group left">
                    <label for="" class="control-label col-sm-2">Dirección</label>
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



                <div class="form-group mt-3 gap-3">
                    <button type="button" class="btn btn-primary " v-on:click="editar()">Editar</button>
                    <button type="button" class="btn btn-danger margen ms-2" v-on:click="eliminar()">Eliminar</button>
                    <button type="button" class="btn btn-dark margen ms-2" v-on:click="salir()">Salir</button>
                </div>
            </form>
        </div>

        <FooterComponent />
    </div>

</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import axios from 'axios';

export default {
    name: "EditarView",
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
                "pacienteId": ""
            }
        }
    },
    methods: {
        editar() {
            axios.put("http://localhost/Projects/patients/pacientes", this.form)
                .then(data => {
                    console.log(data);
                    this.makeToast("Hecho", "El paciente ha sido editado", "success");
                })
        },
        salir() {
            this.$router.push('/dashboard');
        },
        eliminar() {

            var pacienteId = this.form.pacienteId;
            var token = this.form.token;

            axios.delete('http://localhost/Projects/patients/pacientes', {
                headers: {
                    'Content-Type': 'application/json',
                    'pacienteId': pacienteId,
                    'token': token
                }
            })
                .then(data => {
                    console.log(data);
                    this.makeToast("Hecho", "El paciente ha sido eliminado", "warning");
                    this.$router.push('/dashboard');
                });

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
    },
    mounted: function () {
        this.form.pacienteId = this.$route.params.id;
        axios.get("http://localhost/Projects/patients/pacientes?id=" + this.form.pacienteId)
            .then(data => {
                this.form.nombre = data.data[0].Nombre;
                this.form.dni = data.data[0].DNI;
                this.form.direccion = data.data[0].Direccion;
                this.form.correo = data.data[0].Correo;
                this.form.codigoPostal = data.data[0].CodigoPostal;
                this.form.genero = data.data[0].Genero;
                this.form.telefono = data.data[0].Telefono;
                this.form.fechaNacimiento = data.data[0].FechaNacimiento;
                this.form.token = localStorage.getItem("token");
                console.log(this.form);

            })
    }
}
</script>

<style scoped>
.left {
    text-align: left;
}
</style>