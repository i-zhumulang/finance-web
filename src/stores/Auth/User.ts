import { defineStore } from "pinia";

export const useUser = defineStore('user', {
    state: () => {
        return {
            user: {
                name: "",
                token: "",
            },
        }
    },
    actions: {
        setUser(user: { name: string, token: string }) {
            this.user = user
        },
    },
    getters: {
        token: (state) => state.user.token
    },
    persist: {
        enabled: true
    },
});