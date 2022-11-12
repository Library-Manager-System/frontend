<script lang="ts">
interface Book {
  isbn: string;
  title: string;
}

export default {
  props: {
    book: {
      required: true,
      type: Object as () => Book,
    },
  },
};
</script>

<template>
  <figure
    class="book"
    @click="$router.push({ name: 'book', params: { isbn: book.isbn } })"
  >
    <img
      :src="`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`"
      :alt="book.title"
      loading="lazy"
    />
    <figcaption class="title">{{ book.title }}</figcaption>
  </figure>
</template>

<style scoped>
.book {
  width: 120px;
  height: 180px;
  margin: 0 auto 2.5rem;
  cursor: pointer;
  transition: 0.2s transform;
  border: 1px solid var(--shadow-color);
}

.book img {
  width: 100%;
  height: 100%;
}

.book:hover {
  transform: scale(1.05);
}

.title {
  font-weight: bold;
  text-align: center;
  font-size: 1rem;

  margin-top: 5px;
}
</style>
