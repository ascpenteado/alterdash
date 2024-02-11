<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <v-row v-if="propsProduct?.id">
      <v-col cols="6">
        <v-text-field
          :value="propsProduct?.id"
          label="ID do produto"
          required
          ref="id"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          :value="propsProduct?.dataCadastro"
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
          label="Nome do produto"
          color="accent"
          :rules="[rules.required, rules.minLength]"
          required
          ref="nome"
        ></v-text-field>
      </v-col>
      <v-col cols="6" sm="4">
        <v-text-field
          v-model.trim="formFields.valor"
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
          v-model.trim="formFields.quantidadeEstoque"
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
          v-model.trim="formFields.observacao"
          label="Observação do produto"
          color="accent"
          :rules="[rules.minLength, rules.maxLength]"
          ref="observacao"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-spacer class="mt-3"></v-spacer>
    <v-btn type="submit" class="mr-3">Salvar</v-btn>
    <v-btn v-if="!propsProduct?.id" @click="reset">Limpar</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { ApiProduct, Product } from "@/types/product.types";
import { showSnackbar } from "@/store/snackBar/snackBar.state";
import { formValidationRules } from "@/utils/formValidationRules";

type dataReturnType = {
  produto: Product;
  rules: Record<string, (value: string) => boolean | string>;
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
      produto: {
        nome: "",
        valor: "",
        quantidadeEstoque: "",
        observacao: "",
      },

      rules: {
        ...formValidationRules,
      },
      valid: false,
    };
  },
  watch: {
    formFields: {
      handler(value: Product) {
        this.produto = value;
      },
      deep: true,
    },
  },
  computed: {
    formFields: {
      get(): Product {
        if (this.propsProduct) {
          // If propsProduct exists, return it
          return {
            ...this.propsProduct,
            valor:
              this.propsProduct.valor
                ?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
                .replace("R$", "") ?? "",
          };
        }
        return this.produto;
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

      const valor = (this.produto.valor as string).replace(",", ".");

      const apiProduct: Omit<ApiProduct, "id" | "dataCadastro"> = {
        ...this.produto,
        valor: Number(valor),
        quantidadeEstoque: Number(this.produto.quantidadeEstoque),
      };

      this.$emit("submit", apiProduct);
    },
    reset() {
      this.produto = {
        nome: "",
        valor: "",
        quantidadeEstoque: "",
        observacao: "",
      };

      const formRef = this.$refs.form as HTMLFormElement;
      formRef.resetValidation();
    },
  },
});

export default ProductForm;
</script>
