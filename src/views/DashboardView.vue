<template>
    <div>
        <HeaderComponent />
        <div class="container right">

            <button class='btn btn-primary mb-4' v-on:click="nuevo()">Agregar Paciente</button>

            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">CI</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Correo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="paciente in Listapacientes" :key="paciente.PacienteId"
                        v-on:click="editar(paciente.PacienteId)">
                        <th scope="row">{{ paciente.PacienteId }}</th>
                        <td>{{ paciente.Nombre }}</td>
                        <td>{{ paciente.DNI }}</td>
                        <td>{{ paciente.Telefono }}</td>
                        <td>{{ paciente.Correo }}</td>
                    </tr>

                </tbody>
            </table>
        </div>

        <FooterComponent />
    </div>
</template>



<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import axios from 'axios'


export default {
    name: "DashboardVue",
    data() {
        return {
            Listapacientes: null,
            pagina: 1
        }
    },
    components: {
        HeaderComponent,
        FooterComponent
    },
    mounted: function () {
        let direccion = 'http://localhost/Projects/patients/pacientes?page=' + this.pagina;
        axios.get(direccion).then(data => {
            this.Listapacientes = data.data;
        })
    },
    methods: {
        editar: function (id) {
            this.$router.push('/editar/' + id);
        },
        nuevo: function () {
            this.$router.push('/nuevo');
        }
    }
}

</script>

<style scoped>
.right {
    text-align: right
}
</style>