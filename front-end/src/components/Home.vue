<template>
  <v-data-table
    :headers="headers"
    :items="students"
    sort-by="ra"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Alunos Cadastrados</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <div>
          <template>
            <v-dialog v-model="dialogCreate" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  >Cadastrar Aluno</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Cadastrar Alunos</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="student.ra"
                          :rules="rules"
                          label="Ra"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="student.name"
                          :rules="rules"
                          label="Nome"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="student.email"
                          :rules="rules"
                          label="Email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="student.cpf"
                          :rules="rules"
                          label="CPF"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialogCreate = false"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="saveCreate">
                    Salvar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </div>

        <div>
          <template>
            <v-dialog v-model="dialogEdit" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Editar Aluno</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Nome"
                          :rules="rules"
                          v-model="student.name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Email"
                          :rules="rules"
                          v-model="student.email"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialogEdit = false">
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="saveEdit">
                    Salvar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </div>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="justify-center"
              >Apagar este aluno?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete = false"
                >Cancelar</v-btn
              >
              <v-btn color="blue darken-1" text @click="saveDelete">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="openEdit(item)"> mdi-pencil </v-icon>
      <v-icon small @click="openDeleted(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import api from "../plugins/axios";

export default {
  mounted() {
    this.fetchItems();
  },
  data: () => ({
    dialogCreate: false,
    dialogEdit: false,
    dialogDelete: false,
    headers: [
      {
        text: "Registro Academico",
        align: "start",
        sortable: false,
        value: "ra",
      },
      { text: "Nome", value: "name" },
      { text: "Email", value: "email" },
      { text: "CPF", value: "cpf" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    students: [],
    student: {
      id: "",
      ra: "",
      name: "",
      email: "",
      cpf: "",
    },
    rules: [(value) => !!value || "Required."],
  }),
  watch: {},
  methods: {
    fetchItems() {
      return api
        .get("/")
        .then((res) => {
          this.students = res.data;
        })
        .catch((err) => {
          alert("erro:" + err);
        });
    },
    saveCreate() {
      api
        .post("/create", {
          ra: this.student.ra,
          name: this.student.name,
          email: this.student.email,
          cpf: this.student.cpf,
        })
        .then((res) => {
          this.dialogCreate = false;
          alert("Salvo com sucesso!");
          this.fetchItems();
        })
        .catch((err) => {
          alert("erro:" + err);
        });
    },
    openEdit(item) {
      this.dialogEdit = true;
      this.student.id = item.id;
      this.student.name = item.name;
      this.student.email = item.email;
    },
    saveEdit() {
      api
        .put("/update/" + this.student.id, {
          name: this.student.name,
          email: this.student.email,
        })
        .then((res) => {
          this.dialogEdit = false;
          alert("Editado com sucesso!");
          this.fetchItems();
        })
        .catch((err) => {
          alert("erro:" + err);
        });
    },
    openDeleted(item) {
      this.dialogDelete = true;
      this.student.id = item.id;
    },
    saveDelete() {
      api
        .delete("/delete/" + this.student.id)
        .then((res) => {
          this.dialogDelete = false;
          alert("Deletado com sucesso!");
          this.fetchItems();
        })
        .catch((err) => {
          alert("erro:" + err);
        });
    },
  },
};
</script>
