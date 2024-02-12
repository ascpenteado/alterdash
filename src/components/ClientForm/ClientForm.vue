<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <v-row v-if="propsClient?.id">
      <v-col cols="6">
        <v-text-field
          :value="propsClient?.id"
          label="ID do cliente"
          required
          ref="id"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          :value="propsClient?.dataCadastro"
          label="Data de Cadastro"
          required
          ref="dataCadastro"
          disabled
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model.trim="formFields.nome"
          label="Nome do cliente"
          color="accent"
          :rules="[rules.required, rules.minLength]"
          required
          ref="nome"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model.trim="formFields.cpfOuCnpj"
          label="CPF/CNPJ"
          color="accent"
          :rules="[rules.cpfOuCnpj]"
          required
          ref="cpfOuCnpj"
          v-maska
          data-maska="['###.###.###-##','##.###.###/####-##']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model.trim="formFields.idUsuario"
          label="ID Usuário"
          color="accent"
          :rules="[rules.required, rules.shouldBePositiveInteger]"
          required
          ref="idUsuario"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model.trim="formFields.email"
          label="Email"
          color="accent"
          :rules="[rules.required, rules.email]"
          required
          ref="email"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model.trim="formFields.telefone"
          label="Telefone"
          color="accent"
          :rules="[rules.required, rules.phone]"
          required
          ref="telefone"
          v-maska
          data-maska="['(##) ####-####','(##) #####-####']"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-spacer class="mt-3"></v-spacer>
    <v-btn type="submit" class="mr-3">Salvar</v-btn>
    <v-btn v-if="!propsClient?.id" @click="reset">Limpar</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { ApiClientData } from "../../types/clients.types";
import { formValidationRules } from "../../utils/formValidationRules";
import store, { SnackbarMutation } from "@/store";

type dataReturnType = {
  client: Omit<ApiClientData, "id">;
  rules: Record<string, (value: string) => boolean | string>;
  valid: boolean;
};

const ClientForm = Vue.extend({
  props: {
    propsClient: {
      type: Object as PropType<ApiClientData>,
      required: false,
    },
  },
  data(): dataReturnType {
    return {
      client: {
        dataCadastro: "",
        cpfOuCnpj: "",
        idUsuario: Number(""),
        email: "",
        nome: "",
        telefone: "",
      },

      rules: {
        ...formValidationRules,
      },
      valid: false,
    };
  },
  watch: {
    formFields: {
      handler(value: Omit<ApiClientData, "id">) {
        this.client = value;
      },
      deep: true,
    },
  },
  computed: {
    formFields: {
      get(): Omit<ApiClientData, "id"> {
        if (this.propsClient) {
          return {
            ...this.propsClient,
          };
        }
        return this.client;
      },
    },
  },
  methods: {
    submit() {
      const formRef = this.$refs.form as HTMLFormElement;

      this.valid = formRef.validate();

      if (!this.valid) {
        store.commit(SnackbarMutation.ShowSnackbar, {
          message: "Preencha os campos corretamente",
          color: "error",
        });
        return;
      }

      // limpando as máscasras
      const cpfOuCnpj = this.client.cpfOuCnpj.replace(/[^\d]+/g, "");

      const telefone = this.client.telefone.replace(/[^\d]+/g, "");

      const idUsuario = Number(this.client.idUsuario);

      this.client = {
        ...this.client,
        cpfOuCnpj,
        telefone,
        idUsuario,
      };

      this.$emit("submit", this.client);
    },
    reset() {
      this.client = {
        dataCadastro: "",
        cpfOuCnpj: "",
        idUsuario: Number(""),
        email: "",
        nome: "",
        telefone: "",
      };

      const formRef = this.$refs.form as HTMLFormElement;
      formRef.resetValidation();
    },
  },
});

export default ClientForm;
</script>
