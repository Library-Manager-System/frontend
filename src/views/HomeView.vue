<script lang="ts">
import BookDetail from "@/components/BookDetail.vue";
import PermissionLevel from "@/components/PermissionLevel.vue";
import ProtectedRoute from "@/components/ProtectedRoute.vue";
import SearchBar from "@/components/SearchBar.vue";
import ViewContainer from "@/components/ViewContainer.vue";
import { useAuth } from "@/stores/auth";
import { defineComponent } from "vue";

interface Book {
  isbn: string;
  title: string;
}

export default defineComponent({
  data: () => ({
    authStore: useAuth(),
    books: [{ isbn: "", title: "" } as Book],
    booksFilter: [{ isbn: "", title: "" } as Book],
    userPermissionLevel: 0,
  }),

  methods: {
    search(searchText: string) {
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
    ProtectedRoute,
    PermissionLevel,
    ViewContainer,
  },
});
</script>

<template>
  <ProtectedRoute>
    <PermissionLevel :permission-level="1">
      <ViewContainer>
        <SearchBar @on-search="search" />
        <div class="book-container">
          <BookDetail
            v-for="book of booksFilter"
            :key="book.title"
            :book="book"
          />
        </div>
      </ViewContainer>
    </PermissionLevel>
  </ProtectedRoute>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
  gap: 2rem;
}

.book-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 2rem;
  padding: 1rem;
}
</style>
