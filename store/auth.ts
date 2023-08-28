import { defineStore } from 'pinia'

const baseUrl = 'http://localhost:8080/api'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    /* Initialize state from local storage to enable user to stay logged in */
    user: process.server ? '' : JSON.parse(localStorage.getItem('user')),
    token: process.server ? '' : JSON.parse(localStorage.getItem('token')),
    isLoggedIn: process.server ? false : !!localStorage.getItem('user'),
  }),
  actions: {
    async login(loginForm) {
      await $fetch(`${baseUrl}/auth/signin`, {
        method: 'POST',
        body: loginForm,
        credentials: 'include',
      })
        .then(response => {
          /* Update Pinia state */
          this.user = response
          this.token = this.user.jwt_token
          this.isLoggedIn = true
          const cookieToken = useCookie('isLogged')
          cookieToken.value = 'true'
          /* Store user in local storage to keep them logged in between page refreshes */
          localStorage.setItem('user', JSON.stringify(this.user))
          localStorage.setItem('token', JSON.stringify(this.token))
        })
        .catch(error => { throw error })
    },

    logout() {
      const cookieToken = useCookie('isLogged')
      const tokenCookie = useCookie('token')
      localStorage.removeItem('user')
      localStorage.removeItem('token')

      cookieToken.value = null
      tokenCookie.value = null
      this.user = null
      this.token = null
      this.isLoggedIn = false
    },

    manageLoginSession() {
      const isLoggedCookie = useCookie('isLogged')
      this.isLoggedIn = !!isLoggedCookie.value
      if (!this.isLoggedIn) {
          const tokenCookie = useCookie('token')
          tokenCookie.value = null
      }
    },

    manageLoginSessionClient() {
      if (this.isLoggedIn) {
        const savedData = localStorage.getItem('user')
        const token = localStorage.getItem('token')
    
        if(token && savedData) {
            const cookieToken = useCookie('isLogged')
            cookieToken.value = 'true'
            this.user = savedData
            this.token = token
            this.isLoggedIn = !!savedData
        }
      }
    }
  },
  getters: {
    getIsLoggedIn: state => state.isLoggedIn,
  }
})