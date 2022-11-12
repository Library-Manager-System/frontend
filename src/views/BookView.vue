<script lang="ts">
export default {
  data: () => ({
    book: {
      title: "",
      author: "",
      publisher: "",
      year: 0,
      synopsis: "",
      category: "",
    },
  }),

  mounted() {
    fetch(
      import.meta.env.VITE_API_URL +
        "/book/isbn?" +
        new URLSearchParams({ isbn: this.$route.params.isbn.toString() })
    )
      .then((res) => res.json())
      .then((json) => {
        this.book = {
          title: json.title,
          author: json.author,
          publisher: json.publisher,
          year: json.year,
          synopsis: json.synopsis,
          category: json.category,
        };
      });
  },
};
</script>

<template>
  <main>
    <div class="book">
      <img
        :src="`https://covers.openlibrary.org/b/isbn/${$route.params.isbn}-L.jpg`"
        :alt="book.title"
        :title="book.title"
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
        <li><strong>Categorias: </strong>{{ book.category }}</li>
      </ul>
    </div>
  </main>
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
