<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model.trim="computedProduto.id"
          label="ID do produto"
          required
          ref="id"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model.trim="computedProduto.dataCadastro"
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
          v-model.trim="computedProduto.nome"
          label="Nome do produto"
          color="accent"
          :rules="[rules.required, rules.minLength]"
          required
          ref="nome"
        ></v-text-field>
      </v-col>
      <v-col cols="6" sm="4">
        <v-text-field
          v-model.trim="computedProduto.valor"
          label="Valor do produto"
          color="accent"
          prefix="R$"
          :rules="[rules.required, rules.shouldBeNumber, rules.positivePrice]"
          required
          ref="valor"
        ></v-text-field>
      </v-col>
      <v-col cols="6" sm="4">
        <v-text-field
          v-model.trim="computedProduto.quantidadeEstoque"
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
          v-model.trim="computedProduto.observacao"
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

type dataReturnType = {
  // produto: ProductFormFields;
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
      type: Object as PropType<Product>,
      required: false,
    },
  },
  data(): dataReturnType {
    return {
      rules: {
        required: (value: string) => !!value || "Campo obrigatório",
        shouldBeNumber: (value: string) =>
          !isNaN(parseFloat(value)) || "Valor deve ser numérico",
        positivePrice: (value: string) =>
          parseFloat(value) > 0 || "Valor deve ser positivo",
        minLength: (value: string) =>
          value?.length >= 3 || "Mínimo de 3 caracteres",
        maxLength: (value: string) =>
          value?.length <= 255 || "Máximo de 255 caracteres",
      },
      valid: false,
    };
  },
  computed: {
    computedProduto: {
      get(): Product {
        if (this.propsProduct) {
          return {
            ...this.propsProduct,
            valor: this.propsProduct.valor
              ? this.propsProduct.valor
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                  .replace("R$", "")
              : "",
          };
        } else {
          return {
            nome: "",
            valor: "",
            quantidadeEstoque: "",
            observacao: "",
          };
        }
      },
    },
  },
  methods: {
    submit() {
      const formRef = this.$refs.form as HTMLFormElement;

      this.valid = formRef.validate();

      if (!this.valid) {
        showSnackbar("Preencha os campos corretamente", "error");
        return;
      }

      const valor = (this.computedProduto.valor as string).replace(",", ".");

      const apiProduct: Omit<ApiProduct, "id" | "dataCadastro"> = {
        ...this.computedProduto,
        valor: Number(valor),
        quantidadeEstoque: Number(this.computedProduto.quantidadeEstoque),
      };

      this.$emit("submit", apiProduct);
    },
    reset() {
      this.computedProduto = {
        nome: "",
        valor: null,
        quantidadeEstoque: null,
        observacao: "",
      };

      this.valid = false;

      (this.$refs.form as HTMLFormElement).resetValidation();
    },
  },
});

export default ProductForm;
</script>
