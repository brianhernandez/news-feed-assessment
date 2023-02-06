<script setup>
import { RouterLink, RouterView } from "vue-router";
import { storeToRefs } from "pinia";
import TheHero from "./components/TheHero.vue";
import { useArticlesStore } from "./stores";

const articlesStore = useArticlesStore();
const { selectedArticle } = storeToRefs(articlesStore);
</script>

<template>
  <TheHero :title="selectedArticle?.title" />

  <nav class="my-3">
    <RouterLink
      v-if="$route.name !== 'home'"
      to="/"
      @click="articlesStore.resetArticle()"
      class="text-decoration-none"
      >Back To Main Feed</RouterLink
    >
    <button
      @click="articlesStore.fetchArticles()"
      v-if="$route.name === 'home'"
      class="btn btn-primary btn-lg px-4"
    >
      Update Feed
    </button>
  </nav>

  <div class="wrapper mx-auto">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in"
        ><Component :is="Component" :key="$route.path" /> </transition
    ></RouterView>
  </div>

  <footer class="mt-5"></footer>
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.wrapper {
  padding: 2rem;
}

@media (min-width: 1024px) {
  nav {
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }

  .wrapper {
    max-width: 1280px;
    padding: 0 2rem;
    min-height: 100vh;
  }

  footer {
    height: 20vh;
    background: rgb(49, 78, 154);
    background: linear-gradient(
      0deg,
      rgba(49, 78, 154, 1) 0%,
      rgba(109, 159, 201, 1) 94%
    );
  }
}
</style>
