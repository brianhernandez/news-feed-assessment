<script setup>
import { defineProps } from "vue";

function isEven(index) {
  return index % 2 === 0;
}

defineProps({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
    default: "https://via.placeholder.com/150",
  },
  source: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <article class="article-teaser d-flex align-items-center">
    <div :class="{ 'order-last ms-3': isEven(index), 'me-3': !isEven(index) }">
      <img :src="imageUrl" :alt="title" />
    </div>

    <div>
      <h3>{{ title }}</h3>
      <p>{{ snippet }}</p>
      <span>Source: {{ source }}</span>
    </div>
  </article>
</template>

<style scoped>
img {
  width: 200px;
}
</style>
