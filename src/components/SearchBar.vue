<script lang="ts">
export default {
  data: () => ({
    search: "",
  }),

  methods: {
    submit() {
      this.$emit("onSearch", this.search);
    },
  },
};
</script>

<template>
  <form @submit.prevent="submit">
    <input
      type="text"
      placeholder="Digite para pesquisar..."
      v-model="search"
    />
    <button type="submit">Pesquisar</button>
  </form>
</template>

<style scoped>
form {
  width: 100%;
  max-width: 768px;
  display: flex;
}

input {
  width: 100%;
}

input,
button {
  padding: 10px 15px;
  border: 1px solid var(--shadow-color);
  background-color: #fff;
  box-shadow: 2px 2px 0px var(--shadow-color);
  outline: none;
  transition: 0.1s;
}

/* input:focus {
  box-shadow: 0px 0px 0px var(--shadow-color);
  transform: translate(1px, 1px);
  transition: 0.1s;
} */

button {
  background-color: var(--sucess-color);
  font-weight: bold;
  transition: ease-in-out 0.1s;
}

button:hover {
  box-shadow: 4px 4px 0px var(--shadow-color);
  transform: translate(-2px, -2px);
}

button:active {
  box-shadow: 0px 0px 0px var(--shadow-color);
  transform: translate(1px, 1px);
}

.button-error {
  background-color: var(--error-color);
}

.button-disabled,
.button-disabled:hover,
.button-disabled:active {
  opacity: 0.8;
  box-shadow: none;
  transform: none;
  cursor: wait;
}
</style>
