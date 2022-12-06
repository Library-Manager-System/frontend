import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/auth",
      name: "auth",
      redirect: { name: "auth.login" },
      children: [
        {
          path: "login",
          name: "auth.login",
          component: () => import("@/views/auth/LoginView.vue"),
        },
        {
          path: "logout",
          name: "auth.logout",
          component: () => import("@/views/auth/LogoutView.vue"),
        },
        {
          path: "signup",
          name: "auth.signup",
          component: () => import("@/views/auth/SignupView.vue"),
        },
      ],
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/SettingsView.vue"),
    },
    {
      path: "/book/:isbn",
      name: "book",
      component: () => import("@/views/BookView.vue"),
    },
    {
      path: "/librarian",
      name: "librarian",
      component: () => import("@/views/librarian/LibrarianView.vue"),
    },
    {
      path: "/librarian/loans",
      name: "librarian.loans",
      component: () => import("@/views/librarian/LoanView.vue"),
    },
    {
      path: "/librarian/users",
      name: "librarian.users",
      component: () => import("@/views/librarian/UserView.vue"),
    },
  ],
});

export default router;
