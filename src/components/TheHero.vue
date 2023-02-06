<script setup>
defineProps({
  title: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <header>
    <div
      class="hero px-4 py-5 my-5 mx-auto text-center"
      :class="{ 'pt-3 mt-3 pb-2 mb-2': title }"
    >
      <h1 class="display-5 fw-bold">{{ title ? title : "News Feed" }}</h1>
      <div class="col-lg-6 mx-auto">
        <Transition name="bounce">
          <p v-if="!title" class="lead mb-4">
            The latest news from around the world.
          </p>
        </Transition>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center"></div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  padding: 2rem;
  color: white;
}

.text-center {
  transition: 0.8s;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

header {
  background: linear-gradient(45deg, #32a6ff 0%, #3f6fff 49%, #8d54ff 82%);
  background-size: 200%;
  animation: aurora 10s infinite;
}

.hero {
  background-size: 200%;
  animation: aurora 7s infinite;
}

@keyframes aurora {
  0% {
    background-position: left top;
  }
  25% {
    background-position: right top;
  }
  50% {
    background-position: right bottom;
  }
  75% {
    background-position: left bottom;
  }
  100% {
    background-position: left top;
  }
}
</style>
