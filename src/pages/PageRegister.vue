<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form @submit.prevent="register" class="card card-form">
        <h1 class="text-center">Register</h1>

        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            v-model="form.firstName"
            @blur="$v.form.firstName.$touch()"
            id="firstName"
            type="text"
            class="form-input"
          />
          <template v-if="$v.form.firstName.$error">
            <span v-if="!$v.form.firstName.required" class="form-error">
              This field is required
            </span>
          </template>
          <label for="lastName">Last Name</label>
          <input
            v-model="form.lastName"
            @blur="$v.form.lastName.$touch()"
            id="lastName"
            type="text"
            class="form-input"
          />
          <template v-if="$v.form.lastName.$error">
            <span v-if="!$v.form.lastName.required" class="form-error">
              This field is required
            </span>
          </template>
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model.lazy="form.username"
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
          <label for="email">Email</label>
          <input
            v-model.lazy="form.email"
            @blur="$v.form.email.$touch()"
            id="email"
            class="form-input"
          />
          <template v-if="$v.form.email.$error">
            <span v-if="!$v.form.email.required" class="form-error">This field is required</span>
            <span v-else-if="!$v.form.email.email" class="form-error"
              >This in not a valid email address</span
            >
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

        <div class="form-actions">
          <button type="submit" class="btn-blue btn-block">Register</button>
        </div>
        <div class="text-center push-top">
          <button @click="registerWithGoogle" class="btn-red btn-xsmall">
            Sign up with Google <i class="fa fa-google-plus"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { required, email, minLength, url } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      form: {
        firstName: null,
        lastName: null,
        username: null,
        email: null,
        password: null
      }
    };
  },

  validations: {
    form: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      username: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },

  methods: {
    register() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        return;
      }
      this.$store
        .dispatch('auth/register', this.form)
        .then(resp => {
          this.successRedirect();
        })
        .catch(error => {
          console.log(error);
        });
    },

    registerWithGoogle() {
      this.$store.dispatch('auth/signInWithGoogle').then(() => this.successRedirect());
    },

    successRedirect() {
      const redirectTo = this.$route.query.redirectTo || { name: 'Home' };
      this.$router.push(redirectTo);
    }
  },

  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },

  created() {
    if (this.isLoggedIn) {
      return this.$router.push({ name: 'Home' });
    }
    this.$emit('ready');
  }
};
</script>

<style scoped></style>
