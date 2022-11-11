<script lang="ts">
interface Book {
  title: string;
  isbn: string;
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
  <div class="book">
    <figure>
      <img
        :src="'https://covers.openlibrary.org/b/isbn/' + book.isbn + '-M.jpg'"
        :alt="book.title"
        :width="100"
        :height="150"
      />
      <figcaption class="title">{{ book.title }}</figcaption>
    </figure>
  </div>
</template>

<style scoped>
.book {
  width: 100px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--shadow-color);
  background-color: #fff;
  margin-bottom: 2.7rem;

  cursor: pointer;
  transition: 0.2s transform;
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
