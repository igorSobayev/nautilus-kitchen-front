export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
      en: {
        welcome: 'Welcome',
        succesfullyRegistered: 'You have successfully registered!',
        passwordsNotMatch: 'Passwords do not match!',
        required: 'Required',
        user: 'User',
        password: 'Password',
        repeatPassword: 'Repeat Password',
        signup: 'Register',
        nowYouCanStartCreatingRecipes: `Now you can start creating great recipes, let's get to it!`,
      },
      es: {
        welcome: 'Bienvenido',
        succesfullyRegistered: '¡Te has registrado con éxito!',
        passwordsNotMatch: 'Las contraseñas no coinciden!',
        required: 'Requerido',
        user: 'Usuario',
        password: 'Contraseña',
        repeatPassword: 'Repetir Contraseña',
        signup: 'Registrarse',
        nowYouCanStartCreatingRecipes: '¡Ahora ya puedes empezar a crear recetas geniales, a por ellas!'
      }
    }
  }))