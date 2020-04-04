<template>
  <header
    class="header"
    id="header"
    v-click-outside="closeMobileNavbar"
    v-handle-scroll="closeMobileNavbar"
  >
    <router-link :to="{ name: 'Home' }" class="logo">
      <img style="border-radius: 50%;" src="../assets/img/cover.png" />
    </router-link>

    <div class="btn-hamburger" @click="mobileNavOpen = !mobileNavOpen">
      <!-- use .btn-humburger-active to open the menu -->
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>

    <!-- use .navbar-open to open nav -->
    <div class="app-navbar" :class="{ 'navbar-open': mobileNavOpen }">
      <ul v-if="isLoggedIn">
        <li class="navbar-user" v-click-outside="closeUserDropdown">
          <a @click.prevent="userDropdownOpen = !userDropdownOpen">
            <img
              class="avatar-small"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfouyqq8NpiwUBExXDn0iR1XSl-_i3XYiTqvJ-PkcFxxgRnnZv&usqp=CAU"
              alt
            />
            <span>
              {{ user.username }}
              <img
                class="icon-profile"
                src="../assets/img/arrow-profile.svg"
                alt
              />
            </span>
          </a>

          <!-- dropdown menu -->
          <!-- add class "active-drop" to show the dropdown -->
          <div id="user-dropdown" :class="{ 'active-drop': userDropdownOpen }">
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item">
                <router-link
                  :to="{ name: 'Profile', params: { username: user.username } }"
                >View Profile</router-link>
              </li>
              <li class="dropdown-menu-item">
                <a @click.prevent="$store.dispatch('auth/signOut')">Sign Out</a>
              </li>
            </ul>
          </div>
        </li>
        <li class="navbar-mobile-item">
          <router-link
            :to="{ name: 'Profile', params: {
            username: user.username
            } }"
          >View Profile</router-link>
        </li>
        <li class="navbar-mobile-item">
          <a @click.prevent="$store.dispatch('auth/signOut')">Sign Out</a>
        </li>
      </ul>
      <ul v-else>
        <li class="navbar-item">
          <router-link :to="{ name: 'SignIn' }">Sign In</router-link>
        </li>
        <li class="navbar-item">
          <router-link :to="{ name: 'Register' }">Register</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import clickOutside from '@/directives/click-outside';
import handleScroll from '@/directives/handle-scroll';

export default {
  directives: {
    clickOutside,
    handleScroll
  },

  data() {
    return {
      userDropdownOpen: false,
      mobileNavOpen: false
    };
  },

  computed: {
    ...mapGetters({
      user: 'auth/authUser',
      isLoggedIn: 'auth/isLoggedIn'
    })
  },

  methods: {
    closeUserDropdown() {
      this.userDropdownOpen = false;
    },
    closeMobileNavbar() {
      this.mobileNavOpen = false;
    }
  }
};
</script>

<style scoped></style>
