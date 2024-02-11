<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <v-row v-if="propsClient?.id">
      <v-col cols="6">
        <v-text-field
          :value="propsClient?.id"
          label="ID do produto"
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
          label="CPF ou CNPJ"
          color="accent"
          :rules="[rules.cpfOuCnpj]"
          required
          ref="cpfOuCnpj"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model.trim="formFields.idUsuario"
          label="ID Usuário"
          color="accent"
          :rules="[rules.required, rules.minLength]"
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
          :rules="[rules.required, rules.minLength]"
          required
          ref="email"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model.trim="formFields.telefone"
          label="Telefone"
          color="accent"
          :rules="[rules.required, rules.minLength]"
          required
          ref="telefone"
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
import { showSnackbar } from "../../store/snackBar/snackBar.state";
import { ApiProduct } from "../../types/product.types";

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
      console.log("submit");
      //   const formRef = this.$refs.form as HTMLFormElement;

      //   this.valid = formRef.validate();

      //   if (!this.valid) {
      //     showSnackbar("Preencha os campos corretamente", "error");
      //     return;
      //   }

      //   const valor = (this.produto.valor as string).replace(",", ".");

      //   const apiProduct: Omit<ApiProduct, "id" | "dataCadastro"> = {
      //     ...this.produto,
      //     valor: Number(valor),
      //     quantidadeEstoque: Number(this.produto.quantidadeEstoque),
      //   };

      //   this.$emit("submit", apiProduct);
    },
    reset() {
      //   this.produto = {
      //     nome: "",
      //     valor: "",
      //     quantidadeEstoque: "",
      //     observacao: "",
      //   };

      const formRef = this.$refs.form as HTMLFormElement;
      formRef.resetValidation();
    },
  },
});

export default ClientForm;
</script>
