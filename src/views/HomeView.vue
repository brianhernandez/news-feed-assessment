<script setup>
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import ArticleTeaser from "../components/ArticleTeaser.vue";
import { useArticlesStore } from "../stores";

const articlesStore = useArticlesStore();
const { articles } = storeToRefs(articlesStore);

onMounted(() => {
  if (articlesStore.articles.length === 0) {
    articlesStore.fetchArticles();
  }
});
</script>

<template>
  <main>
    <div
      v-if="articlesStore.articles.length === 0"
      class="d-flex justify-content-center align-items-center"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <RouterLink
        v-for="(article, i) in articles"
        :to="`/articles/${article.title}`"
        :key="i"
        class="d-block p-4"
        @click="articlesStore.setArticle(article)"
      >
        <ArticleTeaser
          :title="article.title"
          :snippet="article.snippet"
          :image-url="article.image_url"
          :source="article.source"
          :index="i"
        />
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

a:hover,
a:focus {
  box-shadow: 0 0.5em 1.5em rgb(0 0 0 / 10%), 0 0.125em 0.5em rgb(0 0 0 / 15%);
}
</style>
