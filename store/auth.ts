import { defineStore } from 'pinia'

interface loginForm {
  email: string
  password: string
}

interface user {
  id: string
  username: string
  email: string
  role: string
  jwt_token: string
}

interface registerData {
  username: string
  email: string
  password: string
}

interface changePassowrd {
  actualPassword: string
  newPassword: string
  repeatedNewPassword: string
}

interface resetPassword {
  newPassword: string
  email: string
  resetCode: string
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    baseUrl: useRuntimeConfig().public.API_BASE_URL,
    /* Initialize state from local storage to enable user to stay logged in */
    user: {} as user,
    token: process.server ? '' : localStorage.getItem('token'),
    isLoggedIn: process.server ? false : !!localStorage.getItem('user'),
  }),
  actions: {
    async login(loginForm: loginForm) {
      await $fetch(`${this.baseUrl}/auth/signin`, {
        method: 'POST',
        body: loginForm,
        credentials: 'include',
      })
        .then(response => {
          /* Update Pinia state */
          this.user = response as user
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

    async logout() {
      const cookieToken = useCookie('isLogged')
      const tokenCookie = useCookie('token')
      localStorage.removeItem('user')
      localStorage.removeItem('token')

      cookieToken.value = null
      tokenCookie.value = null
      this.user = {} as user
      this.token = null
      this.isLoggedIn = false

      await $fetch(`${this.baseUrl}/auth/signout`, {
        method: 'POST',
        credentials: 'include',
      })
    },

    async redirectLogin() {
      const router = useRouter()

      await this.logout()
      router.push('/login')
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
        let savedData: user
        const stringSavedData = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if (stringSavedData) {
          savedData = JSON.parse(stringSavedData)
        } else {
          return
        }
    
        if(token && savedData) {
            const cookieToken = useCookie('isLogged')
            cookieToken.value = 'true'
            this.user = {
              id: savedData.id,
              username: savedData.username,
              email: savedData.email,
              role: savedData.role,
              jwt_token: token,
            }
            this.token = token
            this.isLoggedIn = !!savedData
        }
      }
    },

    async signup(registerData: registerData) {
      await $fetch(`${this.baseUrl}/auth/signup`, {
        method: 'POST',
        body: registerData
      })
        .catch(error => { throw error })
    },

    async changePassword(changePassowrdData: changePassowrd) {
      await $fetch(`${this.baseUrl}/auth/change-password`, {
        method: 'POST',
        credentials: 'include',
        body: {
          ...changePassowrdData,
          userId: this.user.id
        }
      })
        .catch(error => { throw error })
    },

    async forgotPassword(forgotPasswordEmail: string) {
      await $fetch(`${this.baseUrl}/auth/forgot-password`, {
        method: 'POST',
        body: {
          email: forgotPasswordEmail,
        }
      })
        .catch(error => { throw error })
    },

    async resetPassword(resetPasswordData: resetPassword) {
      await $fetch(`${this.baseUrl}/auth/reset-password`, {
        method: 'POST',
        body: {
          ...resetPasswordData
        }
      })
        .catch(error => { throw error })
    }
  },
  getters: {
    getIsLoggedIn: state => state.isLoggedIn,
  }
})