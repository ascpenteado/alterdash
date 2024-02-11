<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model.trim="produto.nome"
          label="Nome do produto"
          color="accent"
          :rules="[rules.required, rules.minLength]"
          required
          ref="nome"
        ></v-text-field>
      </v-col>
      <v-col cols="6" sm="4">
        <v-text-field
          v-model.trim="produto.valor"
          label="Valor do produto"
          prefix="R$"
          color="accent"
          :rules="[rules.required, rules.shouldBeNumber, rules.positivePrice]"
          required
          ref="valor"
        ></v-text-field>
      </v-col>
      <v-col cols="6" sm="4">
        <v-text-field
          v-model.trim="produto.quantidadeEstoque"
          label="Quantidade em estoque"
          color="accent"
          :rules="[rules.required, rules.shouldBeNumber]"
          required
          ref="quantidadeEstoque"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model.trim="produto.observacao"
          label="Observação do produto"
          color="accent"
          :rules="[rules.minLength]"
          ref="observacao"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-spacer class="mt-3"></v-spacer>
    <v-btn type="submit" class="mr-3">Salvar</v-btn>
    <v-btn @click="reset">Limpar</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { ApiProduct, Product } from "@/types/product.types";
import { showSnackbar } from "@/store/snackBar/snackBar.state";
import { createProduct } from "@/services/product/create-product";

type ProductFormFields = Omit<Product, "id" | "dataCadastro">;
type dataReturnType = {
  produto: ProductFormFields;
  rules: {
    required: (value: string) => boolean | string;
    positivePrice: (value: string) => boolean | string;
    minLength: (value: string) => boolean | string;
    maxLength: (value: string) => boolean | string;
    shouldBeNumber: (value: string) => boolean | string;
  };
  valid: boolean;
};

const ProductForm = Vue.extend({
  props: {
    propsProduct: {
      type: Object as PropType<ProductFormFields>,
      required: false,
    },
  },
  data(): dataReturnType {
    return {
      produto: {
        nome: "",
        valor: "",
        quantidadeEstoque: "",
        observacao: "",
      },
      rules: {
        required: (value: string) => !!value || "Campo obrigatório",
        shouldBeNumber: (value: string) =>
          !isNaN(parseFloat(value)) || "Valor deve ser numérico",
        positivePrice: (value: string) =>
          parseFloat(value) > 0 || "Valor deve ser positivo",
        minLength: (value: string) =>
          value.length >= 3 || "Mínimo de 3 caracteres",
        maxLength: (value: string) =>
          value.length <= 255 || "Máximo de 255 caracteres",
      },
      valid: false,
    };
  },
  methods: {
    submit() {
      const formRef = this.$refs.form as HTMLFormElement;

      this.valid = formRef.validate();

      if (!this.valid) {
        showSnackbar("Preencha os campos corretamente", "error");
        return;
      }

      const apiProduct: Omit<ApiProduct, "id" | "dataCadastro"> = {
        ...this.produto,
        valor: parseFloat(this.produto.valor),
        quantidadeEstoque: parseInt(this.produto.quantidadeEstoque),
      };

      createProduct(apiProduct);
    },
    reset() {
      this.produto = {
        nome: "",
        valor: "",
        quantidadeEstoque: "",
        observacao: "",
      };

      this.valid = false;

      (this.$refs.form as HTMLFormElement).resetValidation();
    },
  },
});

export default ProductForm;
</script>
