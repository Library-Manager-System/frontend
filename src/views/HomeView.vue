<script lang="ts">
import ProtectedRoute from "@/components/ProtectedRoute.vue";
import BookDetail from "@/components/BookDetail.vue";
import SearchBar from "@/components/SearchBar.vue";
import { useAuth } from "@/stores/auth";

export default {
  data: () => ({
    authStore: useAuth(),
    temporaryBooks: [...Array(30).keys()].map((book) => `Livro ${book}`),
    temporaryBooksFilter: [""],
  }),

  methods: {
    search(searchText: string) {
      console.log(searchText);
      this.temporaryBooksFilter = this.temporaryBooks.filter((book) =>
        book.toLowerCase().includes(searchText.toLowerCase())
      );
    },
  },

  mounted() {
    this.temporaryBooksFilter = this.temporaryBooks;
  },

  components: {
    ProtectedRoute,
    BookDetail,
    SearchBar,
  },
};
</script>

<template>
  <ProtectedRoute>
    <main>
      <SearchBar @on-search="search" />
      <div class="book-container">
        <BookDetail
          v-for="book of temporaryBooksFilter"
          :key="book"
          :title="book"
        />
      </div>
    </main>
  </ProtectedRoute>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.book-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 1rem;

  padding: 1rem;
}
</style>
