<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/store";
const counterStore = useCounterStore();
const { count } = storeToRefs(counterStore);
</script>

<template>
  <header>
    <img
      alt="devui logo"
      class="logo"
      src="@/assets/devui.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">
          <d-button variant="solid">Home</d-button>
        </RouterLink>
        <RouterLink to="/about">
          <d-button variant="solid">About</d-button>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
