<script lang="ts">
import { useAuth } from "@/stores/auth";
import VanillaTilt from "vanilla-tilt";
import ProtectedRoute from "@/components/ProtectedRoute.vue";

export default {
  data: () => ({
    authStore: useAuth(),
    isbn: "",
    book: {
      title: "",
      author: "",
      publisher: "",
      year: 0,
      synopsis: "",
      category: "",
      copies: 0,
    },
    loanLoading: false,
    loanError: "",
    loanMessage: "",
  }),

  methods: {
    async fetchBookData() {
      const json = await this.authStore.protectedFetch("/book/isbn", "GET", {
        isbn: this.isbn,
      });

      this.book = {
        title: json.title_book,
        author: json.name_author.join(", "),
        publisher: json.name_publisher.join(", "),
        year: json.year_book,
        synopsis: json.synopsis_book,
        category: json.name_category,
        copies: json.available_copy,
      };
    },

    async newLoan() {
      if (this.loanMessage.length > 0) return;

      this.loanLoading = true;

      if (this.isbn.length > 0) {
        const res = await this.authStore.protectedFetch(
          "/book/loan/request",
          "POST",
          { isbn: this.isbn }
        );

        if (res instanceof Error || res === undefined) {
          this.loanError = res.message;
        } else {
          this.loanMessage = "Empréstimo solicitado";
        }
      }

      this.fetchBookData();
      this.loanLoading = false;
    },
  },

  async mounted() {
    this.isbn = this.$route.params.isbn.toString();

    this.fetchBookData();

    VanillaTilt.init(document.querySelector(".book") as HTMLElement, {
      reverse: true,
      max: 5,
    });
  },

  components: { ProtectedRoute },
};
</script>

<template>
  <ProtectedRoute>
    <main>
      <div class="book" data-tilt>
        <img
          :src="`https://covers.openlibrary.org/b/isbn/${$route.params.isbn}-L.jpg`"
          :alt="book.title"
        />
      </div>
      <div>
        <h2>{{ book.title }}</h2>
        <ul class="book-info">
          <li><strong>ISBN: </strong>{{ $route.params.isbn }}</li>
          <li><strong>Autor: </strong>{{ book.author }}</li>
          <li><strong>Editora: </strong>{{ book.publisher }}</li>
          <li><strong>Ano de publicação: </strong>{{ book.year }}</li>
          <li><strong>Sinopse: </strong>{{ book.synopsis }}</li>
          <li><strong>Categoria: </strong>{{ book.category }}</li>
          <li><strong>Cópias disponíveis: </strong>{{ book.copies }}</li>
        </ul>
        <button
          type="button"
          @click="newLoan"
          :class="
            loanError.length > 0
              ? 'button-error'
              : loanLoading
              ? 'button-disabled'
              : loanMessage.length > 0 && 'loan-success'
          "
        >
          <span v-if="loanMessage.length > 0">{{ loanMessage }}</span>
          <span v-else-if="loanError.length > 0">{{ loanError }}</span>
          <span v-else-if="loanLoading">Aguarde...</span>
          <span v-else>Soliciar empréstimo</span>
        </button>
      </div>
    </main>
  </ProtectedRoute>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  width: 100%;
  height: 100%;
}

.book {
  width: auto;
  height: 70vh;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
}

.book img {
  width: 100%;
  height: 100%;
}

.book-info {
  list-style-type: none;
  padding: 0;
}

button {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--shadow-color);
  background-color: #fff;
  box-shadow: 2px 2px 0px var(--shadow-color);
  outline: none;
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

.loan-success,
.loan-success:hover,
.loan-success:active {
  box-shadow: none;
  transform: none;
  cursor: default;
  opacity: 0.8;
}

@media screen and (max-width: 768px) {
  main {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 2rem;
    gap: 1rem;
  }

  .book {
    width: 70%;
    align-self: center;
    height: auto;
  }
}
</style>
