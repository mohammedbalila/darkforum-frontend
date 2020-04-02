<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form @submit.prevent="signIn" class="card card-form">
        <h1 class="text-center">Login</h1>

        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model="form.username"
            @blur="$v.form.username.$touch()"
            id="username"
            type="text"
            class="form-input"
          />
          <template v-if="$v.form.username.$error">
            <span v-if="!$v.form.username.required" class="form-error">This field is required</span>
          </template>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="form.password"
            @blur="$v.form.password.$touch()"
            id="password"
            type="password"
            class="form-input"
          />
          <template v-if="$v.form.password.$error">
            <span v-if="!$v.form.password.required" class="form-error">This field is required</span>
            <span v-if="!$v.form.password.minLength" class="form-error"
              >The password must be at least 6 characters long</span
            >
          </template>
        </div>

        <div class="push-top">
          <button type="submit" class="btn-blue btn-block">Log in</button>
        </div>

        <div class="form-actions text-right">
          <router-link :to="{ name: 'Register' }">Create an account?</router-link>
        </div>
      </form>

      <div class="push-top text-center">
        <button @click="signInWithGoogle" class="btn-red btn-xsmall">
          <i class="fa fa-google fa-btn"></i>Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      form: {
        username: null,
        password: null
      }
    };
  },

  validations: {
    form: {
      username: {
        required
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },

  methods: {
    signIn() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.$store
          .dispatch('auth/signIn', {
            username: this.form.username,
            password: this.form.password
          })
          .then(user => {
            if (user.token) {
              this.successRedirect();
            }
          })
          .catch(error => alert(`🤷‍️${error.message}`));
      }
    },
    signInWithGoogle() {
      this.$store
        .dispatch('auth/signInWithGoogle')
        .then(() => this.successRedirect())
        .catch(error => alert(`🤷‍️${error.message}`));
    },
    successRedirect() {
      const redirectTo = this.$route.query.redirectTo || { name: 'Home' };
      this.$router.push(redirectTo);
    }
  },

  created() {
    this.$emit('ready');
  }
};
</script>

<style scoped></style>
