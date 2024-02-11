<template>
  <div class="no-data">
    <img
      class="illustration"
      src="../../assets/svg/empty.svg"
      alt="Nenhum dado encontrado"
    />
    <p class="text-h3 mt-10">Nenhum registro por aqui...</p>
  </div>
</template>

<style lang="scss" scoped>
.no-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 2rem;

  .illustration {
    max-width: 230px;
    @media screen and (min-width: 600px) {
      max-width: 330px;
    }
  }
}
</style>
