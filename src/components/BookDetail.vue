<script lang="ts">
import VanillaTilt from "vanilla-tilt";

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

  mounted() {
    VanillaTilt.init(
      document.querySelectorAll(".book") as unknown as HTMLElement[],
      {
        scale: 1.05,
        reverse: true,
        max: 10,
      }
    );
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
  border: 1px solid var(--shadow-color);
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 10px 10px rgba(0, 0, 0, 0.06);
}

.book img {
  width: 100%;
  height: 100%;
}

.title {
  font-weight: bold;
  text-align: center;
  font-size: 1rem;
  margin-top: 5px;
}
</style>
