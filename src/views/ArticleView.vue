<script setup>
import { onMounted } from "vue";
import { useArticlesStore } from "../stores";
import { storeToRefs } from "pinia";

const articlesStore = useArticlesStore();
const { loading, error, rawArticle } = storeToRefs(articlesStore);

onMounted(() => {
  articlesStore.fetchArticlePage();
});
</script>

<template>
  <main>
    <div
      v-if="loading"
      class="d-flex justify-content-center align-items-center"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-if="!loading && !error" v-html="rawArticle"></div>
    <p v-if="error" class="text-center lead text-danger">{{ error }}</p>
  </main>
</template>
