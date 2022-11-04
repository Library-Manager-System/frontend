import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { useJwt } from "@vueuse/integrations/useJwt";

export const useAuth = defineStore("auth", {
  state: () => ({
    user: {
      token: useLocalStorage("olms-token", ""),
    },
  }),

  getters: {
    userAuthenticated: (state) => state.user.token.length > 0,
    userData: (state) => {
      const { payload } = useJwt(state.user.token);
      return payload.value;
    },
  },

  actions: {
    async login(email: string, password: string) {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + "/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const json = await res.json();

        if (res.ok) {
          this.user.token = json.access_token ?? "";
        } else {
          return new Error(json.detail);
        }
      } catch (err) {
        return err;
      }
    },

    logout() {
      this.user.token = "";
    },

    async protectedFetch(
      path: string,
      method: "GET" | "POST" = "POST",
      payload: object = {}
    ) {
      if (this.user.token.length < 1) return;

      const res = await fetch(import.meta.env.VITE_API_URL + path, {
        method: method,
        headers: {
          Authorization: "Bearer " + this.user.token,
          "Content-Type": "application/json",
        },
        body: method === "POST" ? JSON.stringify(payload) : null,
      });

      const json = await res.json();

      if (res.ok) {
        return json;
      } else {
        return new Error(json.detail);
      }
    },
  },
});
