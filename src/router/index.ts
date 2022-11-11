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
  ],
});

export default router;
