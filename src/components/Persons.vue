<template>
  <div id="persons">
    <div class="text-center mb-3">
      <h3>Pessoas</h3>
    </div>
    <div class="text-right pt-3 pb-3">
      <b-button
        id="add-btn"
        title="Adicionar pessoa"
        class="bg-success"
        @click="add()"
      >
        Adicionar
      </b-button>
    </div>
    <div class="table">
      <b-table striped hover :items="persons" :fields="fields" show-empty>
        <template v-slot:cell()="{ value }">
          <template>
            <i>{{ value }}</i>
          </template>
        </template>

        <template v-slot:cell(opcoes)="{ item, index }">
          <b-button
            id="remove-btn"
            title="Remover pessoa"
            class="bg-danger"
            @click="remove(index, item)"
          >
            <b-icon icon="trash"></b-icon>
          </b-button>
        </template>

        <template #empty="">
          <div class="text-center">
            <h6>Nenhum resultado encontrado</h6>
          </div>
        </template>
      </b-table>
    </div>

    <!-- Alerta de sucesso -->
    <b-alert
      variant="success"
      :show="dismissCountDown"
      dismissible
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      Successo! ({{ dismissCountDown }} ...)
    </b-alert>

    <!-- Alerta de erro -->
    <b-alert v-model="error" variant="danger" dismissible>
      Oops! Algo errado ocorreu!
    </b-alert>

    <!-- Modal Pessoa -->
    <form-person :active.sync="active" @addPerson="addItem"></form-person>
  </div>
</template>

<script>
import FormPerson from "./modals/FormPerson.vue";
import { getUsers, deleteUser, createUser } from "../services/rest";
import { query } from "../services/graphql"; 
export default {
  components: {
    FormPerson
  },
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      error: false,

      active: false,

      items: [
        { idade: 40, nome: "Dickerson", sobrenome: "Macdonald" },
        { idade: 21, nome: "Larsen", sobrenome: "Shaw" },
        { idade: 89, nome: "Geneva", sobrenome: "Wilson" },
        { idade: 38, nome: "Jami", sobrenome: "Carney" }
      ],
      persons: [],
      fields: [
        {
          key: "age",
          label: "Idade",
          sortable: true
        },
        {
          key: "name",
          label: "Nome",
          sortable: true
        },
        {
          key: "lastname",
          label: "Sobrenome",
          sortable: true
        },
        {
          key: "opcoes",
          label: "Opções"
        }
      ]
    };
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      const usersRest = await getUsers();
      const usersGraphql = await query(`{
        userMany (filter: {}){
          _id
          name
          lastname
          age
        }
      }`);
      this.persons = [...usersRest]
      console.log('rest: ', usersRest)
      console.log('graphql: ', usersGraphql)
    },
    add() {
      this.active = true;
    },

    async remove(index, item = {}) {
      const res = deleteUser(item._id)
      await this.load()
      this.dismissCountDown = this.dismissSecs;
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },

    async addItem(form) {
      const item = {
        age: form.idade ? parseInt(form.idade, 10) : 0,
        name: form.nome,
        lastname: form.sobrenome,
        email: form.email
      };
      await createUser(item);
      this.load()
      this.active = false;
    }
  }
};
</script>

<style scoped>
#persons,
.table {
  color: white;
}
</style>
