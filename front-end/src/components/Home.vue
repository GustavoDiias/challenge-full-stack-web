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
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="student.ra"
                          label="Ra"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="student.nome"
                          label="Nome"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="student.email"
                          label="Email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="student.cpf"
                          label="CPF"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text> Cancelar </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
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
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Nome"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Email"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text> Cancelar </v-btn>
                  <v-btn color="blue darken-1" text> Salvar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </div>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Apagar este aluno?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text>Cancelar</v-btn>
              <v-btn color="blue darken-1" text>OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2"> mdi-pencil </v-icon>
      <v-icon small> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import api from "../plugins/axios";

export default {
  mounted() {
    api
      .get("/")
      .then((res) => {
        this.students = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
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
      ra: "",
      nome: "",
      email: "",
      cpf: "",
    },
  }),
  watch: {
    dialogCreate(val) {
      val || this.closeCreate();
    },
    dialogEdit(val) {
      val || this.closeEdit();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    save() {
      api
        .post("/create", {
          ra: this.student.ra,
          name: this.student.name,
          email: this.student.email,
          cpf: this.student.cpf,
        })
        .then((res) => {
          alert("Salvo com sucesso!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
