<script lang="ts">
import BookDetail from "@/components/BookDetail.vue";
import SearchBar from "@/components/SearchBar.vue";
import { useAuth } from "@/stores/auth";

interface Book {
  isbn: string;
  title: string;
}

export default {
  data: () => ({
    authStore: useAuth(),
    books: [{ isbn: "", title: "" } as Book],
    booksFilter: [{ isbn: "", title: "" } as Book],
    userPermissionLevel: 0,
  }),

  methods: {
    search(searchText: string) {
      console.log(searchText);
      this.booksFilter = this.books.filter((book) =>
        book.title.toLowerCase().includes(searchText.toLowerCase())
      );
    },
  },

  async mounted() {
    const json = await this.authStore.protectedFetch("/book", "GET");

    this.books = json.map(
      (book: any) => ({ isbn: book.isbn_book, title: book.title_book } as Book)
    );

    this.booksFilter = this.books;
  },

  components: {
    BookDetail,
    SearchBar,
  },
};
</script>

<template>
  <SearchBar @on-search="search" />
  <div class="book-container">
    <BookDetail v-for="book of booksFilter" :key="book.title" :book="book" />
  </div>
</template>

<style scoped>
.book-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 2rem;
  padding: 1rem;
}
</style>
